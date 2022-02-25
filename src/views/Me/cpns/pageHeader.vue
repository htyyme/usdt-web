<template>
  <div class="pageHeader">
    <div class="user">
      <avatarUploader />

      <div class="userinfo">
        <div>{{userInfo.nickname || userInfo.member_name}}</div>
        <div>{{$t('ID')}}：{{userInfo.id}}</div>
      </div>
    </div>
    <div class="lvinfo">
      <span>{{$t('Membership level')}}：</span>
      <em>{{$t('lvNum',{num:userInfo.lv_id})}}</em>
    </div>
    <div class="assets">
      <div class="tit">{{$t('yourTotalAssets')}}:</div>
      <div class="num">
        <span v-if="three_service_address.length>0">{{usdtAvailableBalance|moneyFormat(5,'usdt')}}</span>
        <span>{{coinAvailableBalance|moneyFormat(2,'coin')}}</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "pageHeader",
  mounted() {

  },
  computed:{
    userInfo(){
      return this.$store.getters['user/userInfo']
    },
    usdtAccount(){
      return this.$store.getters['user/usdtAccount']
    },
    coinAccount(){
      return this.$store.getters['user/coinAccount']
    },
    usdtAvailableBalance(){
      return this.usdtAccount.available_balance
    },
    coinAvailableBalance(){
      return this.coinAccount.available_balance
    },
    three_service_address(){
      return this.$store.getters['system/config'].three_service_address
    }
  },


}
</script>

<style scoped lang="scss">
@import "src/assets/css/vars.scss";
  .pageHeader{
    height: 265px;
    background: linear-gradient( to top, $shallowMainColor,$mainColor);
    background-size: cover;
    padding: 43px 0 0 0;
    .user{
      display: flex;
      align-items: center;
      padding-left: 40px;

      .userinfo{
        color: #fff;
        font-size: 17px;
        line-height: 1.7;
        padding-left: 17px;
      }
    }
    .lvinfo{
      color: #fff;
      margin-top: 12px;
      font-size: 17px;
      padding-left: 40px;
      em{
        color: #FFEE00;
      }
    }
    .assets{
      height: 79px;
      background: #FFFFFF;
      border-radius: 13px;
      margin: 14px 15px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 36px 0 25px;
      text-align: right;
      .tit{
        color: #333;
        font-size: 15px;
        font-weight: 700;
      }
      .num{
        color: #ff1720;
        font-size: 21px;
        font-weight: 700;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
  }
</style>
