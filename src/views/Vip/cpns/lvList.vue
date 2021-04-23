<template>
  <div class="lvList">
    <div class="item" v-for="item in 6" :key="item">
      <van-image :src="require('@/assets/icon/level.png')" class="levelicon"></van-image>
      <div class="tit">LV.1</div>
      <div class="sub-tit">member</div>
      <div class="content">
        <p>1. Each withdrawal limit is 5000</p>
        <p>2. The number of orders can be swipe until 30 times</p>
      </div>

      <div class="shadow">Withdraw cash once a day</div>
    </div>

  </div>
</template>

<script>
export default {
  name: "lvList"
}
</script>

<style scoped lang="scss">
.lvList{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 13px 25px;

  .item{
    height: 227px;
    width: 167px;
    background: url(~assets/img/lv1-bg.png) no-repeat;
    background-size: 167px;
    background-position: center bottom;
    position: relative;
    margin-bottom: 15px;
    .levelicon{
      width: 92px;
      height: 81px;
      position: absolute;
      top: 0;
      left: 10px;
    }
    .tit{
      font-size: 18px;
      font-weight: 700;
      text-align: right;
      padding: 30px 5px 0 0;
    }
    .sub-tit{
      color: #666;
      text-align: right;
      padding: 0px 5px 0 0;
    }
    .content{
      color: #666;
      font-size: 12px;
      padding: 10px 10px 0;
    }
    .shadow{
      position: absolute;
      font-size: 12px;
      color: #fff;
      height: 25px;
      border-radius: 13px;
      background-color: #9EB3E2;
      width: 162px;
      display: flex;
      justify-content: center;
      align-items: center;
      bottom: 12px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}

</style>