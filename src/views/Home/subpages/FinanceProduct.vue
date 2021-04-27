<template>
  <div class="finance-product">
    <div class="profit-info">
      <div class="top">
        <span>{{ totalassets | moneyfixed }}</span>
        <span>{{ $t('yourTotalAssets') }}</span>
      </div>
      <div class="bottom">
        <div class="item">
          <span>{{ $t('interest') }}</span>
          <span>{{ profitinfo.interest | moneyfixed }}</span>
        </div>
        <div class="item">
          <span>{{ $t('totalRevenue') }}</span>
          <span>{{ profitinfo.total_revenue | moneyfixed }}</span>
        </div>
        <div class="item">
          <span>{{ $t('yesterdaysEarning') }}</span>
          <span>{{ profitinfo.yestaday_amount | moneyfixed }}</span>
        </div>
      </div>
    </div>


    <van-tabs v-model="active" animated line-width="100px" sticky @change="handleTabChange">
      <van-tab title="USDT" name="USDT">
        <financeProductUsdt :product-list="productList"/>
      </van-tab>

      <van-tab title="CURRENCY" name="CURRENCY">
        <financeProductCoin  :product-list="productList"/>
      </van-tab>
    </van-tabs>

    <van-button class="transfer"  :to="{name:'TransferOut'}">{{ $t('transferOut') }}</van-button>

    <buyPopup/>
  </div>
</template>

<script>
import vars from "@/assets/css/vars.scss";
import financeProductCoin from "../cpns/financeProductCoin";
import financeProductUsdt from "../cpns/financeProductUsdt";
import buyPopup from "../cpns/buyPopup";
import {

  RELOAD_PROFIT_INFO
} from "@/utils/events";

export default {
  name: "FinanceProduct",
  components: {
    buyPopup,
    financeProductCoin,
    financeProductUsdt
  },
  data() {
    return {
      active: 'USDT',
      productList: [],
      coinprofitInfo: {},
      usdtprofitInfo: {},
    }
  },
  computed: {
    mainColor() {
      return vars.mainColor
    },
    profitinfo(){
      if (this.active ==='USDT'){
        return this.usdtprofitInfo
      } else {
        return this.coinprofitInfo
      }
    },
    totalassets(){
      if (this.active ==='USDT'){
        return this.$store.getters['user/usdtAccount'].available_balance
      } else {
        return this.$store.getters['user/coinAccount'].available_balance
      }
    }
  },
  mounted() {
    // this.$store.commit('SET_CURRENCY_TYPE','usdt')
    this.$bus.$on(RELOAD_PROFIT_INFO,this.queryProfitInfo)
    //
    this.queryProducts()
    this.queryProfitInfo()
  },
  methods: {
    //查询理财产品
    async queryProducts() {
      const r = await this.$http.post('/v1/auth/finance/products')
      // this.productList = r.Body
      // console.log(r)
      this.productList = r.data || []
    },
    async queryProfitInfo() {
      const r = await this.$http.post('/v1/auth/finance/tongji')
      const {coin,ustd} = r.data
      this.coinprofitInfo = coin
      this.usdtprofitInfo = ustd
    },
    //tab栏切换的时候会触发
    handleTabChange(){
      // console.log(this.active)
      // if (this.active=='USDT'){
      //   this.$store.commit('SET_CURRENCY_TYPE','usdt')
      // } else if (this.active == 'CURRENCY'){
      //   this.$store.commit('SET_CURRENCY_TYPE','coin')
      // }
    }
  },

  destroyed() {
    this.$bus.$off(RELOAD_PROFIT_INFO)
  },
  filters:{
    moneyfixed(v){
      v = v || 0
      return v.toFixed(2)
    }
  }
}
</script>

<!--suppress CssUnknownTarget -->
<style lang="scss" scoped>
@import "~assets/css/vars";

.finance-product {
  box-sizing: border-box;
  background-color: #fff;
  padding: 15px 15px 25px;

  .profit-info {
    .top {
      display: flex;
      justify-content: center;
      height: 33px;

      span:nth-child(1) {
        color: red;
        font-size: 25px;
        padding-left: 40px;
      }

      span:nth-child(2) {
        font-size: 10px;
        padding-left: 2px;
        align-self: flex-end;
      }
    }

    .bottom {
      margin-top: 5px;
      height: 42px;
      display: flex;
      justify-content: space-around;

      .item {
        // flex:1;
        display: flex;
        flex-direction: column;
        text-align: center;

        span:nth-child(1) {
          font-size: 10px;
        }

        span:nth-child(2) {
          font-size: 16px;
          color: red;
          text-align: center;
          margin-top: 2px;
        }
      }
    }
  }

  .title {
    font-size: 17px;
    font-weight: 800;
    color: #333333;
    margin-bottom: 17px;
  }



  .transfer {
    width: 250px;
    height: 50px;
    //background: $mainColor;
    background: linear-gradient(180deg, rgba(94, 217, 248, 0.99) 0%, rgba(29, 111, 223, 0.99) 100%);
    border-radius: 27px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    margin: 20px auto 12px;
  }
}
</style>