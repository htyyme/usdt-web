<template>
  <div class="home">
    <pageHeader :coinCountData="coinCountData"/>
    <wallet :usdtCountData="usdtCountData" :coinCountData="coinCountData"/>
    <subNav/>
    <!--<noticeBar/>-->

    <router-view/>
  </div>
</template>

<script>
import pageHeader from "./cpns/pageHeader";
import subNav from "./cpns/subNav";
import noticeBar from "./cpns/noticeBar";
import wallet from "./cpns/wallet";

export default {
  name: "Home",
  components: {
    pageHeader,
    subNav,
    noticeBar,
    wallet
  },

  data(){
    return {
      usdtCountData:{},
      coinCountData:{}
    }
  },
  mounted() {
    this.$store.dispatch('user/loadUserInfo')

    this.loadData()
  },
  methods:{
    async loadData(){
      const resp = await this.$http.post('/v1/auth/user/shuadan/income')
      console.log(resp)
      this.usdtCountData = resp.data.usdt
      this.coinCountData = resp.data.coin
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  background-color: #f4f4f4;
  min-height: calc(100vh - 49px);
}

</style>