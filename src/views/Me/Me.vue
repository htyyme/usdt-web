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
  }
}
</script>

<style scoped lang="scss">
.me{

}

</style>