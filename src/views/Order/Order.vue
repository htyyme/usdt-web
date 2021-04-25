<template>
  <div class="Order">
    <navbar :title="$t('Order')" :left-arrow="false"></navbar>

    <pageHeader :coincountdata="coincountdata" :usdtcountdata="usdtcountdata"/>

    <orderList />
  </div>
</template>

<script>
import pageHeader from "./cpns/pageHeader";
import orderList from "./cpns/orderList";
export default {
  name: "Order",
  components:{
    pageHeader,
    orderList
  },
  data(){
    return {
      coincountdata:{},
      usdtcountdata:{}
    }
  },
  async created() {
    this.queryCoundData()
  },
  methods:{
    //获取统计数据
    async queryCoundData(){
      const resp = await this.$http.post('/v1/auth/user/shuadan/income')
      this.coincountdata = resp.data.coin
      this.usdtcountdata = resp.data.usdt
    }
  }
}
</script>

<style scoped lang="scss">
.Order{
  min-height: calc(100vh - 49px);
  background-color: #f4f4f4;
}

</style>