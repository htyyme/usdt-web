<template>
  <div class="assets">
    <div class="title">Remaining available assets</div>
    <div class="num">{{availableBalance | moneyFormat}}</div>
  </div>
</template>

<script>
export default {
  name: "assets",
  computed:{
    gcointype(){
      return this.$store.getters['system/gcointype']
    },
    usdtAccount(){
      return this.$store.getters['user/usdtAccount']
    },
    coinAccount(){
      return this.$store.getters['user/coinAccount']
    },
    accountinfo(){
      return this.gcointype === 'coin' ? this.coinAccount : this.usdtAccount
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