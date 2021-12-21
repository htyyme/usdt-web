<template>
  <div class="RebateRecord">
    <navbar :title="$t('Rebate Record')"></navbar>

    <van-tabs v-model="activeName" line-width="100px" color="#242EAC">
      <van-tab title="USDT" name="USDT">
        <usdt_rebaterecord />
      </van-tab>

      <van-tab title="CURRENCY" name="CURRENCY">
        <coin_rebaterecord />
      </van-tab>

    </van-tabs>

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
      activeName:'USDT'
    }
  }
}
</script>

<style scoped lang="scss">
  .RebateRecord{

  }
</style>
