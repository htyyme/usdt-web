<template>
  <div class="menuList">
    <ul>
      <li>
        <van-icon :name="require('@/assets/icon/membersystem.png')" size="40"></van-icon>
        <span>Member system</span>
        <van-icon :name="require('@/assets/icon/more.png')" class="more"></van-icon>
      </li>

      <li>
        <van-icon :name="require('@/assets/icon/bankcard.png')" size="40"></van-icon>
        <span>Bank card</span>
        <van-icon :name="require('@/assets/icon/more.png')" class="more"></van-icon>
      </li>

      <li>
        <van-icon :name="require('@/assets/icon/withdrawrecord.png')" size="40"></van-icon>
        <span>Withdraw record</span>
        <van-icon :name="require('@/assets/icon/more.png')" class="more"></van-icon>
      </li>

      <li>
        <van-icon :name="require('@/assets/icon/rechargerecord.png')" size="40"></van-icon>
        <span>Recharge record</span>
        <van-icon :name="require('@/assets/icon/more.png')" class="more"></van-icon>
      </li>

      <li>
        <van-icon :name="require('@/assets/icon/personalinfomation.png')" size="40"></van-icon>
        <span>Personal information</span>
        <van-icon :name="require('@/assets/icon/more.png')" class="more"></van-icon>
      </li>

      <li>
        <van-icon :name="require('@/assets/icon/Businessinfo.png')" size="40"></van-icon>
        <span>Business information</span>
        <van-icon :name="require('@/assets/icon/more.png')" class="more"></van-icon>
      </li>

      <li>
        <van-icon :name="require('@/assets/icon/aboutus.png')" size="40"></van-icon>
        <span>About us</span>
        <van-icon :name="require('@/assets/icon/more.png')" class="more"></van-icon>
      </li>

      <li>
        <van-icon :name="require('@/assets/icon/signout.png')" size="40"></van-icon>
        <span>Sign out</span>
        <van-icon :name="require('@/assets/icon/more.png')" class="more"></van-icon>
      </li>

    </ul>
  </div>
</template>

<script>
export default {
  name: "menuList"
}
</script>

<style scoped lang="scss">
.menuList{
  background-color: #fff;
  padding: 0 20px 10px;

  ul{
    li{
      font-size: 14px;
      color: #333;
      display: flex;
      align-items: center;
      padding: 15px 0 0;
      font-weight: 700;
      position: relative;
      span{
        padding-left: 15px;
      }
      .more{
        position: absolute;
        right: 0;
      }
    }
  }

}

</style>