<template>
  <div class="wallet">
    
    <a href="javascript:;" @click="toRecharge">
      <van-icon :name="require('@/assets/icon/recharge.png')" size="26"></van-icon>
      <span>{{$t('recharge')}}</span>
    </a>
    <a href="javascript:;" @click="toWithdraw">
      <van-icon :name="require('@/assets/icon/withdraw.png')" size="26"></van-icon>
      <span>{{$t('withdraw')}}</span>
    </a>
    
  </div>
</template>

<script>
export default {
  name: "wallet",
  methods:{
    toRecharge(){
      this.$router.push({
        name:'Recharge',
        query:{
          cointype:'coin'
        }
      })
    },
    toWithdraw(){
      this.$router.push({
        name:'Withdraw',
        query:{
          cointype:'coin'
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.wallet{
  margin: 10px 15px;
  display: flex;
  justify-content: space-between;
  a{
    width: 168px;
    height: 65px;
    background-color: #fff;
    border-radius: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #F97D1D;
    span{
      font-size: 18px;
      font-weight: 700;
      margin-left: 10px;
      text-transform: capitalize;
    }
  }
}

</style>