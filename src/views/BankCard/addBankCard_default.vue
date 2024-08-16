<template>
  <div class="addBankCard">
    <navbar :title="$t('Bank Card')"></navbar>

    <div class="wrapper">

      <!--账号类型-->
      <dl>
        <dt>{{$t('Account type')}}</dt>
        <dd style="padding-left: 15px;">
          <van-radio-group v-model="form.acc_type"  checked-color="#282828" :disabled="!allow">
            <van-radio style="margin: 7px;" name="CPF">CPF</van-radio>
            <van-radio style="margin: 7px;" name="PHONE">número de telefone celular</van-radio>
            <van-radio style="margin: 7px;" name="EMAIL">E-mail</van-radio>
            <!--<van-radio style="margin: 7px;" name="CHAVE">CHAVE</van-radio>-->
          </van-radio-group>
        </dd>
      </dl>

      <template v-if="form.acc_type==='CPF'">
        <!--用户名-->
        <dl>
          <dt>{{$t('Account Name')}}</dt>
          <dd><input type="text"  :placeholder="$t('Please enter account name')" v-model="form.username" :readonly="!allow"></dd>
        </dl>
        <!--cpf/cnpj-->
        <dl>
          <dt>{{$t('Tax number')}}</dt>
          <p class="dt-notice">
            Observação: Preencha o número real da conta de CPF. Se você cometer um erro, não poderá sacar o dinheiro.
          </p>
          <dd><input type="text"  :placeholder="$t('Please enter tax number')" v-model="form.subbranch_no" oninput="this.value=this.value?this.value.replace(/[^\d]/g,''):''" :readonly="!allow"></dd>
        </dl>

      </template>

      <template v-else>
        <!--名字-->
        <dl>
          <dt>{{$t('Account Name')}}</dt>
          <dd><input type="text"  :placeholder="$t('Please enter account name')" v-model="form.username" :readonly="!allow"></dd>
        </dl>
        <!--账号-->
        <dl>
          <dt v-if="form.acc_type === 'CHAVE'">{{$t('Pix secret')}}</dt>
          <dt v-if="form.acc_type === 'PHONE'">{{$t('Account Number')}}</dt>
          <dt v-if="form.acc_type === 'EMAIL'">E-mall</dt>

          <dd><input type="text"  :placeholder="$t('Please enter account number')" v-model="form.withdraw_deposit" :readonly="!allow"></dd>
        </dl>
        <!--cpf/cnpj-->
        <dl>
          <dt>{{$t('Tax number')}}</dt>
          <p class="dt-notice">
            Observação: Preencha o número real da conta de CPF. Se você cometer um erro, não poderá sacar o dinheiro.
          </p>
          <dd><input type="text"  :placeholder="$t('Please enter tax number')" v-model="form.subbranch_no" oninput="this.value=this.value?this.value.replace(/[^\d]/g,''):''" :readonly="!allow"></dd>
        </dl>
      </template>






      <van-button block class="submit-btn" :loading="$store.getters['system/gloading']" @click="handleSave" v-if="allow">{{$t('Submit')}}</van-button>

    </div>




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
        username:"",//用户名
        withdraw_deposit:"", //账号
        opening_bank:"",
        bank_code:"",
        upi:"",
        mobile:"",
        sms_code:"",
        priority:1,
        acc_type:"CPF",//账号类型
        identity_no:"", //身份证
        last_name:"",//姓
        subbranch_no:""
      },
      countdown: 0,
      timer:null,
      showPicker: false,
      allow:false
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

    // 获取是否允许绑卡
    this.$http.post("/v1/auth/card/allowUpdateBankcard").then(res=>{
      this.allow = res.data.allow
    })
  },
  computed:{
    //是否发送短信
    isSendSms(){
      return this.$store.getters['system/config'].isSendSms
    },
    showUpi(){
      return this.$store.getters['system/config'].showUpi
    },
    showIfsc(){
      return this.$store.getters['system/config'].showIfsc
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
      console.log('resp.data',resp.data)
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
      // if(!this.form.username) return this.$toast.fail(this.$t('Please enter account name'))
      // if(!this.form.withdraw_deposit) return this.$toast.fail(this.$t('Please enter card number'))
      // if(!this.form.opening_bank) return this.$toast.fail(this.$t('Please select opening bank'))
      // if (!checkMobile(this.form.mobile)) return this.$toast.fail(this.$t('Phone number format is incorrect'))
      // if (!checkBankcardNo(this.form.withdraw_deposit)) return this.$toast.fail(this.$t('Incorrect bank card format'))
      // if(this.isSendSms && !this.form.sms_code)  return this.$toast.fail(this.$t('Please enter sms code'))

      /*
        CPF（个人税号/类似身份证号）：11位纯数字；
        PHONE（电话号码）：11位纯数字，如果加55共13位纯数字（+55非必须）；
        E-MAIL（邮箱）：字母都必须要小写；
      * */

      // if (this.form.acc_type === 'CPF') {
      //   const reg = /^[0-9]{11}$/
      //   if (!reg.test(this.form.withdraw_deposit)){
      //     return  this.$toast(this.$t("The account format is incorrect"))
      //   }
      // } else if (this.form.acc_type === 'PHONE'){
      //   const reg = /^(\+55)?[0-9]{11}$/
      //   if (!reg.test(this.form.withdraw_deposit)){
      //     return  this.$toast(this.$t("The account format is incorrect"))
      //   }
      // }else if (this.form.acc_type === 'EMAIL'){
      //   const reg = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,6}$/
      //   if (!reg.test(this.form.withdraw_deposit)){
      //     return  this.$toast(this.$t("The account format is incorrect"))
      //   }
      // }
      // //自然人的税号为CPF（格式：000.000.000-00），法人的税号为CNPJ（格式：00.000.000/0000-00）。
      // let reg1 = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
      // let reg2 = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/
      // if (!reg1.test(this.form.subbranch_no) && !reg2.test(this.form.subbranch_no)) {
      //   return  this.$toast(this.$t("Tax number is incorrect"))
      // }

      if (this.form.acc_type === 'EMAIL'){
          const reg = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,6}$/
          if (!reg.test(this.form.withdraw_deposit)){
            return  this.$toast(this.$t("The account format is incorrect"))
          }
      }

      if (this.form.acc_type === 'PHONE') {
        const reg = /^(\+55)?[0-9]{11}$/
        if (!reg.test(this.form.withdraw_deposit)) {
          return this.$toast(this.$t("The mobile phone number can only be 11 digits."))
        }
      }


        let reg = /^\d{11}$/
        if (!reg.test(this.form.subbranch_no)){
          return  this.$toast(this.$t("Tax number is incorrect"))
        }


      const submitdata = {...this.form}
      if (submitdata.acc_type === 'CPF') {
        submitdata.withdraw_deposit = submitdata.subbranch_no
      }
      const r = await this.$http.post('/v1/auth/card/bind',submitdata)

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
@import "src/assets/css/vars.scss";
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
        color:  $shallowMainColor;
      }
      .dt-notice{
        font-size: 12px;
        color:  $shallowMainColor;
        padding: 5px 0;
      }
      dd{
        width: 310px;
        //height: 50px;
        padding: 8px 0;
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

      }
    }

    .submit-btn{
      width: 175px;
      height: 40px;
      background: linear-gradient( to top, $shallowMainColor,$mainColor);
      opacity: 1;
      border-radius: 28px;
      color: #fff;
      margin: 25px auto 15px;
    }
  }
}

</style>
