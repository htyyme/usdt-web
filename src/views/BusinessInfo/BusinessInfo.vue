<template>
  <div class="BusinessInfo">
    <navbar :title="$t('Business Information')"></navbar>

    <topinfo />

    <maininfo />

  </div>
</template>

<script>
import topinfo from "./cpns/topinfo";
import maininfo from "./cpns/maininfo";
export default {
  name: "BusinessInfo",
  components:{
    topinfo,
    maininfo
  }
}
</script>

<style scoped lang="scss">
.BusinessInfo {

  background-color: #f4f4f4;
}

</style>