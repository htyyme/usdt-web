<template>
  <van-overlay :show="show">

    <div class="purchase-success">
      <van-image :src="require('@/assets/img/forecast.png')" class="forecast"></van-image>
      <p>{{ $t('orderSubmitSuccess') }}</p>
      <van-button @click="handleClose" block>{{ $t('yes') }}</van-button>
    </div>

  </van-overlay>
</template>

<script>
import {PURCHASE_GRAB_SUCCESS} from "@/utils/events";

export default {
  name: "purchaseSuccess",
  data() {
    return {
      show:false
    }
  },
  created() {
    this.$bus.$on(PURCHASE_GRAB_SUCCESS, this.handleOpen)
  },
  methods: {
    handleOpen() {
      this.show = true
    },
    handleClose() {
      this.show = false
    }
  },
  destroyed() {
    this.$bus.$off(PURCHASE_GRAB_SUCCESS)
  }
}
</script>

<style scoped lang="scss">
.purchase-success {
  width: 306px;
  padding-bottom: 20px;
  //height: 384px;
  background: #FFFFFF url(~assets/img/ordersuccbg.png) no-repeat;
  background-size: 306px;
  background-position: top center;
  border-radius: 11px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .forecast {
    width: 140px;
    height: 103px;
    display: block;
    margin: 90px auto 0;
  }
  p{
    padding: 15px;
    font-size: 15px;
    color: #333;
    font-weight: 700;
  }

  .van-button {
    width: 40%;
    height: 45px;
    margin: 10px auto 0;
    //background: $mainColor;
    background: linear-gradient(180deg, rgba(94, 217, 248, 0.99) 0%, rgba(29, 111, 223, 0.99) 100%);
    border-radius: 27px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}


</style>