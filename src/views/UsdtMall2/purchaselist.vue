<template>
  <div>
    <van-tabs v-model="active" color="#0066ED" animated>
      <van-tab title="USDT">
        <vanlistcpn />
      </van-tab>
      <van-tab title="BTC">
        <vanlistcpn />
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
import vanlistcpn from "./vanlistcpn";
export default {

  components:{
    vanlistcpn
  },
  data() {
    return {
      active: 0
    }
  },
}
</script>

<style scoped lang="scss">

/deep/ .van-tabs__wrap{
  border: 1px solid #E7EBEE;
  .van-tab{
    flex: unset;
    min-width: 100px;
  }
  .van-tabs__line{
    //transform: unset;
  }
}

</style>
