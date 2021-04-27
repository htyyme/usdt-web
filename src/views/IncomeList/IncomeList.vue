<template>
  <div>
    <navbar :title="$t('Income List')"></navbar>

    <van-tabs v-model="activeName" sticky animated line-width="100px" color="#09A1ED">
      <van-tab title="USDT" name="USDT">
        <usdt_incomelist />
      </van-tab>

      <van-tab title="CURRENCY" name="CURRENCY">
        <coin_incomelist />
      </van-tab>

    </van-tabs>
  </div>
</template>

<script>
import coin_incomelist from "./cpns/coin_incomelist";
import usdt_incomelist from "./cpns/usdt_incomelist";
export default {
  name: "IncomeList",
  components:{
    coin_incomelist,
    usdt_incomelist
  },
  data(){
    return {
      activeName:'USDT',
    }
  }
}
</script>

