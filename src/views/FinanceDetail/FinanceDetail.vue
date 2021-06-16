<template>
  <div class="FinanceDetail">
    <navbar :title="$t('Finance Details')"></navbar>


    <lst cointype="coin"/>

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
  }
}
</script>

<style scoped lang="scss">


</style>