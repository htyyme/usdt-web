<template>
  <div class="WithdrawRecord">
    <navbar :title="$t('Withdraw Record')"></navbar>

    <van-empty :image="require('@/assets/img/nodata.png')" v-if="list.length===0"></van-empty>

    <van-list class="list" v-model="loading" :finished="finished" :finished-text="$t('No more')" @load="loadData" :loading-text="$t('loading')">
      <div class="list-item" v-for="item in list" :key="item.id" :class="orderclass(item)">
          <div class="no-tit">Order number:</div>
          <div class="no">{{item.order_opt_sn}}</div>
          <div class="amount">
            <span>Amount：</span>
            <em>{{item.order_amount | moneyFormat(2,item.coin_type==2?'usdt':'coin')}}</em>
          </div>
        <div class="dt">{{item.creation_time |dateFormat}}</div>
        <div class="line"></div>
        <div class="status">
          <van-icon v-if="item.state <= 2 || item.state == 6" :name="require('@/assets/icon/orderaudit.png')"></van-icon>
          <van-icon v-else-if="item.state == 3" :name="require('@/assets/icon/ordersucc.png')"></van-icon>
          <van-icon v-else-if="item.state == 4 || item.state == 5 " :name="require('@/assets/icon/orderfail.png')"></van-icon>

          <span v-if="item.state <= 2|| item.state == 6">{{$t('In progress')}}</span>
          <span v-else-if="item.state == 3">{{$t('Success')}}</span>
          <span v-else-if="item.state == 4 || item.state == 5 ">{{$t('Failed')}}</span>

        </div>
      </div>



    </van-list>

  </div>
</template>

<script>
export default {
  name: "WithdrawRecord",
  data() {
    return {
      queryInfo: {
        page: 0,
        pageSize: 30,
      },
      list: [],
      loading: false,
      finished: false,
    }
  },
  created() {

  },
  methods: {
    async loadData() {
      this.queryInfo.page++
      try {
        const r = await this.$http.post('/v1/auth/user/withdraw/record', this.queryInfo)
        const {list, total} = r.data
        this.list = this.list.concat(list || [])
        this.loading = false;
        if (this.list.length >= total) {
          this.finished = true
        }
      } catch (e) {
        this.loading = false;
        this.finished = true
      }
    },
    orderclass(item){
      let arr = []
      let state = item.state
      if (state == 1 || state == 2){
        arr.push('inprogress')

      } else if (state == 3){
        arr.push('success')

      } else if (state == 4 || state == 5){
        arr.push('fail')
      }

      let coin_type = item.coin_type
      if (coin_type == 1){
        arr.push('coin')
      } else {
        arr.push('usdt')
      }
      return arr
    }
  }
}
</script>

<style scoped lang="scss">
/deep/.van-empty__image{
  height: unset;
}

.WithdrawRecord{
  min-height: 100vh;
  background-color: #f4f4f4;
  padding: 20px 16px;

  .list-item{
    background-color: #fff;
    margin-bottom: 10px;
    padding: 7px 14px 0 25px;
    border-radius: 15px;
    overflow: hidden;
    position: relative;
    &::before{
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 12px;
      background-color:  #F8868C;
    }
    &.success::before{
      background-color: #22BF3C;
    }
    &.fail::before{
      background-color: #CF182C;

    }
    &::after{
      content: "";
      position: absolute;
      width: 68px;
      height: 68px;
      right: 0;
      bottom: 0;
      background: url(~assets/icon/orderusdt.png) no-repeat;
      background-size: cover;
    }
    &.coin::after{
      background-image:  url(~assets/icon/ordercoin.png);
    }

    .no-tit{
      font-weight: 700;
      color: #333333;
    }
    .no{
      font-size: 12px;
      color: #333;
      padding-top: 6px;
    }
    .amount{
      font-size: 15px;
      margin-top: 6px;
      em{
        color: #3596E8;
        font-weight: 700;
      }
    }
    &.success .amount em{
      color: #22BF3C;
    }
    &.fail .amount em{
      color: #CF182C;
    }
    .dt{
      font-size: 12px;
      color: #999999;
      margin-top: 6px;
    }
    .line{
      width: 307px;
      border: 1px solid #707070;
      opacity: 0.2;
      margin-top: 11px;
    }
    .status{
      color: #3596E8;
      height: 28px;
      display: flex;
      align-items: center;
      .van-icon{
        padding-right: 5px;
      }
    }
    &.success .status{
      color: #22BF3C;
    }

    &.fail .status{
      color: #CF182C;
    }
  }
}

</style>
