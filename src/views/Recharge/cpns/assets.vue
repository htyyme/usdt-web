<template>
  <div class="assets">
    <div class="title">{{$t('myTotalAssets')}}</div>
    <div class="info">
      <van-icon :name="require('@/assets/icon/recharge.png')" size="25" class="ico"></van-icon>
      <span>{{availableBalance | moneyFormat(2,cointype)}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "assets",
  props:{
    cointype:String,
    exchangeAccount:Object
  },
  computed:{
    order_type(){
      return this.$route.query.order_type
    },
    coinAccount(){
      return this.$store.getters['user/coinAccount']
    },
    usdtAccount(){
      return this.$store.getters['user/usdtAccount']
    },
    // accountinfo(){
    //   return this.cointype==='coin' ? this.coinAccount : this.usdtAccount
    // },
    // availableBalance(){
    //   return this.accountinfo.available_balance
    // },

    accountinfo(){
      if (this.order_type != 4){
        return this.cointype === 'coin' ? this.coinAccount : this.usdtAccount
      } else {
        return this.exchangeAccount
      }

    },
    availableBalance(){
      return this.accountinfo.available_balance
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/css/vars";
.assets{
  margin: 20px 15px 0;
  height: 115px;
  border: 1px solid #FFFFFF;
  //background: linear-gradient(181deg, #98DEF8 0%, #7ED7FA 31%, #75D4FB 54%, #35C1FF 100%);
  background: linear-gradient( to top, $shallowMainColor,$mainColor);
  opacity: 1;
  border-radius: 13px;
  padding: 10px 18px 0;
  .title{
    font-size: 17px;
    color: #fff;
    font-weight: 700;
  }
  .info{
    height: 50px;
    background: #F6F6F6;
    border-radius: 25px;
    margin-top: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $mainColor;
    position: relative;
    font-size: 22px;
    font-weight: 700;
    .ico{
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 30px;
    }
  }
}

</style>
