<template>
  <div class="RebateRecord">
    <navbar :title="$t('Rebate Record')"></navbar>



        <coin_rebaterecord />


  </div>
</template>

<script>
import usdt_rebaterecord from "./cpns/usdt_rebaterecord";
import coin_rebaterecord from "./cpns/coin_rebaterecord";
export default {
  name: "RebateRecord",
  components:{
    usdt_rebaterecord,
    coin_rebaterecord
  },
  data(){
    return {
      activeName:'CURRENCY'
    }
  }
}
</script>

<style scoped lang="scss">
  .RebateRecord{

  }
</style>