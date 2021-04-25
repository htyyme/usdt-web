<template>
  <div class="home">
    <pageHeader/>
    <wallet/>
    <subNav/>
    <noticeBar/>

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
  }
}
</script>

<style scoped lang="scss">
.home {
  background-color: #f4f4f4;
}

</style>