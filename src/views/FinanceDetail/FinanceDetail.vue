<template>
  <div class="FinanceDetail">
    <navbar :title="$t('Finance Details')"></navbar>


    <van-tabs v-model="activeName" line-width="100px" animated sticky color="#ff1720">

      <van-tab title="USDT" name="USDT">
        <lst cointype="usdt"/>
      </van-tab>

      <van-tab title="CURRENCY" name="CURRENCY">
        <lst cointype="coin"/>
      </van-tab>

    </van-tabs>

    <backTop />

  </div>
</template>

<script>
import lst from "./cpns/lst";
export default {
  name: "FinanceDetail",
  data() {
    return {
      activeName: 'USDT',
    };
  },
  components:{
    lst
  },
  created() {
    this.$store.dispatch('system/getBillDictionaries')
  }
}
</script>

<style scoped lang="scss">


</style>
