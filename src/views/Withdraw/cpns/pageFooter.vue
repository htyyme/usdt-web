<template>
  <div class="pageFooter">
    <div class="card-wrapper tip">
      <p v-html="config.withdraw_tips1"></p>
    </div>

    <div class="time">
      <em>{{$t('Withdrawal Time')}}</em>
      <span>{{$t('Working day')}} {{config.withdraw_time}}</span>
    </div>
    <div class="end" v-html="config.withdraw_tips2"></div>

  </div>
</template>

<script>

    export default {
      name: "pageFooter",
      computed:{
        config(){
          return this.$store.getters['system/config']
        }
      }
    }
</script>

<!--suppress CssUnknownTarget -->
<style lang="scss" scoped>
  @import "~assets/css/vars";

  .card-wrapper{
    display: block;
    width: 345px;
    background-color: #fff;
    margin: 15px auto;
    border-radius: 10px;
    padding: 11px ;
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

  .pageFooter {
    .tip {
      font-size: 13px;
      background-color: #C9E1FF;
      color: #1849A1;

      p {
        margin: 8px 0;
      }
    }

    .time {
      width: 345px;
      height: 45px;
      display: flex;
      align-items: center;
      font-size: 13px;
      background-color: #e6e6e6;
      border-radius: 22px;
      margin: 0 auto;
      padding: 0 18px;
      font-weight: 700;

      em {
        color: $mainColor;
      }

      span {
        margin-left: 15px;
      }
    }

    .end {
      font-size: 12px;
      color: #999;
      padding: 10px 20px;
    }
  }
</style>
