<template>
  <div class="Order">
    <navbar :title="$t('Order')" :left-arrow="false"></navbar>

    <pageHeader :coincountdata="coincountdata" :usdtcountdata="usdtcountdata"/>

    <orderList />

    <!--抢单详情-->
    <grabOrderDetails />
    <!--购买成功-->
    <purchaseSuccess />

    <backTop />
  </div>
</template>

<script>
import pageHeader from "./cpns/pageHeader";
import orderList from "./cpns/orderList";

import grabOrderDetails from "@/views/OrderGrab/cpns/grabOrderDetails";
import purchaseSuccess from "@/views/OrderGrab/cpns/purchaseSuccess";

export default {
  name: "Order",
  components:{
    pageHeader,
    orderList,
    grabOrderDetails,
    purchaseSuccess
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