<template>
  <div class="me">
    <pageHeader />
    <wallet v-if="three_service_address.length>0"/>
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
  computed:{
    three_service_address(){
      return this.$store.getters['system/config'].three_service_address
    }
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