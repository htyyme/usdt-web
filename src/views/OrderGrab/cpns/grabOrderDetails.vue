<template>
  <van-popup v-model="show" position="bottom" class="grabOrderDetails"  round :close-on-click-overlay="false" get-container="body">
      <div class="title">Order details</div>

    <dl>
      <dt>{{ $t('OrderNumber') }}:</dt>
      <dd>{{order.order_sn}}</dd>
    </dl>

    <dl>
      <dt>{{ $t('captureTime') }}:</dt>
      <dd>{{ order.buy_time | dateFormat }}</dd>
    </dl>

    <dl>
      <dt>{{ $t('TotalOrderAmount') }}:</dt>
      <dd class="money">{{ order.amount | moneyFormat(2 , cointype) }}</dd>
    </dl>

    <dl>
      <dt>{{ $t('expectedReturn') }}:</dt>
      <dd class="money">+{{ (order.win_amount + order.amount) | moneyFormat(2 , cointype) }}</dd>
    </dl>


    <div class="info">{{ $t('Commission') }}: {{ $t('commissionOfPrice', {num: rateFormat(order.win_amount/order.amount)}) }}</div>

    <div class="options">
      <van-button class="cancel" @click="handleClose">{{$t('cancel')}}</van-button>
      <van-button class="purcharse" :loading="$store.getters['system/gloading']" @click="handlePurchase">{{ $t('purchase') }}</van-button>
    </div>


  </van-popup>
</template>

<script>
import {
  SHOW_GRAB_ORDER_DETAILS,
  PURCHASE_GRAB_SUCCESS
} from "@/utils/events";
import {rateFormat} from "@/utils/filters";

export default {
  name: "grabOrderDetails",
  data(){
    return {
      show:false,
      order:{},
      goodsinfo:{},
      attr:{},
      cointype:''
    }
  },
  created() {
    this.$bus.$on(SHOW_GRAB_ORDER_DETAILS , this.handleOpen)
  },
  methods:{
    handleOpen(payload){
      this.show = true
      this.order = payload.order
      this.goodsinfo = payload.goodsinfo
      this.attr = payload.attr
      this.cointype = payload.cointype
    },
    handleClose(){
      this.show = false
    },
    //点击购买
    async handlePurchase(){
      const resp = await this.$http.post('/v1/auth/business/match/grab',{
        id : this.order.id
      })
      if (resp.code === 200){
        this.handleClose()
        //刷新余额
        this.$store.dispatch('user/loadUserInfo')
        this.$bus.$emit(PURCHASE_GRAB_SUCCESS)
      }
    },
    rateFormat(val){
      return rateFormat(val)
    }
  },
  destroyed() {
    this.$bus.$off(SHOW_GRAB_ORDER_DETAILS)
  }
}
</script>

<style scoped lang="scss">
  .grabOrderDetails{
    padding: 31px 44px;
    .title{
      font-size: 18px;
      text-align: center;
      font-weight: 700;
      padding-bottom: 15px;
    }

    dl{
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
      dt{
        font-weight: 700;
        font-size: 15px;
      }
      dd{
        color: #999;
        &.money{
          color: #F97D1D;
          font-weight: 700;
        }
      }
    }

    .info{
      color: #CF182C;
      font-size: 13px;
      text-align: center;
      font-weight: 700;
      margin-top: 20px;
    }

    .options{
      display: flex;
      justify-content: center;
      padding-top: 20px;
      .van-button{
        width: 120px;
        height: 48px;
        background: #C4C4C4;
        border-radius: 41px;
        box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.16);
        border: none;
        color: #fff;
        margin-right: 15px;
        &.purcharse{
          background: linear-gradient(180deg, rgba(94, 217, 248, 0.99) 0%, rgba(29, 111, 223, 0.99) 100%);
        }
      }
    }
  }


</style>