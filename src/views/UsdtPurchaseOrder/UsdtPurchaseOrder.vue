<template>
  <div class="PurchaseOrder">
    <navbar :title="$t('Purchase Order')"></navbar>

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