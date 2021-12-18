<template>
  <ul>
    <router-link :to="{name:'OrderFinance'}" tag="li">
      <van-image :src="require('@/assets/icon/order-finance.png')"></van-image>
      <span>{{$t('orderFinance')}}</span>
    </router-link>
    <router-link :to="{name:'FinanceProduct'}" tag="li">
      <van-image :src="require('@/assets/icon/financial-product.png')"></van-image>
      <span>{{$t('质押收益')}}</span>
    </router-link>
    <router-link :to="{name:'Invite'}" tag="li">
      <van-image :src="require('@/assets/icon/invite-friends.png')"></van-image>
      <span>{{$t('inviteFriends')}}</span>
    </router-link>
    <!--      <li>-->
    <!--        <van-image :src="require('@/assets/icon/mission.png')"></van-image>-->
    <!--        <span>Mission</span>-->
    <!--      </li>-->
    <router-link :to="{name:'Mission'}" tag="li">
      <van-image :src="require('@/assets/icon/mission.png')"></van-image>
      <span>{{$t('Activity bonus')}}</span>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: "subNav"
}
</script>

<style scoped lang="scss">
ul{
  width: 350px;
  background: rgba(255, 255, 255, 0.99);
  border-radius: 11px;
  display: flex;
  margin: 0 auto 10px;

  li{
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 10px 0;
    &.router-link-active{
      color: #3596E8;
    }
    .van-image{
      width: 46px;
      height: 46px;
      margin-bottom: 5px;
    }
    span{
      font-size: 12px;
      padding: 0 5px;
      text-transform: capitalize;
    }
  }
}

</style>
