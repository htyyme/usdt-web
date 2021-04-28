<template>
  <div class="assets">
    <div class="title">{{$t('Remaining available assets')}}</div>
    <div class="num">{{availableBalance | moneyFormat(2,cointype)}}</div>
  </div>
</template>

<script>
export default {
  name: "assets",
  props:{
    cointype:String,
  },
  computed:{
    usdtAccount(){
      return this.$store.getters['user/usdtAccount']
    },
    coinAccount(){
      return this.$store.getters['user/coinAccount']
    },
    accountinfo(){
      return this.cointype === 'coin' ? this.coinAccount : this.usdtAccount
    },
    availableBalance(){
      return this.accountinfo.available_balance
    }
  }
}
</script>

<style scoped lang="scss">
.assets {
  margin: 20px 15px 0;
  padding: 10px 18px;
  background-color: #fff;
  border-radius: 13px;

  .title {
    font-size: 18px;
    font-weight: 700;
    color: #333333;
  }

  .num {
    width: 310px;
    height: 50px;
    background: #F6F6F6;
    border-radius: 25px;
    margin: 10px auto;
    color: #F97D1D;
    font-size: 22px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

</style>