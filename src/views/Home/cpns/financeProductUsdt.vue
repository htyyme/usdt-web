<template>
  <div class="prod-list">
    <div class="prod-item "  v-for="item in productList" :key="item.id">
      <span class="tag">{{ item.financial_name }}</span>
      <span class="dep" @click="openBuy(item)">{{ $t('deposit') }}</span>
      <div class="content">
        <div class="con-top">
          <span>{{ $t('oneDay') }} :</span>
          <span>{{ $t('interestRate') }}+{{ item.usdt_interest_rate | rateFormat }}</span>
        </div>
        <div class="con-bottom">
          <span>[{{ $t('set') }}] {{ item.hold_cycle }} {{ $t('days') }}</span>
          <span>+{{ totalRate(item) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {OPEN_BUY_POPUP} from "@/utils/events";

export default {
  name: "financeProductUsdt",
  props:{
    productList:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods:{
    totalRate(item) {
      let n = item.usdt_interest_rate * item.hold_cycle * 100
      n = n.toFixed(1)
      return n + '%'
    },

    openBuy(item) {
      this.$bus.$emit(OPEN_BUY_POPUP, item,'usdt')
    }
  }
}
</script>

<style scoped lang="scss">

.prod-list {
  .prod-item {
    width: 336px;
    height: 75px;
    background: #FFFFFF;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    margin: 10px auto;
    position: relative;
    display: flex;
    flex-direction: row-reverse;

    .tag {
      box-sizing: border-box;
      width: 85px;
      height: 47px;
      position: absolute;
      top: 10px;
      left: -9px;
      background: url(~assets/icon/typeA.png) no-repeat;
      background-size: 100% 100%;
      text-shadow: 0 2px 2px #BE5503;
      font-size: 14px;
      color: #fff;
      text-align: center;
      padding-top: 9px;
    }

    &:nth-child(n) .tag {
      background-image: url(~assets/icon/typeA.png);
    }

    &:nth-child(2n) .tag {
      background-image: url(~assets/icon/typeB.png);
    }

    &:nth-child(3n) .tag {
      background-image: url(~assets/icon/typeC.png);
    }

    &:nth-child(4n) .tag {
      background-image: url(~assets/icon/typeD.png);
    }

    .dep {
      font-size: 13px;
      font-weight: 800;
      color: #97B9F5;
      padding: 0 7px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        width: 1px;
        height: 45px;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        background-color: #E5E5E5;
      }
    }

    .content {
      flex: 1;
      padding-left: 80px;
      padding-top: 10px;
      padding-bottom: 13px;
      padding-right: 11px;

      .con-top {
        font-weight: 700;

        span:nth-child(1) {
          font-size: 12px;
          color: #333;
        }

        span:nth-child(2) {
          font-size: 12px;
          color: #F97D1D;
        }
      }

      .con-bottom {
        font-weight: 700;
        margin-top: 6px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        span:nth-child(1) {
          font-size: 15px;
          color: #333;
        }

        span:nth-child(2) {
          font-size: 14px;
          background-color: #FF7335;
          color: #fff;
          width: 65px;
          height: 25px;
          border-radius: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }


}

</style>