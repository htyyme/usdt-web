<template>
  <div id="app">

    <router-view/>

    <announce />

    <floatBall />

    <tabbar v-if="showTabbar"/>


  </div>
</template>

<script>
import tabbar from "@/components/tabbar/tabbar";
import appConfig from "@/config";
import vars from "@/assets/css/vars.scss";
export default {
  name:'App',
  components:{
    tabbar
  },
  computed:{
    showTabbar(){
      return !!this.$route.meta.showTabbar
    },
    islogin(){
      let token =  this.$store.getters['user/token']
      return !!token
    }
  },
  async mounted() {
    await this.$store.dispatch('system/loadConfig')
    //根据版本信息 判断是否需要更新App
    await this.updateApp()

    document.body.addEventListener('click', ()=>{
      this.$tools.playClickSound()
    })
  },
  methods:{
    /**
     * 根据版本信息 判断是否需要更新App
     */
    async updateApp() {
      //如果不是App则不需要进行更新
      if (!appConfig.isApp) return

      if (this.$store.getters['system/config'].version <= appConfig.apkVersion){
        return
      }

      const confirmRes = await this.$dialog.confirm({
        message: this.$t('confirmUpdateApp'),
        theme: 'round-button',
        showCancelButton: false, //不显示取消按钮
        confirmButtonColor: vars.mainColor,
        confirmButtonText: this.$t('confirm')
      }).catch(e => e)
      if (confirmRes !== 'confirm') return

      // this.$tools.openUrl(this.$store.getters['system/config'].android_app_url)
      this.$tools.downloadApp()
    },
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
