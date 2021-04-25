<template>
  <div class="pageHeader">

    <div class="wrapper">
      <dl>
        <dt>{{ $t('availableAssets') }}</dt>
        <dd class="balance">
          <span>{{usdtAvailableBalance | moneyFormat(2,'usdt')}}</span>
          <span>{{coinAvailableBalance | moneyFormat(2,'coin')}}</span>
        </dd>
      </dl>

      <dl>
        <dt>{{ $t('todayOrder') }}</dt>
        <dd>({{coincountdata.todayorder + usdtcountdata.todayorder}}/{{maxgrab}})</dd>
      </dl>
    </div>

    <div class="tip">{{$t('orderProvider',{name:appname})}}</div>
  </div>
</template>

<script>
import appconfig from "@/config";
export default {
  name: "pageHeader",
  props:{
    coincountdata:Object,
    usdtcountdata:Object,
  },
  computed:{
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
    maxgrab(){
      return this.$store.getters['system/config'].max_grab
    },
    appname(){
      return appconfig.appName
    }
  }
}
</script>

<style scoped lang="scss">
.pageHeader{
  .wrapper{
    display: flex;
    justify-content: space-between;
    padding: 20px 15px 0;
    dl{
      width: 168px;
      height: 92px;
      background: #FFFFFF;
      border-radius: 13px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      //padding: 0 25px ;
      dt{
        color: #333;
        font-size: 15px;
        font-weight: 700;
      }
      dd{
        margin-top: 5px;
        font-size: 21px;
        color: #F97D1D;
        font-weight: 700;
        &.balance{
          font-size: 13px;
          display: flex;
          flex-direction: column;
        }
      }
      &:nth-child(2)>dd{
        color: #3799E9;
      }
    }
  }

  .tip{
    background-color: #E5E5E5;
    height: 25px;
    text-align: center;
    line-height: 25px;
    color: #3799E9;
    font-size: 13px;
    margin-top: 13px;
  }


}

</style>