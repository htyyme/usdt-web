<template>
  <div>
    <navbar :title="$t('About')"></navbar>

    <van-collapse v-model="activeName" accordion>

      <van-collapse-item :title="$t('Version')" name="Version">
        {{$t('curVersion',{num:apkVersion})}}
      </van-collapse-item>

      <van-collapse-item :title="$t('About us')" name="AboutUs">
        <div class="content" v-html="aboutContent"></div>
      </van-collapse-item>

    </van-collapse>

  </div>
</template>

<script>
import appconfig from "@/config";


export default {
  name: "About",
  components: {},
  data() {
    return {
      activeName: 'Version',
      apkVersion: appconfig.apkVersion
    };
  },
  computed: {
    aboutContent(){
      return this.$store.getters['system/config'].about
    }
  }
}
</script>

<!--suppress CssUnknownTarget -->
<style lang="scss" scoped>
@import "~assets/css/vars";

</style>