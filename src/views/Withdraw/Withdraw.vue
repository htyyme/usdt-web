<template>
  <div class="Withdraw">
    <navbar :title="$t('Withdraw')"></navbar>

    <assets :cointype="cointype"/>
    <record />
    <withdrawForm ref="withdrawFormRef"/>

    <van-notice-bar scrollable :text="$t('handlefeetip',{num:fee})" color="#CF182C" background="#e5e5e5"/>
    <bankCardInfo :bankcardinfo="bankcardinfo" :cointype="cointype"/>
    <pageFooter />

    <van-button  block  class="withdraw-btn" :loading="$store.getters['system/gloading']" @click="handleSubmit">{{$t('Withdraw')}}</van-button>
  </div>
</template>

<script>
import assets from "./cpns/assets";
import record from "./cpns/record";
import withdrawForm from "./cpns/withdrawForm";
import bankCardInfo from "./cpns/bankCardInfo";
import pageFooter from "./cpns/pageFooter";
export default {
  name: "Withdraw",
  components:{
    assets,
    record,
    withdrawForm,
    bankCardInfo,
    pageFooter
  },
  data(){
    return {
      cointype:'',
      bankcardinfo:{},// 银行卡信息
      fee:0
    }
  },
  async created() {
    const {cointype} = this.$route.query
    if (cointype !== 'usdt' && cointype !== 'coin'){
      this.$router.back()
    }
    this.cointype = cointype

    //获取用户余额
    this.$store.dispatch('user/loadUserInfo')
    //获取费率信息
    this.loadconfig()

    if (this.cointype === 'coin') {
      this.getBankCardInfo()
    } else{
      // 判断是否绑定账号
      let userinfo = this.$store.getters['user/userInfo']
      let trx_account = userinfo.trx_account

      if (!trx_account){

        const confirmres = await this.$dialog.confirm({
          message: this.$t('You must fill in the usdt account first')
        }).catch(err=>err)

        if (confirmres !== 'confirm'){
          this.$router.back()
          return
        }
        this.$router.push({
          name:'TrxAccount'
        })
      }
    }

  },
  methods:{
    async loadconfig(){
      const resp= await this.$http.post('/v1/withdraw/config')
      // console.log(resp)
      if (this.cointype == 'coin') {
        this.fee = resp.data.fee
      } else if (this.cointype == 'usdt'){
        this.fee = resp.data.usdt_fee
      }
    },
    //查询银行卡信息
    async getBankCardInfo(){
      const resp = await this.$http.post('/v1/auth/user/cards')
      let bankcardlist = resp.data || []
      if (bankcardlist.length > 0){
        this.bankcardinfo = bankcardlist[0]
      }else{
        const confirmRes = await this.$dialog.confirm({
          message:this.$t('You should bind the bank card first'),
          confirmButtonText:this.$t('confirm'),
          cancelButtonText:this.$t('cancel')
        }).catch(e=>e)

        if (confirmRes === "confirm") {
          this.$router.push({name:'bankCard'})
        }else{
          this.$router.back()
        }
      }
    },
    //提交提现
    async handleSubmit(){
      const formData = this.$refs.withdrawFormRef.form
      if (!formData.amount || !formData.password){
        return
      }

      const submitdata = {}
      submitdata.money = Number(formData.amount)
      submitdata.password = formData.password
      if (this.cointype === 'usdt'){
        submitdata.bank_id = 0
        submitdata.coin_type = 2
      }else if (this.cointype === 'coin'){
        submitdata.bank_id = this.bankcardinfo.id
        submitdata.coin_type = 1
      }

      //如果是usdt提现 判断是否绑定了绑定账户信息
      let userinfo = this.$store.getters['user/userInfo']
      let trx_account = userinfo.trx_account
      if (this.cointype === 'usdt' && !trx_account){
        const confirmres = await this.$dialog.confirm({
          message: this.$t('You must fill in the usdt account first')
        }).catch(err=>err)
        if (confirmres !== 'confirm'){
          return
        }else{
          this.$router.push({
            name:'TrxAccount'
          })
          return
        }
      }

      const resp = await this.$http.post('/v1/auth/user/withdraw',submitdata)

      this.$toast.success({
        message: this.$t('success'),
        onClose: () => {
          this.$router.back()
        }
      })

    }
  }
}
</script>

<style scoped lang="scss">
.Withdraw {
  min-height: 100vh;
  background-color: #f4f4f4;
  padding-bottom: 35px;

  .van-notice-bar {
    font-size: 12px;
    height: 25px;
  }

  .withdraw-btn {
    width: 250px;
    height: 55px;
    //background: linear-gradient(180deg, rgba(94, 217, 248, 0.99) 0%, rgba(29, 111, 223, 0.99) 100%);
    background: linear-gradient( to top,#242EAC,#626AD9);
    border-radius: 28px;
    font-size: 20px;
    color: #fff;
    margin: 20px auto 0;
  }
}


</style>
