<template>
  <div class="TransferOut">
    <navbar :title="$t('interestRecord')"></navbar>


    <van-tabs v-model="activeName" animated sticky line-width="100px" color="#3596E8">
      <van-tab title="USDT" name="USDT">
        <usdtorder />
      </van-tab>
      <van-tab title="CURRENCY" name="CURRENCY">
        <coinorder />
      </van-tab>
    </van-tabs>


  </div>
</template>

<script>
import usdtorder from "./cpns/usdtorder";
import coinorder from "./cpns/coinorder";

export default {
  name: "TransferOut",
  data(){
    return {
      activeName:"USDT"
    }
  },
  components: {
    usdtorder,
    coinorder
  },

  methods: {


  }
}
</script>

<!--suppress CssUnknownTarget -->
<style scoped lang="scss">
@import "@/assets/css/vars.scss";

.TransferOut {

}

</style>