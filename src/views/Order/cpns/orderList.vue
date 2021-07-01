<template>
  <div class="orderList">
    <van-empty v-if="list.length===0" :image="require('@/assets/img/nodata.png')" :description="$t('noOrderToday')"></van-empty>

    <van-list class="list" v-model="loading" :finished="finished" :finished-text="$t('No more')" @load="loadData" :loading-text="$t('loading')">
      <div class="item" v-for="item in list" :key="item.id" :class="itemclass(item)">
        <div class="item-top">{{$t('OrderNumber')}}: {{item.order_sn}}</div>

        <div class="item-content">
          <div class="content-left">
            <div>
              <div>{{$t('TotalOrderAmount')}}:</div>
              <div class="red">{{item.amount | moneyFormat(2,item.coin_type==1?'coin':'usdt')}}</div>
            </div>
            <div>
              <div>{{$t('expectedReturn')}}:</div>
              <div class="red">{{item.amount + item.win_amount | moneyFormat(2,item.coin_type==1?'coin':'usdt')}}</div>
            </div>
          </div>
          <div class="content-right">
            <van-image v-if="item.state === 2"  :src="require('@/assets/icon/shuadan_dd_cg.png')"></van-image>
            <van-image v-else-if="item.state === 1"  :src="require('@/assets/icon/shuadan_dd_btn.png')" @click="finishOrder(item)"></van-image>
            <span class="dt">{{item.buy_time | dateFormat('YYYY-MM-DD HH:mm')}}</span>
          </div>
        </div>

        <div class="btm">{{ $t('Commission') }}: {{ $t('commissionOfPrice', {num: rateFormat(item.win_amount/item.amount)}) }}</div>

      </div>


    </van-list>
  </div>
</template>

<script>
import {PURCHASE_GRAB_SUCCESS, SHOW_GRAB_ORDER_DETAILS} from "@/utils/events";
import {rateFormat} from "@/utils/filters";

export default {
  name: "orderList",
  data(){
    return {
      loading: false,
      finished: false,
      list: [],
      queryInfo: {
        page: 0,
        pageSize: 30,
        tp: 7,
      }
    }
  },
  created() {
    this.$bus.$on(PURCHASE_GRAB_SUCCESS,()=>{
      this.finished = false
      this.list = []
      this.queryInfo.page = 0
    })
  },
  methods:{
    async loadData () {
      this.queryInfo.page++
      let resp = await this.$http.post('/v1/auth/business/match/record', {
        ...this.queryInfo,
      })
      const {list,total} = resp.data
      this.loading = false
      this.list = this.list.concat(list || [])
      if (this.list.length >= total){
        this.finished = true
      }
    },
    reloaddata(){
      this.queryInfo.page = 0
      this.list = []
      this.loading = false
      this.finished = false
      this.loadData()
    },
    itemclass(item){
      let arr = []
      if (item.coin_type === 1){
        arr.push('type-coin')
      } else if (item.coin_type === 2){
        arr.push('type-usdt')
      }

      if (item.state === 1){
        arr.push('unfinish')
      }
      return arr
    },
    finishOrder(item){
      let payload = {}

      payload.order = item
      payload.attr = {}
      payload.goodsinfo = {}
      if (item.coin_type === 1){
        payload.cointype = 'coin'
      }else if (item.coin_type === 2){
        payload.cointype = 'usdt'
      }
      this.$bus.$emit(SHOW_GRAB_ORDER_DETAILS,payload)
    },
    rateFormat(val){
      return rateFormat(val)
    }
  },
  destroyed() {
    this.$bus.$off(PURCHASE_GRAB_SUCCESS)
  }
}
</script>

<style scoped lang="scss">
.orderList{
  /deep/.van-empty{
    .van-empty__image{
      height: unset;
    }
  }

  .item{
    width: 345px;
    height: 140px;
    //background: #fff;
    opacity: 1;
    border-radius: 13px;
    margin: 10px auto;
    font-size: 14px;
    padding: 15px;
    background:#fff url(~assets/icon/grab-type-coin.png) no-repeat;
    background-position: right bottom;
    background-size: 60px 60px;
    &.type-usdt{
      background-image: url(~assets/icon/grab-type-usdt.png);
    }
    &.unfinish{
      background-color: rgb(193, 208, 255) ;
    }
    .item-top{
      font-weight: 700;
    }

    .item-content {
      margin-top: 15px;
      display: flex;
      justify-content: space-evenly;
      text-align: center;
      margin-bottom: 5px;

      .content-left {
        display: flex;
        justify-content: space-evenly;
        text-align: center;
      }

      .content-right {
        width: 130px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .van-image{
          width: 90px;
          height: 30px;
          margin-bottom: 2px;
        }
        .dt{
          margin-top: 9px;
          font-size: 12px;
          color: #8f8f8f;
        }
      }

      .red {
        color: #3596E8;
        margin-top: 3px;
      }
    }

    .btm{
      color: #f00;
      font-size: 13px;
    }
  }

}

</style>