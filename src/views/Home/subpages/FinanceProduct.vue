<template>
  <div class="finance-product">
      <div class="counter">
        <div class="title">{{ $t('yourTotalAssets') }}</div>
        <div class="sub-title">
          <span>{{usdtTotalAssets | moneyFormat(2,'usdt')}}</span>
          <em class="line"></em>
          <span>{{coinTotalAssets| moneyFormat(2,'coin')}}</span>
        </div>

        <div class="bottom">
          <div class="item">
            <span>{{ $t('interest') }}</span>
            <span>{{ coinprofitInfo.interest | moneyFormat(2,'coin') }}</span>
            <span>{{ usdtprofitInfo.interest | moneyFormat(2,'usdt') }}</span>
          </div>

          <div class="item">
            <span>{{ $t('totalRevenue') }}</span>
            <span>{{ coinprofitInfo.total_revenue | moneyFormat(2,'coin') }}</span>
            <span>{{ usdtprofitInfo.total_revenue | moneyFormat(2,'usdt') }}</span>
          </div>

          <div class="item">
            <span>{{ $t('yesterdaysEarning') }}</span>
            <span>{{ coinprofitInfo.yestaday_amount | moneyFormat(2,'coin') }}</span>
            <span>{{ usdtprofitInfo.yestaday_amount | moneyFormat(2,'usdt') }}</span>
          </div>
        </div>

      </div>

      <div class="type-list">
        <div class="title">{{$t('financeProduct')}}</div>

        <div class="type-item" v-for="item in productList" :key="item.id">
          <div class="typ type-usdt">
            <div class="productname">{{item.financial_name}}</div>
            <div class="tit">{{ $t('oneDay') }} :</div>
            <div class="irate">{{ $t('interestRate') }}+{{ item.usdt_interest_rate | rateFormat }}</div>
            <div class="setdat">[{{ $t('set') }}] {{ item.hold_cycle }} {{ $t('days') }}</div>
            <div class="totalrate">+{{ totalUsdtRate(item) }}</div>
            <div class="desc">{{item.usdt_desc}}</div>
            <div class="bot-btn" @click="openBuy(item,'usdt')">USDT</div>
          </div>
          <div class="typ type-coin">
            <div class="tit">{{ $t('oneDay') }} :</div>
            <div class="irate">{{ $t('interestRate') }}+{{ item.interest_rate | rateFormat }}</div>
            <div class="setdat">[{{ $t('set') }}] {{ item.hold_cycle }} {{ $t('days') }}</div>
            <div class="totalrate">+{{ totalRate(item) }}</div>
            <div class="desc">{{item.coin_desc}}</div>
            <div class="bot-btn"  @click="openBuy(item,'coin')">COIN</div>
          </div>
        </div>

      </div>


    <van-button class="transfer"  :to="{name:'TransferOut'}">{{ $t('transferOut') }}</van-button>


    <buyPopup />
  </div>
</template>

<script>
import vars from "@/assets/css/vars.scss";
import {OPEN_BUY_POPUP} from "@/utils/events";
import buyPopup from "../cpns/buyPopup";
import {

  RELOAD_PROFIT_INFO
} from "@/utils/events";

export default {
  name: "FinanceProduct",
  components: {
    buyPopup,
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
    usdtTotalAssets(){
      return this.$store.getters['user/usdtAccount'].available_balance
    },
    coinTotalAssets(){
      return this.$store.getters['user/coinAccount'].available_balance
    }
  },
  mounted() {
    this.$bus.$on(RELOAD_PROFIT_INFO,()=>{
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
    },
    //查询收益信息
    async queryProfitInfo() {
      const r = await this.$http.post('/v1/auth/finance/tongji')
      const {coin,ustd} = r.data
      this.coinprofitInfo = coin
      this.usdtprofitInfo = ustd
    },
    totalRate(item) {
      let n = item.interest_rate * item.hold_cycle * 100
      n = n.toFixed(1)
      return n + '%'
    },
    totalUsdtRate(item){
      let n = item.usdt_interest_rate * item.hold_cycle * 100
      n = n.toFixed(1)
      return n + '%'
    },
    openBuy(item,type) {
      // console.log(item,type)
      this.$bus.$emit(OPEN_BUY_POPUP, item,type)
    }
  },

  destroyed() {
    this.$bus.$off(RELOAD_PROFIT_INFO)
  },

}
</script>

<style lang="scss" scoped>

.finance-product{
  padding: 10px 0 20px 0;
  .counter{
    width: 350px;
    background: #FFFFFF;
    opacity: 1;
    border-radius: 13px;
    margin: 0 auto;
    padding: 15px 25px;
    .title{
      font-size: 17px;
      font-weight: 700;
      color: #333333;
      text-align: center;
    }
    .sub-title{
      color: #1D6FDF;
      text-align: center;
      font-weight: 700;
      margin-top: 8px;
    }
    em.line{
      vertical-align: middle;
      display: inline-block;
      margin: 0 15px;
      height: 17px;
      width: 1px;
      background-color: #1D6FDF;
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

        span:nth-child(2) ,span:nth-child(3){
          font-size: 13px;
          color: #1D6FDF;
          text-align: center;
          margin-top: 2px;
        }
      }
    }
  }

  .type-list{
    background-color: #fff;
    margin-top: 10px;
    padding: 15px;
    .title{
      font-size: 17px;
      font-weight: 700;
      color: #333;
      margin-bottom: 12px;
    }

    .type-item{
      height: 212px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      .typ{
        height: 100%;
        width: 165px;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        position: relative;
        .tit{
          font-size: 13px;
          color: #333333;
          text-align: center;
          padding-top: 53px;
          font-weight: 700;
        }
        .irate{
          font-size: 13px;
          font-weight: 800;
          color: #F97D1D;
          padding-top: 4px;
          text-align: center;
        }
        .setdat{
          font-size: 15px;
          font-weight: 700;
          line-height: 13px;
          color: #333333;
          text-align: center;
          margin-top: 8px;
        }
        .totalrate{
          min-width: 65px;
          height: 25px;
          background: #FF7335;
          border-radius: 13px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          margin: 9px auto 0;
          padding: 0 20px;
          color: #fff;
          position: relative;
          left: 50%;
          transform: translateX(-50%);
        }
        .desc{
          font-size: 12px;
          text-align: center;
          margin-top: 3px;
          font-weight: 700;
          color: #F97D1D;
        }
        .bot-btn{
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 36px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          background-color: #FF7335;
          border-radius: 5px;
        }
      }
      .type-usdt{
        .productname{
          position: absolute;
          width: 85px;
          height: 48px;
          background: url(~assets/icon/typeA.png) no-repeat;
          background-size: 85px;
          top: 10px;
          left: -9px;
          color: #fff;
          //padding: 7px 0 0 10px;
          display: flex;
          justify-content: center;
          padding-top: 9px;
        }
      }
    }

    .type-item:nth-child(n){
      .totalrate{
        background-color: #FF7335;
      }
      .bot-btn{
        background-color: #FF7335;
      }
      .type-usdt .productname{
        background-image: url(~assets/icon/typeA.png);
      }
    }
    .type-item:nth-child(2n){
      .totalrate{
        background-color: #61ACF8;
      }
      .bot-btn{
        background-color: #61ACF8;
      }
      .type-usdt .productname{
        background-image: url(~assets/icon/typeD.png);
      }
    }
    .type-item:nth-child(3n){
      .totalrate{
        background-color: #52D4DD;
      }
      .bot-btn{
        background-color: #52D4DD;
      }
      .type-usdt .productname{
        background-image: url(~assets/icon/typeC.png);
      }
    }
    .type-item:nth-child(4n){
      .totalrate{
        background-color: #52C953;
      }
      .bot-btn{
        background-color: #52C953;
      }
      .type-usdt .productname{
        background-image: url(~assets/icon/typeB.png);
      }
    }
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