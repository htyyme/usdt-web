<template>
  <div class="recharge">
    <navbar :title="$t('recharge')"></navbar>

    <assets :cointype="cointype"/>
    <payWay :channellist="channellist" ref="payWayRef" @chooseChannel="chooseChannel"/>
    <amounts :cointype="cointype" @chooseAmount="chooseAmount"/>

    <div class="bottom-info">{{$t('rechargeTip')}}</div>

    <van-button block class="submit-btn" :loading="$store.getters['system/gloading']" :disabled="submitDisabled" @click="handleSubmit">{{$t('recharge')}}</van-button>

    <!--收集信息的组件-->
    <createinfo_forcoin  v-if="cointype==='coin'"/>

<!--    <createinfo_forusdt v-if="cointype==='usdt'" />-->

  </div>


</template>

<script>
import assets from "./cpns/assets";
import payWay from "./cpns/payWay";
import amounts from "./cpns/amounts";
import createinfo_forcoin from "./cpns/createinfo_forcoin";
import createinfo_forusdt from "./cpns/createinfo_forusdt";

import appConfig from "@/config";
import {handlePay} from "@/utils/pay";



export default {
  name: "Recharge",
  components:{
    assets,
    payWay,
    amounts,
    createinfo_forcoin,
    createinfo_forusdt
  },
  data(){
    return {
      cointype:'',
      channellist:[],
      activeChannel:{},
      amount:0
    }
  },
  computed:{
    returnUrl(){
      const {protocol, host} = location
      const mode = this.$router.mode
      if (mode === 'hash') {
        return protocol + "//" + host + "/#/success"
      } else {
        return protocol + "//" + host + "/success"
      }
    },
    // 提交按钮的禁用状态
    submitDisabled(){
      if (!this.amount || this.amount <= 0){
        return true
      }
      if (this.channellist.length === 0){
        return true
      }
      return false
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
    },
    chooseAmount(amount){
      this.amount = amount
    },
    async handleSubmit(){
      //如果充值金额小于这个通道要求的最低金额
      if (this.amount < this.activeChannel.minAmount){
        return this.$toast.fail(this.$t('MinimumRechargeInfo',{num:this.activeChannel.minAmount}))
      }
      const formData = {
        money:Number(this.amount),
        is_web:!appConfig.isApp,
        successUrl : this.returnUrl,
        channel_code: this.activeChannel.payChannelName
      }
      let reqUrl = '/v1/auth/user/recharge'
      if (this.cointype === 'coin'){
        formData.coin_type = 1
      } else if (this.cointype === 'usdt'){
        formData.coin_type = 2
      }

      let {order_type} = this.$route.query
      if (order_type == 4 || order_type == 3){
        reqUrl = '/v1/auth/user/rechargeByExchange'
        formData.order_type = Number(order_type)
      }

      const resp = await this.$http.post(reqUrl,formData)
      handlePay(resp.data.data)
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
    //background: linear-gradient(180deg, rgba(94, 217, 248, 0.99) 0%, rgba(29, 111, 223, 0.99) 100%);
    background: linear-gradient( to top,#242EAC,#626AD9);
    border-radius: 28px;
    color: #fff;
    font-size: 20px;
    margin: 20px auto 0;
  }
}

</style>
