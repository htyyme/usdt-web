<template>
  <div class="me">
    <pageHeader />
    <wallet />
    <menuList />
  </div>
</template>

<script>
import pageHeader from "./cpns/pageHeader";
import wallet from "./cpns/wallet";
import menuList from "./cpns/menuList";
export default {
  name: "Me",
  components:{
    pageHeader,
    wallet,
    menuList
  },
  created() {
    this.$store.dispatch('user/loadUserInfo')
  }
}
</script>

<style scoped lang="scss">
.me{
  min-height: calc(100% - 49px);
  background-color: #f4f4f4;
  padding-bottom: 15px;
}

</style>