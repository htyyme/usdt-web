<template>
  <div class="menuList">
    <ul>
      <li @click="showExchange" >
        <van-icon :name="require('@/assets/icon/exchange.png')" size="40"></van-icon>
        <span>{{$t('Exchange COP to USDT')}}</span>
        <van-icon :name="require('@/assets/icon/more.png')" class="more"></van-icon>
      </li>

      <li @click="showUsdtToCop" >
        <van-icon :name="require('@/assets/icon/exchange.png')" size="40"></van-icon>
        <span>{{$t('Exchange USDT to COP')}}</span>
        <van-icon :name="require('@/assets/icon/more.png')" class="more"></van-icon>
      </li>

      <li @click="showExchangeUsdtTrx" >
        <van-icon :name="require('@/assets/icon/exchange.png')" size="40"></van-icon>
        <span>{{$t('Exchange USDT to TRX')}}</span>
        <van-icon :name="require('@/assets/icon/more.png')" class="more"></van-icon>
      </li>

      <li @click="showEnterEnvelopeKey" >
        <van-icon :name="require('@/assets/icon/redenvelope.png')" size="40"></van-icon>
        <span>{{$t('Red Envelope')}}</span>
        <van-icon :name="require('@/assets/icon/more.png')" class="more"></van-icon>
      </li>

      <li @click="toVipPage" >
        <van-icon :name="require('@/assets/icon/membersystem.png')" size="40"></van-icon>
        <span>{{$t('memberSystem')}}</span>
        <van-icon :name="require('@/assets/icon/more.png')" class="more"></van-icon>
      </li>

      <li @click="toFinancedetail" v-if="three_service_address.length>0">
        <van-icon :name="require('@/assets/icon/financedetail.png')" size="40"></van-icon>
        <span>{{$t('Finance Details')}}</span>
        <van-icon :name="require('@/assets/icon/more.png')" class="more"></van-icon>
      </li>

      <li @click="toBankCardPage" v-if="three_service_address.length>0">
        <van-icon :name="require('@/assets/icon/bankcard.png')" size="40"></van-icon>
        <span>{{$t('Bank card')}}</span>
        <van-icon :name="require('@/assets/icon/more.png')" class="more"></van-icon>
      </li>

      <li @click="toTaxaccountPage" v-if="three_service_address.length>0">
        <van-icon :name="require('@/assets/icon/trx.png')" size="40"></van-icon>
        <span>{{$t('USDT Wallet Account')}}</span>
        <van-icon :name="require('@/assets/icon/more.png')" class="more"></van-icon>
      </li>

      <li @click="toWithdrawRecordPage" v-if="three_service_address.length>0">
        <van-icon :name="require('@/assets/icon/withdrawrecord.png')" size="40"></van-icon>
        <span>{{$t('Withdraw record')}}</span>
        <van-icon :name="require('@/assets/icon/more.png')" class="more"></van-icon>
      </li>

      <li @click="toRechargeRecordPage" v-if="three_service_address.length>0">
        <van-icon :name="require('@/assets/icon/rechargerecord.png')" size="40"></van-icon>
        <span>{{$t('rechargeRecord')}}</span>
        <van-icon :name="require('@/assets/icon/more.png')" class="more"></van-icon>
      </li>

      <li @click="toPersonInfoPage" >
        <van-icon :name="require('@/assets/icon/personalinfomation.png')" size="40"></van-icon>
        <span>{{$t('Personal information')}}</span>
        <van-icon :name="require('@/assets/icon/more.png')" class="more"></van-icon>
      </li>

      <!--<li @click="toBusinessPage" v-if="show_usdt_trading!='0' && three_service_address.length>0" >-->
      <!--  <van-icon :name="require('@/assets/icon/Businessinfo.png')" size="40"></van-icon>-->
      <!--  <span>{{$t('Business information')}}</span>-->
      <!--  <van-icon :name="require('@/assets/icon/more.png')" class="more"></van-icon>-->
      <!--</li>-->

      <li @click="toAboutPage">
        <van-icon :name="require('@/assets/icon/aboutus.png')" size="40"></van-icon>
        <span>{{$t('About us')}}</span>
        <van-icon :name="require('@/assets/icon/more.png')" class="more"></van-icon>
      </li>

      <li @click="signOut">
        <van-icon :name="require('@/assets/icon/signout.png')" size="40"></van-icon>
        <span>{{$t('signOut')}}</span>
        <van-icon :name="require('@/assets/icon/more.png')" class="more"></van-icon>
      </li>

    </ul>

    <enterEnvelopeKey ref="enterEnvelopeKeyRef"></enterEnvelopeKey>
    <exchange ref="exchangeRef"></exchange>
    <exchangeUsdtTrx ref="exchangeUsdtTrxRef"/>
    <usdtToCop ref="usdtToCopRef"/>
  </div>
</template>

<script>
import enterEnvelopeKey from "./enterEnvelopeKey";
import exchange from "./exchange.vue";
import exchangeUsdtTrx from "./exchangeUsdtTrx.vue";
import usdtToCop from "./usdtToCop.vue";
export default {
  name: "menuList",
  components:{
    enterEnvelopeKey,
    exchange,
    exchangeUsdtTrx,
    usdtToCop
  },
  computed:{
    show_usdt_trading(){
      return this.$store.getters['system/config'].show_usdt_trading
    },
    three_service_address(){
      return this.$store.getters['system/config'].three_service_address
    }
  },
  methods:{
    toVipPage(){
      this.$router.push({
        name:'Vip'
      })
    },
    toPersonInfoPage(){
      this.$router.push({
        name:'Setting'
      })
    },
    toBankCardPage(){
      this.$router.push({
        name:'bankCard'
      })
    },
    toAboutPage(){
      this.$router.push({
        name:'About'
      })
    },
    toWithdrawRecordPage(){
      this.$router.push({
        name:'WithdrawRecord'
      })
    },
    toRechargeRecordPage(){
      this.$router.push({
        name:'RechargeRecord'
      })
    },
    toBusinessPage(){
      this.$router.push({
        name:'BusinessInfo'
      })
    },
    toFinancedetail(){
      this.$router.push({
        name:'FinanceDetail'
      })
    },
    toTaxaccountPage(){
      this.$router.push({
        name:'TrxAccount'
      })
    },
    async signOut(){
      const confirmres = await this.$dialog.confirm({
        message: this.$t('Do you want to logout?'),
        confirmButtonText:this.$t('Confirm'),
        cancelButtonText:this.$t('Cancel')
      }).catch(err=>err)
      if (confirmres !== 'confirm') return
      this.$store.commit('user/setToken','')
      this.$store.commit('system/setBanners1',[])
      this.$router.replace({name:'Login'})
    },
    showEnterEnvelopeKey(){
      this.$refs.enterEnvelopeKeyRef.handleOpen()
    },
    showExchange(){
      this.$refs.exchangeRef.handleOpen()
    },
    showExchangeUsdtTrx(){
      this.$refs.exchangeUsdtTrxRef.handleOpen()
    },
    showUsdtToCop(){
      this.$refs.usdtToCopRef.handleOpen()
    }

  }
}
</script>

<style scoped lang="scss">
.menuList{
  background-color: #fff;
  padding: 0 20px 10px;
  margin-top: 10px;

  ul{
    li{
      font-size: 14px;
      color: #333;
      display: flex;
      align-items: center;
      padding: 15px 0 0;
      font-weight: 700;
      position: relative;
      span{
        padding-left: 15px;
      }
      .more{
        position: absolute;
        right: 0;
      }
    }
  }

}

</style>
