<template>
  <div class="vip">
    <pageHeader :viplist="viplist"/>

    <lvList :viplist="viplist"/>

    <div class="foot-text">
      <van-icon name="warning" size="16" color="#FA3061"/>
      Observação: somente o cálculo do primeiro nível de subordinados, o segundo nível de subordinados, o terceiro nível de subordinados não estão incluídos, para atender às condições do sistema serão promovidos automaticamente!
    </div>
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
      console.log(this.viplist[0].state)
    }
  }
}
</script>

<style scoped lang="scss">
.vip {

  .foot-text{
    font-size: 13px;
    padding: 16px;
    padding-top: 0;
    color: #000;
  }
}

</style>
