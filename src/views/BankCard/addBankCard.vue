<template>
  <div class="addBankCard">
    <navbar :title="$t('Bank Card')"></navbar>
    
    <div class="wrapper">
      <dl>
        <dt>{{$t('Account Name')}}</dt>
        <dd><input type="text"  :placeholder="$t('Please enter account name')" v-model="form.username"></dd>
      </dl>

      <dl>
        <dt>{{$t('Card Number')}}</dt>
        <dd><input type="text"  :placeholder="$t('Please enter card number')" v-model="form.withdraw_deposit"></dd>
      </dl>

      <dl>
        <dt>{{$t('Opening Bank')}}</dt>
        <dd><input type="text"  :placeholder="$t('Please select opening bank')" :value="form.opening_bank" readonly  @click="showPicker = true"></dd>
      </dl>

      <dl>
        <dt>{{$t('Mobile')}}</dt>
        <dd><input type="text"  :placeholder="$t('Please enter mobile')" v-model="form.mobile" ></dd>
      </dl>

      <dl  v-if="showUpiIfsc">
        <dt>{{$t('IFSC')}}</dt>
        <dd><input type="text"  :placeholder="$t('Please enter IFSC code')" v-model="form.bank_code"></dd>
      </dl>

      <dl  v-if="showUpiIfsc">
        <dt>{{$t('UPI')}}</dt>
        <dd><input type="text"  :placeholder="$t('Please enter upi number')" v-model="form.upi"></dd>
      </dl>

      <dl v-if="isSendSms">
        <dt>{{$t('Verification code')}}</dt>
        <dd>
          <input type="text"  :placeholder="$t('Verification code')" v-model="form.sms_code">
          <van-button size="mini" :disabled="countdown>0" type="warning" @click="getVerificationCode">{{sendBtnText}}</van-button>
        </dd>
      </dl>

      <van-button block class="submit-btn" :loading="$store.getters['system/gloading']" @click="handleSave">{{$t('Submit')}}</van-button>

    </div>


    <!--选择银行卡-->
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
          show-toolbar
          :columns="gbanklist"
          @confirm="confirmBank"
          @cancel="showPicker = false"
          :confirm-button-text="$t('Confirm')"
          :cancel-button-text="$t('Cancel')"
      />
    </van-popup>

  </div>
</template>

<script>

import {checkBankcardNo,checkMobile} from "@/utils/tools";

export default {
  name: "addBankCard",
  data(){
    return {
      id:"",
      form:{
        username:"",
        withdraw_deposit:"",
        opening_bank:"",
        bank_code:"",
        upi:"",
        mobile:"",
        sms_code:"",
      },
      countdown: 0,
      timer:null,
      showPicker: false,
    }
  },
  created() {
    const {id} = this.$route.query
    if (id){
      this.id = Number(id)
      this.getBankcardinfo()
    }
    if (this.gbanklist.length === 0 ){
      this.$store.dispatch('system/loadBankList')
    }
  },
  computed:{
    //是否发送短信
    isSendSms(){
      return this.$store.getters['system/config'].isSendSms
    },
    showUpiIfsc(){
      return this.$store.getters['system/config'].show_upi_ifsc
    },
    userinfo(){
      return this.$store.getters['user/userInfo']
    },
    //发送验证码按钮的文字
    sendBtnText() {
      if (this.countdown <= 1) {
        return 'OTP'
      }
      return this.countdown + 's'
    },
    gbanklist(){
      return this.$store.getters['system/banklist']
    }
  },
  methods:{
    //获取银行卡信息
    async getBankcardinfo(){
      const resp = await this.$http.post('/v1/auth/user/card',{
        id : this.id
      })
      this.form = resp.data
    },
    //发送验证码
    async getVerificationCode(){
      const r = await this.$http.post('/v1/send_opt',{
        phone:this.userinfo.member_name
      })
      this.countdown = 60
      this.timer = setInterval(() => {
        this.countdown--
        if (this.countdown <= 1) {
          this.countdown = 0
          clearInterval(this.timer)
        }
      }, 1000)
    },
    //选择银行卡
    confirmBank(val){
      this.form.opening_bank =val
      this.showPicker = false;
    },
    //保存
    async handleSave(){
      if(!this.form.username) return this.$toast.fail(this.$t('Please enter account name'))
      if(!this.form.withdraw_deposit) return this.$toast.fail(this.$t('Please enter card number'))
      if(!this.form.opening_bank) return this.$toast.fail(this.$t('Please select opening bank'))
      if (!checkMobile(this.form.mobile)) return this.$toast.fail(this.$t('Phone number format is incorrect'))
      if (!checkBankcardNo(this.form.withdraw_deposit)) return this.$toast.fail(this.$t('Incorrect bank card format'))
      if(this.isSendSms && !this.form.sms_code)  return this.$toast.fail(this.$t('Please enter sms code'))
      const r = await this.$http.post('/v1/auth/card/bind',this.form)

      this.$toast.success({
        message:this.$t('success'),
        onClose:()=>{
          this.$router.back()
        }
      })
    }
  },
  destroyed() {
    if (this.timer){
      clearInterval(this.timer)
    }
  }
}
</script>

<style scoped lang="scss">
.addBankCard{
  min-height: 100vh;
  background-color: #f4f4f4;
  padding-bottom: 20px;
  .wrapper{
    background-color: #fff;
    width: 345px;
    border-radius: 13px;
    margin: 20px auto;
    padding: 10px 18px;
    dl{
      dt{
        font-size: 18px;
        color: #97B9F5;
      }
      dd{
        width: 310px;
        height: 50px;
        background: #F9F9F9;
        border-radius: 10px;
        margin-top: 5px;
        margin-bottom: 10px;
        position: relative;
        input{
          background-color: transparent;
          border: none;
          width: 100%;
          height: 100%;
          padding-left: 15px;
        }
        .van-button{
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 15px;
        }
      }
    }

    .submit-btn{
      width: 175px;
      height: 40px;
      background: linear-gradient(180deg, rgba(94, 217, 248, 0.99) 0%, rgba(29, 111, 223, 0.99) 100%);
      opacity: 1;
      border-radius: 28px;
      color: #fff;
      margin: 25px auto 15px;
    }
  }
}

</style>