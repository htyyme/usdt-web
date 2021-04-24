<template>
  <div class="product">
    <div class="prod-img">
      <van-image :src="$tools.getImage(goodsinfo.show_pic)"></van-image>
    </div>

    <div class="prod-bg">
      <div class="lv-tit">{{$t('lvMember',{num:goodsinfo.extra1})}}</div>
      <div class="num">{{ attr.unit_cost | moneyFormat(2,cointype) }}</div>
      <div class="special">{{ $t('specialArea') }}</div>
      <div class="ops">
        <van-button class="recharge" :to="{name:'RechargeType'}">{{$t('recharge')}}</van-button>
        <van-button class="grabbing" :loading="$store.getters['system/gloading']" @click="grabbing">{{$t('grabbing')}}</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import {SHOW_GRABBING} from "@/utils/events";

export default {
  name: "product",
  props:{
    goodsinfo:Object,
    attr:Object,
    cointype:String
  },
  methods:{
    grabbing(){
      this.$bus.$emit(SHOW_GRABBING)
    }
  }
}
</script>

<style scoped lang="scss">

.product{
  margin-top: -30px;
  .prod-img{
    width: 320px;
    height: 74px;
    background-color: #fff;
    border-radius: 9px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    .van-image{
      width: 128px;
      height: 34px;
    }
  }

  .prod-bg{
    width: 352px;
    height: 223px;
    background: url(~assets/icon/productbg.png) no-repeat;
    background-size: cover;
    margin: 6px auto;
    position: relative;
    .lv-tit{
      text-transform: uppercase;
      color: #1F70DF;
      text-align: center;
      padding-top: 17px;
      font-weight: 700;
    }
    .num{
      color: #1F70DF;
      text-align: center;
      font-weight: 700;
      font-size: 30px;
      padding-top: 10px;
    }
    .special{
      text-align: center;
      color: #1F70DF;
      padding-top: 1px;
    }
    .ops{
      position: absolute;
      bottom: 27px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      .van-button{
        width: 90px;
        height: 35px;
        background: linear-gradient(180deg, rgba(94, 217, 248, 0.99) 0%, rgba(29, 111, 223, 0.99) 100%);
        border-radius: 25px;
        text-transform: capitalize;
        color: #fff;
        &.grabbing{
          background: #fff;
          color: #555454;
          opacity: .59;
          margin-left: 10px;
        }
      }
    }
  }
}

</style>