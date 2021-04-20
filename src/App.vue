<template>
  <div id="app">

    <router-view/>

    <tabbar v-if="showTabbar"/>
  </div>
</template>

<script>
import tabbar from "@/components/tabbar/tabbar";
export default {
  name:'App',
  components:{
    tabbar
  },
  computed:{
    showTabbar(){
      return !!this.$route.meta.showTabbar
    }
  },
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
  max-width: 100vw;
  overflow: hidden;
}

</style>
