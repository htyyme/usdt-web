<template>
  <div class="wallet">
    
    <router-link :to="{name:'Recharge'}">
      <van-icon :name="require('@/assets/icon/recharge.png')" size="26"></van-icon>
      <span>Recharge</span>
    </router-link>
    <router-link to="/">
      <van-icon :name="require('@/assets/icon/withdraw.png')" size="26"></van-icon>
      <span>Withdraw</span>
    </router-link>
    
  </div>
</template>

<script>
export default {
  name: "wallet"
}
</script>

<style scoped lang="scss">
.wallet{
  margin: 10px 15px;
  display: flex;
  justify-content: space-between;
  a{
    width: 168px;
    height: 65px;
    background-color: #fff;
    border-radius: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #F97D1D;
    span{
      font-size: 18px;
      font-weight: 700;
      margin-left: 10px;
      text-transform: capitalize;
    }
  }
}

</style>