<template>
  <section class="withdraw-form card-wrapper">
    <div class="card-tit">{{$t('Withdrawal amount')}}</div>

    <!--提现金额输入框-->
    <div class="card-val" v-if="showAmountInput">
      <input type="number" :placeholder="$t('Enter the withdrawal amount')" v-model.number="form.amount" autocomplete="off"/>
    </div>

    <div class="amount-list" v-if="amountList.length > 0">
      <ul>
        <li v-for="(item,index) in amountList"
            :key="index"
            :class="{active:item==form.amount}"
            @click="form.amount=item"
            >{{item | moneyFormat(0)}}</li>
      </ul>
    </div>

    <!--验证码-->
    <div class="card-val" v-if="withdraw_verify===1 || withdraw_verify === '1'">
      <input type="text" :placeholder="$t('smsCode')" v-model="form.verification_code" autocomplete="off"/>
      <van-button color="#00ba5a"  size="normal" round :disabled="countdown>0" @click="getVerificationCode">{{sendBtnText}}</van-button>
    </div>


    <!--<div class="card-val">-->
    <!--  <input type="password" :placeholder="$t('Enter the fund password')" v-model="form.password" autocomplete="off"/>-->
    <!--  <van-button color="#FF3364" round size="normal" :to="{name:'PaymentPassword'}" >{{$t('Fund password')}}</van-button>-->
    <!--</div>-->

  </section>
</template>

<script>
import vars from "@/assets/css/vars.scss";
import {checkMobile} from "@/utils/tools";

export default {
  name: "withdrawForm",
  data() {
    return {
      form: {
        amount:'',
        password:'',
        verification_code:""
      },
      countdown: 0,
      timer:null
    }
  },
  computed: {
    withdraw_verify(){
      return this.$store.getters['system/config'].withdraw_verify
    },
    //发送验证码按钮的文字
    sendBtnText() {
      if (this.countdown <= 1) {
        return this.$t('sendCode')
      }
      return this.countdown + 's'
    },
    //提现金额列表
    amountList(){
      const usdt_charge_range = this.$store.getters['system/config'].usdt_charge_range || ""
      if (usdt_charge_range == "") {
        return []
      }
      const arr = usdt_charge_range.split(',').map(item => item * 1)
      return arr
    },
    // 是否展示提现金额输入框
    // 如果不允许输入 则不展示
    showAmountInput(){
      const allow_input_withdraw_amount = this.$store.getters["system/config"].allow_input_withdraw_amount || "2"
      return allow_input_withdraw_amount === "1"
    }
  },
  mounted() {
    if (this.amountList.length > 0) {
      this.form.amount = this.amountList[0]
    }
  },
  methods: {
    //发送验证码
    async getVerificationCode() {
      const r = await this.$http.post('/v1/send_opt', {
        phone: this.$store.getters['user/userInfo'].member_name
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
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer )
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/css/vars";
.card-wrapper{
  display: block;
  width: 345px;
  background-color: #fff;
  margin: 15px auto;
  border-radius: 10px;
  padding: 11px 18px;
  .card-tit{
    font-weight: 700;
    font-size: 17px;
  }
  .card-val{
    //color: $mainColor;
    height: 49px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 21px;
    background-color: #F6F2FC;
    border-radius: 50px;
    margin-top: 10px;
    margin-bottom: 10px;
    overflow: hidden;
    input{
      flex: 1;
      height: 100%;
      border:none;
      background-color: transparent;
      font-size: 14px;
      padding-left: 26px;
      border-radius: 50px;
      &::placeholder{
        color: #999;
      }
    }
    .van-button{
      margin-left: 10px;
    }
  }

  .amount-list{
    ul {
      padding: 11px 9px 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      li {
        cursor: pointer;
        width: 140px;
        height: 50px;
        //background-color: rgba(53, 193, 255, 0.2);
        background: $mainColor;
        border-radius: 13px;
        margin-bottom: 13px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 21px;
        color: #fff;
        font-weight: 700;

        &.active {
          background:  $shallowMainColor;
          //background: #333;
        }
      }
    }
  }

  dl{
    dt{
      font-weight: 700;
      font-size: 17px;
      color:$mainColor;
    }
    dd{
      height: 49px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 17px;
      background-color: #F9F9F9;
      border-radius: 50px;
      margin-top: 10px;
      margin-bottom: 10px;
      overflow: hidden;
      padding-left: 26px;
    }
  }
}


.withdraw-form {
  .card-val {
    background-color: transparent;

    input {
      background-color: #f9f9f9;
    }
  }



}
</style>
