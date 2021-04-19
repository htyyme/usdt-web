<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<script>
export default {
  name:'App',
  created() {
    // this.$store.commit('system/setLocale','aaa')
  }
}
</script>

<style lang="scss">

#app{
  font-family: PingFang SC;
}

</style>
