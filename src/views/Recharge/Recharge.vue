<template>
  <div class="recharge">
    <navbar title="Recharge"></navbar>

    <assets />
    <payWay />
    <amounts />

    <div class="bottom-info">In order to ensure the success rate of transaction, please ensure that the mobile phone number and email address are correct.</div>

    <van-button block class="submit-btn">Recharge</van-button>
  </div>


</template>

<script>
import assets from "./cpns/assets";
import payWay from "./cpns/payWay";
import amounts from "./cpns/amounts";
export default {
  name: "Recharge",
  components:{
    assets,
    payWay,
    amounts
  }
}
</script>

<style scoped lang="scss">
.recharge {
  min-height: 100vh;
  background-color: #f4f4f4;
  padding-bottom: 36px;

  .bottom-info{
    font-size: 14px;
    line-height: 1.4;
    color: #1D6FDF;
    opacity: 1;
    margin: 18px 22px 0;
  }

  .submit-btn{
    width: 250px;
    height: 55px;
    background: linear-gradient(180deg, rgba(94, 217, 248, 0.99) 0%, rgba(29, 111, 223, 0.99) 100%);
    border-radius: 28px;
    color: #fff;
    font-size: 20px;
    margin: 20px auto 0;
  }
}

</style>