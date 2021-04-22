<template>
  <div class="bankCard">
    <navbar title="Bank Card"></navbar>

    <div class="wrapper">

      <div class="nodata" v-if="bankCardList.length===0">
        <van-empty :image="require('@/assets/img/nodata.png')" description="No bank card"></van-empty>
        <van-button class="add-btn" block :to="{name:'addBankCard'}">Add New Bank Card</van-button>
      </div>

      <div class="lst" v-else>

      </div>


    </div>

  </div>
</template>

<script>
export default {
  name: "bankCard",
  data(){
    return {
      bankCardList:[]
    }
  },
  created(){
    this.getBankcardList()
  },
  methods:{
    /*
    * 查询我的银行卡列表
    * */
    async getBankcardList(){
      const resp = await this.$http.post('/v1/auth/user/cards',)
      this.bankCardList = resp.data || []
    },
  }

}
</script>

<style scoped lang="scss">
.bankCard {
  min-height: 100vh;
  background-color: #f4f4f4;

  .wrapper {
    margin: 20px 15px;
    background-color: #fff;
    border-radius: 13px;
    padding: 10px 14px 26px;

    /deep/ .van-empty {
      .van-empty__image {
        height: unset;
      }
    }

    .add-btn {
      width: 250px;
      height: 50px;
      background: linear-gradient(180deg, rgba(94, 217, 248, 0.99) 0%, rgba(29, 111, 223, 0.99) 100%);
      border-radius: 28px;
      color: #fff;
      margin: 20px auto;
    }
  }
}

</style>