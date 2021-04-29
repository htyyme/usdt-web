<template>
  <div class="usdt-page">
    <header>
      <div class="title">udst</div>
    </header>

    <div class="assets">
      <div class="title">My wallte(USDT)</div>
      <div class="balance">1234.45</div>
      <div class="botm">
          <dl>
            <dt>1234</dt>
            <dd>earnings</dd>
          </dl>
        <dl>
          <dt>1234</dt>
          <dd>earnings</dd>
        </dl>
      </div>
    </div>

    <nav class="subnav">
      <router-link :to="{name:'UsdtMall'}" class="mall">
        <p>Usdt trading area</p>
        <p>Free to buy and sell</p>
        <div class="go">GO NOW</div>
      </router-link>
      <div class="right-link">
        <a href="javascript:;" @click="toUsdtRechargePage">
          <van-icon :name="require('@/assets/icon/sell.png')" size="25"></van-icon>
          <span>Recharge</span>
        </a>
        <a href="javascript:;" @click="toUsdtWithdrawPage">
          <van-icon :name="require('@/assets/icon/sellorder.png')" size="25"></van-icon>
          <span>Withdraw</span>
        </a>
      </div>
    </nav>


  </div>
</template>

<script>
export default {
  name: "Usdt",
  methods:{
    toUsdtRechargePage(){
      this.$router.push({
        name:'Recharge',
        query:{
          cointype:'usdt'
        }
      })
    },
    toUsdtWithdrawPage(){
      this.$router.push({
        name:'Withdraw',
        query:{
          cointype:'usdt'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.usdt-page {
  min-height: 100vh;
  background-color: #f4f4f4;
  header {
    height: 150px;
    background-color: #3CA1EB;
    border-radius: 0 0 10px 10px;

    .title {
      color: #fff;
      text-transform: uppercase;
      padding: 15px;
    }
  }
  .assets{
    background-color: #fff;
    margin: -100px 15px 0;
    border-radius: 13px;
    padding: 15px;
    color: #333;
    .title{
      text-align: center;

    }
    .balance{
      font-weight: 700;
      font-size: 18px;
      text-align: center;
      margin-top: 5px;
    }
    .botm{
      display: flex;
      margin: 15px 0 10px;
      justify-content: space-between;
      dl {
        flex: 1;
        text-align: center;
        border-right: 1px solid #ccc;
        &:last-child{
          border-right: none;
        }
        dt{
          font-size: 17px;
          font-weight: 700;
        }
        dl{
          color: #999;
        }
      }
    }
  }

  .subnav{
    height: 122px;
    margin: 15px;
    display: flex;
    justify-content: space-between;
    .mall{
      width: 169px;
      height: 100%;
      background: url(~assets/icon/tradearea.png) no-repeat;
      background-size: cover;
      color: #fff;
      padding: 10px 0 0 10px;
      p{
        font-weight: 700;
        margin-bottom: 4px;
      }
      p:nth-of-type(2){
        font-size: 14px;
      }
      .go{
        color: orange;
        background-color: #fff;
        display: inline-flex;
        padding: 3px 6px;
        font-size: 13px;
        text-transform: uppercase;
        margin-top: 14px;
        border-radius: 5px;
      }
    }
    .right-link{
      width: 169px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      a{
        height: 56px;
        width: 100%;
        background-color: orange;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        border-radius: 10px;
        .van-icon{
          padding-right: 4px;
        }
      }

    }
  }
}

</style>