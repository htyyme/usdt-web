<template>
  <div class="bankCard">
    <navbar :title="$t('Bank Card')"></navbar>

    <div class="wrapper">

      <div class="nodata" v-if="bankCardList.length===0">
        <van-empty :image="require('@/assets/img/nodata.png')" :description="$t('No bank card')"></van-empty>
        <van-button class="add-btn" block :to="{name:'addBankCard'}">{{$t('Add new bank card')}}</van-button>
      </div>

      <div class="lst" v-else>
        <div class="item" v-for="item in bankCardList" :key="item.id">
          <div class="line">
            <div class="tit">{{item.opening_bank}}</div>
            <div class="card-number">{{item.withdraw_deposit | cardNoFormat}}</div>
          </div>

          <div class="line line2">
            <div class="bank-code">{{item.username}}</div>

            <div class="edit" @click="toEditPage(item)">{{$t('Edit bank card')}} <van-icon :name="require('@/assets/icon/edit.png')" :size="13"></van-icon> </div>
          </div>
        </div>
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
    toEditPage(item){
      this.$router.push({
        name:'addBankCard',
        query:{
          id:item.id
        }
      })
    }
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

    .lst{
      .item{
        width: 319px;
        height: 100px;
        background: #09A1ED;
        border-radius: 13px;
        .line{
          padding: 12px 30px 0 24px;
          font-size: 18px;
          color: #fff;
          font-weight: 700;
          display: flex;
          justify-content: space-between;
          align-items: center;
          &.line2{
            position: relative;
            top: -5px;
          }
          .card-number{
            font-size: 12px;
            font-weight: 400;
          }
          .bank-code{
            font-size: 12px;
            font-weight: 400;
          }
          .edit{
            //width: 100px;
            padding: 0 5px;
            height: 21px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(255,255,255,.43);
            border-radius: 4px;
            position: relative;
            right: -15px;
            color: #fff;
            font-size: 12px;
            font-weight: 400;
            .van-icon{
              padding-left: 3px;
            }
          }
        }
      }
    }
  }
}

</style>