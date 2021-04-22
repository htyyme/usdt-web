<template>
  <section class="withdraw-form card-wrapper">
    <div class="card-tit">{{$t('Withdrawal amount')}}</div>

    <div class="card-val">
      <input type="number" :placeholder="$t('Enter the withdrawal amount')" v-model.number="form.amount" autocomplete="off"/>
    </div>
    <div class="card-val">
      <input type="password" :placeholder="$t('Enter the fund password')" v-model="form.password" autocomplete="off"/>
      <van-button color="#3596E8" round size="normal" :to="{name:'PaymentPassword'}" >{{$t('Forget')}}</van-button>
    </div>

  </section>
</template>

<script>
import vars from "@/assets/css/vars.scss";

export default {
  name: "withdrawForm",
  data() {
    return {
      form: {
        amount:'',
        password:''
      }
    }
  },
  computed: {

  },
  created() {

  },
  methods: {

  }
}
</script>

<style scoped lang="scss">

.card-wrapper{
  display: block;
  width: 345px;
  background-color: #fff;
  margin: 15px auto;
  border-radius: 10px;
  padding: 11px 18px;
  .card-tit{
    font-weight: 700;
    font-size: 17px;
  }
  .card-val{
    //color: $mainColor;
    height: 49px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 21px;
    background-color: #F6F2FC;
    border-radius: 50px;
    margin-top: 10px;
    margin-bottom: 10px;
    overflow: hidden;
    input{
      flex: 1;
      height: 100%;
      border:none;
      background-color: transparent;
      font-size: 14px;
      padding-left: 26px;
      border-radius: 50px;
      &::placeholder{
        color: #999;
      }
    }
    .van-button{
      margin-left: 10px;
    }
  }

  dl{
    dt{
      font-weight: 700;
      font-size: 17px;
      color: #97B9F5;
    }
    dd{
      height: 49px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 17px;
      background-color: #F9F9F9;
      border-radius: 50px;
      margin-top: 10px;
      margin-bottom: 10px;
      overflow: hidden;
      padding-left: 26px;
    }
  }
}


.withdraw-form {
  .card-val {
    background-color: transparent;

    input {
      background-color: #f9f9f9;
    }
  }



}
</style>
