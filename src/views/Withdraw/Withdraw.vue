<template>
  <div class="Withdraw">
    <navbar title="Withdraw"></navbar>

    <assets />
    <record />
    <withdrawForm />

    <van-notice-bar scrollable :text="$t('handlefeetip',{num:0.18})" color="#CF182C" background="#e5e5e5"/>


  </div>
</template>

<script>
import assets from "./cpns/assets";
import record from "./cpns/record";
import withdrawForm from "./cpns/withdrawForm";
export default {
  name: "Withdraw",
  components:{
    assets,
    record,
    withdrawForm
  }
}
</script>

<style scoped lang="scss">
.Withdraw {
  min-height: 100vh;
  background-color: #f4f4f4;

  .van-notice-bar {
    font-size: 12px;
    height: 25px;
  }
}


</style>