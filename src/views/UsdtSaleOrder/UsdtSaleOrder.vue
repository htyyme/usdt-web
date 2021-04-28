<template>
  <div class="UsdtSaleOrder">
    <navbar :title="$t('Sale Order')"></navbar>

    <van-tabs v-model="activeName" animated sticky line-width="100px" color="#3596E8">
      <van-tab :title="$t('Pending review')" name="Pending review">
        <list :state="1"/>
      </van-tab>
      <van-tab :title="$t('Passed')" name="Passed">
        <list :state="2"/>
      </van-tab>
      <van-tab :title="$t('Refuse')" name="Refuse">
        <list :state="3"/>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
import list from "./cpns/list";
export default {
  name: "UsdtSaleOrder",
  components:{
    list
  },
  data(){
    return {
      activeName:"Pending review"
    }
  }
}
</script>

<style scoped lang="scss">
.UsdtSaleOrder{

}

</style>