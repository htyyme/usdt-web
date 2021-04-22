<template>
  <div class="Order">
    <navbar title="Order" :left-arrow="false"></navbar>

    <pageHeader />

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
  async created() {

  }
}
</script>

<style scoped lang="scss">
.Order{
  min-height: calc(100vh - 49px);
  background-color: #f4f4f4;
}

</style>