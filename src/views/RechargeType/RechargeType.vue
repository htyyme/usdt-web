<template>
  <div class="RechargeType">


    <div class="header">
      <div class="pageheader">
        <van-icon :name="require('@/assets/icon/return.png')" size="23" class="return" @click="$router.back()"></van-icon>
        <span>{{$t('Choose Recharge')}}</span>
      </div>

    </div>

    <div class="box">
      <div class="typ">
        <van-image :src="require('@/assets/icon/rechargeusdt.png')"></van-image>
        <div class="info">
          <div class="tit">USDT</div>
          <p>{{usdtChargeInfo}}</p>
        </div>
      </div>

      <div class="typ">
        <van-image :src="require('@/assets/icon/rechargecoin.png')"></van-image>
        <div class="info">
          <div class="tit">Common currency</div>
          <p>{{coinChargeInfo}}</p>
        </div>
      </div>

      <div class="options">
        <van-button @click="toRechargePage('usdt')">USDT</van-button>
        <van-button @click="toRechargePage('coin')">CURRENCY</van-button>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: "RechargeType",
  computed:{
    usdtChargeInfo(){
      return this.$store.getters['system/config'].usdt_charge_info
    },
    coinChargeInfo(){
      return this.$store.getters['system/config'].coin_charge_info
    }
  },
  methods:{
    toRechargePage(typ){
      this.$router.push({
        name:'Recharge',
        query:{
          cointype:typ
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">

.RechargeType {
  min-height: 100vh;
  background-color: #f4f4f4;
  position: relative;


  .header{
    height: 270px;
    //background: #3596E8;
    border-radius: 0px 0px 13px 13px;
    background: url(~assets/img/choosebg.png) no-repeat;
    background-size: 375px;
    //background-position: top center;

    .pageheader{
      height: 49px;
      width: 100%;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 17px;
      .return{
        position: absolute;
        left: 15px;
      }
    }
  }

  .box{
    width: 345px;
    background: #FFFFFF;
    box-shadow: 0px 4px 3px rgba(88, 88, 88, 0.16);
    border-radius: 13px;
    margin: -75px auto;
    padding: 63px 15px 40px;
    .typ{
      display: flex;
      margin-bottom: 10px;
      .van-image{
        width: 71px;
        height: 71px;
        margin-right: 15px;
      }
      .info{
        .tit{
          font-size: 18px;
          font-weight: 700;
          padding: 10px 0 8px 0;
        }
        p{
          font-size: 13px;
          opacity: .75;
        }
      }
    }

    .options{
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      padding: 0 30px;
      .van-button{
        width: 115px;
        height: 55px;
        //background: linear-gradient(180deg, rgba(94, 217, 248, 0.99) 0%, rgba(29, 111, 223, 0.99) 100%);
        background: linear-gradient( to top,#242EAC,#626AD9);
        border-radius: 13px;
        color: #fff;
        margin-right: 15px;
        font-size: 14px;
      }
    }
  }



}

</style>
