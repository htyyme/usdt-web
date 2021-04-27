<template>
  <div class="UsdtSelllist">
    <navbar title="My sales"></navbar>

    <van-tabs v-model="activeName" animated  color="#3596E8" line-width="100px" sticky>
      <van-tab title="On Sale" name="onsale">
        <list :type="1"/>
      </van-tab>
      <van-tab title="Suspend" name="Suspend">
        <list :type="2"/>
      </van-tab>
      <van-tab title="Over" name="Over">
        <list :type="4"/>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import list from "./cpns/list";
export default {
  name: "UsdtSelllist",
  components:{
    list
  },
  data() {
    return {
      activeName: "onsale"
    }
  }
}
</script>

<style scoped lang="scss">
.UsdtSelllist {
  min-height: 100vh;
  background-color: #f4f4f4;
}


</style>