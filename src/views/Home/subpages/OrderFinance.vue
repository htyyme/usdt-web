<template>
  <div class="OrderFinance">

    <swiper />

    <presentOrders />

    <div class="seat"></div>

    <productList />


  </div>
</template>

<script>
    import swiper from "../cpns/swiper";
    import productList from "../cpns/productList";
    //注册赠送的订单
    import presentOrders from "../cpns/presentOrders.vue";

    export default {
        name: "OrderFinance",
        components: {
            swiper,
            productList,
            presentOrders
        }
    }
</script>

<style scoped lang="scss">
  .OrderFinance {

    .seat{
      background-color: #f4f4f4;
      height: 11px;
      width: 100vw;
    }
    .seat2{
      background-color: #f4f4f4;
      height: 20px;
      width: 100vw;
    }
  }

</style>
