<template>
  <div class="pageHeader">
    <div class="pagetitle">
      <van-icon :name="require('@/assets/icon/return.png')" size="25" @click="$router.back()" class="return"></van-icon>
      {{$t('OrderGrabbing')}}
    </div>

    <div class="counter">
      <dl>
        <dt>{{countData.todayorder}}</dt>
        <dd>{{$t('todayOrder')}}</dd>
      </dl>
      <dl>
        <dt>{{countData.todayearn| moneyFormat(2,cointype)}}</dt>
        <dd>{{$t('todayEarnings')}}</dd>
      </dl>
      <dl>
        <dt>{{countData.teamtodayearn| moneyFormat(2,cointype)}}</dt>
        <dd>{{$t('teamBenefitsToday')}}</dd>
      </dl>
      <dl>
        <dt>{{totalAssets | moneyFormat(2,cointype)}}</dt>
        <dd>{{$t('totalAssets')}}</dd>
      </dl>
      <dl>
        <dt>{{totalAssets.yesterdayearn| moneyFormat(2,cointype)}}</dt>
        <dd>{{$t('yesterdaysEarning')}}</dd>
      </dl>
      <dl>
        <dt>{{countData.teamyesterdayearn| moneyFormat(2,cointype)}}</dt>
        <dd>{{$t('YesterdayTeamEarnings')}}</dd>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  name: "pageHeader",
  props:{
    cointype:String,
    countData:Object
  },
  computed:{
    //总余额
    totalAssets(){
      if (this.cointype === 'coin'){
        return this.$store.getters['user/coinAccount'].available_balance
      }else{
        return this.$store.getters['user/usdtAccount'].available_balance
      }
    }
  }
}
</script>

<style scoped lang="scss">

.pageHeader{
  height: 269px;
  background: #3596E8;
  border-radius: 0px 0px 13px 13px;
  .pagetitle{
    height: 49px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 18px;
    position: relative;
    .return{
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .counter{
    width: 345px;
    //height: 160px;
    border: 1px solid #FFFFFF;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%);
    //filter: blur(40px);
    opacity: 1;
    border-radius: 13px;
    margin: 15px auto 0;
    display: flex;
    flex-wrap: wrap;
    padding: 0 8px;
    dl{
      height: 80px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #e6e6e6;
      width: 33.33%;
      color: #fff;
      text-align: center;
      &:nth-child(n+4){
        border-bottom: none;
      }
      dt{
        font-size: 20px;
        margin-bottom: 6px;

      }
      dd{
        font-size: 12px;
        height: 30px;
      }
    }
  }
}

</style>