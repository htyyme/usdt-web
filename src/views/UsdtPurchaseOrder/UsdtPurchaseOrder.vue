<template>
  <div class="PurchaseOrder">
    <navbar :title="$t('Purchase Order')"></navbar>

    <van-tabs v-model="activeName" animated sticky line-width="100px" color="#3596E8">
      <van-tab :title="$t('Pending')" name="Pending">
        <list :state="20"/>
      </van-tab>
      <van-tab :title="$t('Passed')" name="Passed">
        <list :state="21"/>
      </van-tab>
      <van-tab :title="$t('Success')" name="Success">
        <list :state="22"/>
      </van-tab>
      <van-tab :title="$t('Failed')" name="Failed">
        <list :state="23"/>
      </van-tab>
      <van-tab :title="$t('Cancel')" name="Cancel">
        <list :state="24"/>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
import list from "./cpns/list";
export default {
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

.PurchaseOrder{
  min-height: 100vh;
  background-color: #f4f4f4;
}

</style>
