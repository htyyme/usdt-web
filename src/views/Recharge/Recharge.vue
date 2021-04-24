<template>
  <div class="recharge">
    <navbar :title="$t('recharge')"></navbar>

    <assets :cointype="cointype"/>
    <payWay :channellist="channellist" ref="payWayRef" @chooseChannel="chooseChannel"/>
    <amounts />

    <div class="bottom-info">In order to ensure the success rate of transaction, please ensure that the mobile phone number and email address are correct.</div>

    <van-button block class="submit-btn">Recharge</van-button>
  </div>


</template>

<script>
import assets from "./cpns/assets";
import payWay from "./cpns/payWay";
import amounts from "./cpns/amounts";
import appConfig from "@/config";
export default {
  name: "Recharge",
  components:{
    assets,
    payWay,
    amounts
  },
  data(){
    return {
      cointype:'',
      channellist:[],
      activeChannel:{}
    }
  },
  created() {
    const {cointype} = this.$route.query
    if (cointype !== 'usdt' && cointype !== 'coin'){
      this.$router.back()
    }
    this.cointype = cointype

    //获取用户余额
    this.$store.dispatch('user/loadUserInfo')
    this.loadChannels()
  },
  methods:{
    //获取通道列表
    async loadChannels(){
      let submitdata = {}
      submitdata.is_web = appConfig.isApp ? 0 : 1
      if (this.cointype === 'usdt'){
        submitdata.coin_type = 'USD'
      }else{
        submitdata.coin_type = ''
      }

      const resp = await this.$http.post('/v1/auth/finance/channels',submitdata)
      this.channellist = resp.data || []

      //默认选择第一个通道
      if (this.channellist.length>0){
        // this.activeChannel = this.channellist[0]
        this.$refs.payWayRef.chooseChannel(this.channellist[0])
      }
    },
    //选择通道
    chooseChannel(item){
      this.activeChannel = item
    }
  }
}
</script>

<style scoped lang="scss">
.recharge {
  min-height: 100vh;
  background-color: #f4f4f4;
  padding-bottom: 36px;

  .bottom-info{
    font-size: 14px;
    line-height: 1.4;
    color: #1D6FDF;
    opacity: 1;
    margin: 18px 22px 0;
  }

  .submit-btn{
    width: 250px;
    height: 55px;
    background: linear-gradient(180deg, rgba(94, 217, 248, 0.99) 0%, rgba(29, 111, 223, 0.99) 100%);
    border-radius: 28px;
    color: #fff;
    font-size: 20px;
    margin: 20px auto 0;
  }
}

</style>