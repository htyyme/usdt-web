<template>
  <div class="Withdraw">
    <navbar title="Withdraw"></navbar>

    <assets />
    <record />
    <withdrawForm />

    <van-notice-bar scrollable :text="$t('handlefeetip',{num:0.18})" color="#CF182C" background="#e5e5e5"/>
    <bankCardInfo />
    <pageFooter />

    <van-button  block  class="withdraw-btn" >{{$t('Withdraw')}}</van-button>
  </div>
</template>

<script>
import assets from "./cpns/assets";
import record from "./cpns/record";
import withdrawForm from "./cpns/withdrawForm";
import bankCardInfo from "./cpns/bankCardInfo";
import pageFooter from "./cpns/pageFooter";
export default {
  name: "Withdraw",
  components:{
    assets,
    record,
    withdrawForm,
    bankCardInfo,
    pageFooter
  }
}
</script>

<style scoped lang="scss">
.Withdraw {
  min-height: 100vh;
  background-color: #f4f4f4;
  padding-bottom: 35px;

  .van-notice-bar {
    font-size: 12px;
    height: 25px;
  }

  .withdraw-btn {
    width: 250px;
    height: 55px;
    background: linear-gradient(180deg, rgba(94, 217, 248, 0.99) 0%, rgba(29, 111, 223, 0.99) 100%);
    border-radius: 28px;
    font-size: 20px;
    color: #fff;
    margin: 20px auto 0;
  }
}


</style>