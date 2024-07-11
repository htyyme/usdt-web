<template>
  <div class="finance-product">
    <div class="counter">
      <div class="title">{{ $t('yourTotalAssets') }}</div>
      <div class="sub-title">
        <!--<span>{{usdtTotalAssets | moneyFormat(5,'usdt')}}</span>-->
        <!--<em class="line"></em>-->
        <span>{{ coinTotalAssets| moneyFormat(2,'coin') }}</span>
      </div>

      <div class="bottom">
        <div class="item">
          <span>{{ $t('interest') }}</span>
          <span>{{ coinprofitInfo.interest | moneyFormat(2,'coin') }}</span>
          <!--<span>{{ usdtprofitInfo.interest | moneyFormat(5,'usdt') }}</span>-->
        </div>

        <div class="item">
          <span>{{ $t('totalRevenue') }}</span>
          <span>{{ coinprofitInfo.total_revenue | moneyFormat(2,'coin') }}</span>
          <!--<span>{{ usdtprofitInfo.total_revenue | moneyFormat(5,'usdt') }}</span>-->
        </div>

        <div class="item">
          <span>{{ $t('yesterdaysEarning') }}</span>
          <span>{{ coinprofitInfo.yestaday_amount | moneyFormat(2,'coin') }}</span>
          <!--<span>{{ usdtprofitInfo.yestaday_amount | moneyFormat(5,'usdt') }}</span>-->
        </div>
      </div>

    </div>

    <div class="sub-title" @click="showDesc">

      {{ $t('What is Pledge income?') }}
      <van-icon name="question-o"/>
    </div>

    <!--理财列表-->
    <div class="finance-list">
      <div class="finance-item" v-for="item in productList" :key="item.id" @click="toFinanceDetail(item)">
        <van-image :src="$tools.getImage(item.img)" class="product-img" lazy-load></van-image>
        <div class="product-details">
          <div class="product-name">{{item.financial_name}}</div>
          <div class="product-cycle">{{item.hold_cycle}} day</div>
          <div class="product-profit">Profit {{item.interest_rate*100}}%</div>
        </div>
      </div>
    </div>


    <van-button class="transfer" :to="{name:'TransferOut'}">{{ $t('transferOut') }}</van-button>
    <!--<buyPopup/>-->
    <!--<financeDescPop ref="financeDescPopRef"/>-->
  </div>
</template>

<script>
import vars from "@/assets/css/vars.scss";
import {

  RELOAD_PROFIT_INFO
} from "@/utils/events";

export default {
  name: "FinanceProduct",
  components: {
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
    usdtTotalAssets() {
      return this.$store.getters['user/usdtAccount'].available_balance
    },
    coinTotalAssets() {
      return this.$store.getters['user/coinAccount'].available_balance
    },
    show_coin_finance() {
      return this.$store.getters['system/config'].show_coin_finance
    },
    show_usdt_finance() {
      return this.$store.getters['system/config'].show_usdt_finance
    }
  },
  mounted() {
    this.$bus.$on(RELOAD_PROFIT_INFO, () => {
      this.queryProfitInfo()
      this.$store.dispatch('user/loadUserInfo')
    })
    //
    this.queryProducts()
    this.queryProfitInfo()
  },
  methods: {
    //查询理财产品列表
    async queryProducts() {
      const r = await this.$http.post('/v1/auth/finance/products')
      this.productList = r.data || []

      console.log('productList', this.productList)
    },
    //查询收益信息
    async queryProfitInfo() {
      const r = await this.$http.post('/v1/auth/finance/tongji')
      const {coin, ustd} = r.data
      this.coinprofitInfo = coin
      this.usdtprofitInfo = ustd
    },
    totalRate(item) {
      let n = item.interest_rate * item.hold_cycle * 100
      n = n.toFixed(1)
      return n + '%'
    },
    totalUsdtRate(item) {
      let n = item.usdt_interest_rate * item.hold_cycle * 100
      n = n.toFixed(1)
      return n + '%'
    },

    //展示什么是质押收益
    showDesc() {
      this.$refs.financeDescPopRef.handleOpen()
    },
    toFinanceDetail(item) {
      this.$router.push({
        name:'FinanceProductDetail',
        params:{
          id:item.id
        }
      })
    }
  },

  destroyed() {
  },

}
</script>

<style lang="scss" scoped>
@import "src/assets/css/vars.scss";

.finance-product {
  padding: 10px 0 20px 0;

  .counter {
    width: 350px;
    background: #FFFFFF;
    opacity: 1;
    border-radius: 13px;
    margin: 0 auto;
    padding: 15px 25px;

    .title {
      font-size: 17px;
      font-weight: 700;
      color: #333333;
      text-align: center;
    }

    .sub-title {
      color: $mainColor;
      text-align: center;
      font-weight: 700;
      margin-top: 8px;
    }

    em.line {
      vertical-align: middle;
      display: inline-block;
      margin: 0 15px;
      height: 17px;
      width: 1px;
      background-color: $mainColor;
    }

    .bottom {
      margin-top: 10px;
      display: flex;
      justify-content: space-around;

      .item {
        display: flex;
        flex-direction: column;
        text-align: center;

        span:nth-child(1) {
          font-size: 10px;
        }

        span:nth-child(2), span:nth-child(3) {
          font-size: 13px;
          color: $mainColor;
          text-align: center;
          margin-top: 2px;
        }
      }
    }
  }

  /*理财列表*/
  .finance-list{
    margin: 16px;
    padding: 16px;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .2);
    .finance-item{
      padding: 8px;
      margin-bottom: 10px;
      //border: 1px solid #757485;
      border: 1px solid #FA3061;
      border-radius: 8px;
      display: flex;
      .product-img{
        width: 128px;
        height: 150px;
      }
      .product-details{
        flex: 1;
        padding-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        font-size: 13px;
        color: #333;
        font-weight: 700;
        .product-name{

        }
      }
    }
  }


  .transfer {
    width: 250px;
    height: 50px;
    //background: $mainColor;
    background: linear-gradient(to top, $shallowMainColor, $mainColor);
    border-radius: 27px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    margin: 20px auto 12px;
  }
}

.sub-title {
  font-size: 13px;
  margin-top: 10px;
  text-align: center;
  color: $shallowMainColor;
  cursor: pointer;
}

</style>
