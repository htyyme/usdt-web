<template>
  <div class="subNavs">
    <div class="wallet">
      <router-link :to="{name:'Recharge'}">
        <van-icon :name="require('@/assets/icon/recharge.png')" size="25"></van-icon>
        <span>recharge</span>
      </router-link>
      <router-link :to="{name:'Withdraw'}">
        <van-icon :name="require('@/assets/icon/withdraw.png')" size="25"></van-icon>
        <span>withdraw</span>
      </router-link>
    </div>

    <ul>
      <li>
        <van-image :src="require('@/assets/icon/order-finance.png')"></van-image>
        <span>Order finance</span>
      </li>
      <li>
        <van-image :src="require('@/assets/icon/financial-product.png')"></van-image>
        <span>Financial product</span>
      </li>
      <li>
        <van-image :src="require('@/assets/icon/invite-friends.png')"></van-image>
        <span>Invite friends</span>
      </li>
      <li>
        <van-image :src="require('@/assets/icon/mission.png')"></van-image>
        <span>Mission</span>
      </li>
      <li>
        <van-image :src="require('@/assets/icon/introduction.png')"></van-image>
        <span>Introduction</span>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "subNavs"
    }
</script>

<style scoped lang="scss">
  .subNavs {
    margin-top: 30px;
    padding: 10px 20px 25px;

    .wallet{
      display: flex;
      justify-content: space-between;
      a{
        height: 45px;
        background-color: #F4F4F4;
        color: #F97D1D;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 23px;
       span{
         font-size:18px;
         text-transform: capitalize;
       }
        .van-icon{
          padding-right: 5px;
        }
      }
    }

    ul{
      display: flex;
      padding-top: 13px;
      li{
        flex: 1;
        text-align: center;
        .van-image{
          width: 50px;
          height: 50px;
        }
        span{
          font-size: 12px;
        }
      }
    }
  }

</style>