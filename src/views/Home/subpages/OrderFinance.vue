<template>
  <div class="OrderFinance">

    <swiper />

    <div class="seat"></div>

  </div>
</template>

<script>
    import swiper from "../cpns/swiper";

    export default {
        name: "OrderFinance",
        components: {
            swiper
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
  }

</style>