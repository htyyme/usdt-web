<template>
  <div class="JEmpty">
    <van-empty :image="require('@/assets/img/empty.png')" :description="description"/>
  </div>
</template>

<script>
export default {
  name: "JEmpty",
  props:{
    description:String
  }
}
</script>

<style scoped lang="scss">

.JEmpty{
  ::v-deep .van-empty__image{
    width: 150px;
    height: 150px;
  }
  ::v-deep .van-empty__description{
    color: #acafc2;
  }
}

</style>
