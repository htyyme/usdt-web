<template>
  <div class="vip">
    <pageHeader :viplist="viplist"/>

    <lvList :viplist="viplist"/>

  </div>
</template>

<script>
import {getLvIcon} from "@/utils/tools";
import pageHeader from "./cpns/pageHeader";
import lvList from './cpns/lvList'
export default {
  name: "Vip",
  components:{
    pageHeader,
    lvList
  },
  data(){
    return {
      viplist:[]
    }
  },

  created() {
    this.loadviplist()

    this.$store.dispatch('user/loadUserInfo')
  },
  methods:{
    //获取等级列表
    async loadviplist(){
      const resp = await this.$http.post('/v1/vips')
      console.log(resp)
      this.viplist = resp.data || []
    }
  }
}
</script>

<style scoped lang="scss">
.vip {

}

</style>
