<template>
  <div class="OrderFinance">

    <swiper />

    <div class="seat"></div>

    <productList />


  </div>
</template>

<script>
    import swiper from "../cpns/swiper";
    import productList from "../cpns/productList";

    export default {
        name: "OrderFinance",
        components: {
            swiper,
            productList
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