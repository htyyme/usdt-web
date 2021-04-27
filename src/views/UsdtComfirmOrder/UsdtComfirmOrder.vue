<template>
  <div class="UsdtComfirmOrder">
    <navbar title="Confirm Order"></navbar>

    <div class="wrapper">
        <div class="card-title">Transfer information</div>

      <dl>
        <dt>Shop name</dt>
        <dd>{{shopinfo.name}}</dd>
      </dl>

      <dl>
        <dt>Bank card</dt>
        <dd>{{shopinfo.account}}</dd>
      </dl>

      <dl>
        <dt>Ifsc</dt>
        <dd>{{shopinfo.ifsc}}</dd>
      </dl>

      <dl>
        <dt>Payee</dt>
        <dd>{{shopinfo.account_name}}</dd>
      </dl>

      <dl>
        <dt>Whatsapp</dt>
        <dd>{{shopinfo.what_app}}</dd>
      </dl>
    </div>

    <van-button class="confirm-btn" block @click="handleConfirm">Confirm</van-button>

  </div>
</template>

<script>
export default {
  name: "UsdtComfirmOrder",
  computed:{
    shopinfo(){
      return this.$store.getters['usdt/currentshopinfo']
    }
  },
  methods:{
    handleConfirm(){
      this.$router.push({
        name:'Usdt'
      })

    }
  }
}
</script>

<style scoped lang="scss">

.UsdtComfirmOrder{
  min-height: 100vh;
  background-color: #f4f4f4;

  .wrapper{
    width: 345px;
    margin: 25px auto;
    background: linear-gradient(to bottom,#53C8F4,#2378E1);
    border-radius: 13px ;
    color: #fff;
    padding: 31px 0 30px 25px;

    .card-title{
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 65px;
    }
    dl{
      display: flex;
      font-size: 14px;
      margin-bottom: 20px;
      dt{
        width: 30%;
      }
    }
  }

  .confirm-btn{
    width: 250px;
    height: 55px;
    background: linear-gradient(180deg, rgba(94, 217, 248, 0.99) 0%, rgba(29, 111, 223, 0.99) 100%);
    border-radius: 28px;
    color: #fff;
    margin: 0 auto;
  }
}

</style>