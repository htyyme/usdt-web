<template>
  <div class="wallet">

    <router-link :to="{name:'RechargeType'}">
      <van-icon :name="require('@/assets/icon/recharge.png')" size="26"></van-icon>
      <span>{{$t('recharge')}}</span>
    </router-link>
    <router-link :to="{name:'WithdrawType'}">
      <van-icon :name="require('@/assets/icon/withdraw.png')" size="26"></van-icon>
      <span>{{$t('withdraw')}}</span>
    </router-link>

  </div>
</template>

<script>
export default {
  name: "wallet"
}
</script>

<style scoped lang="scss">
@import "src/assets/css/vars.scss";
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
    color: $shallowMainColor;
    span{
      font-size: 18px;
      font-weight: 700;
      margin-left: 10px;
      text-transform: capitalize;
    }
  }
}

</style>
