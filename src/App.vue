<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<script>
export default {
  name:'App',
  async created() {
    await this.$store.dispatch('system/loadConfig')
    //todo 根据版本信息 判断是否需要更新App
  }
}
</script>

<style lang="scss">

#app{
  font-family: PingFang SC;
  font-size: 16px;
}

</style>
