<template>
  <div class="orderList">
    <van-empty :image="require('@/assets/img/nodata.png')" description="No order"></van-empty>
  </div>
</template>

<script>
export default {
  name: "orderList"
}
</script>

<style scoped lang="scss">
.orderList{
  /deep/.van-empty{
    .van-empty__image{
      height: unset;
    }
  }
}

</style>