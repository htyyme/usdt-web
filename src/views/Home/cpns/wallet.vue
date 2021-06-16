<template>
  <div class="wallet">
    <div class="counter">
      <dl>
        <dt>{{countdata.yesterdayearn | moneyFormat(2,gcointype)}}</dt>
        <dd>{{$t('yesterdaysEarning')}}</dd>
      </dl>
      <dl>
        <dt>{{countdata.totalincome | moneyFormat(2,gcointype) }}</dt>
        <dd>{{$t('comulativeIncome')}}</dd>
      </dl>
      <dl>
        <dt>{{countdata.totalincome | moneyFormat(2,gcointype)}}</dt>
        <dd>{{$t('todaysEarning')}}</dd>
      </dl>
    </div>

    <div class="option">
      <a href="javascript:;" @click="toRecharge">
        <van-icon :name="require('@/assets/icon/recharge.png')" size="23"></van-icon>
        <span>{{$t('recharge')}}</span>
      </a>

      <a href="javascript:;" @click="toWithdraw">
        <van-icon :name="require('@/assets/icon/withdraw.png')" size="23"></van-icon>
        <span>{{$t('withdraw')}}</span>
      </a>
    </div>

  </div>
</template>

<script>
export default {
  name: "wallet",
  created() {
    this.loadData()
  },
  data(){
    return {
      usdtCountData:{},
      coinCountData:{}
    }
  },
  computed:{
    gcointype(){
      return this.$store.getters['system/gcointype']
    },
    countdata(){
      if ( this.gcointype === 'coin'){
        return this.coinCountData
      }else if (this.gcointype === 'usdt'){
        return this.usdtCountData
      }
    }
  },
  methods:{
    async loadData(){
      const resp = await this.$http.post('/v1/auth/user/shuadan/income')
      // console.log(resp)
      this.usdtCountData = resp.data.usdt
      this.coinCountData = resp.data.coin
    },
    toRecharge(){
      this.$router.push({
        name:'Recharge',
        query:{
          cointype:'coin'
        }
      })
    },
    toWithdraw(){
      this.$router.push({
        name:'Withdraw',
        query:{
          cointype:'coin'
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.wallet{
  width: 350px;
  height: 113px;
  background: rgba(255, 255, 255, 0.99);
  border-radius: 11px;
  margin: -6px auto 10px;
  position: relative;

  .counter {
    display: flex;
    padding-top: 8px;

    dl {
      flex: 1;
      text-align: center;

      dt {
        font-size: 16px;
        font-weight: 700;
        color: #9F58FE;
        padding-bottom: 6px;

      }

      dd {
        font-size: 12px;
        color: #1D6FDF;
      }
    }
  }
  .option{
    padding: 15px;
    display: flex;
    justify-content: space-between;
    a{
      width: 146px;
      height: 37px;
      background: #F4F4F4;
      border-radius: 8px;
      color: #F97D1D;
      font-size: 17px;
      display: flex;
      justify-content: center;
      align-items: center;
      .van-icon{
        padding-right: 6px;
      }
    }
  }
}

</style>