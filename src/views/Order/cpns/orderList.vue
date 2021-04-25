<template>
  <div class="orderList">
    <van-empty :image="require('@/assets/img/nodata.png')" :description="$t('noOrderToday')"></van-empty>
  </div>
</template>

<script>
export default {
  name: "orderList",
  data(){
    return {
      loading: false,
      finished: false,
      list: [],
      queryInfo: {
        page: 0,
        pageSize: 30,
        tp: 7,
      }
    }
  },
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