<template>
  <div class="productList">

    <div class="product-item" v-for="i in 10" :key="i">
      <div class="left">
        <div class="lv">
          <van-icon :name="require('@/assets/icon/lv-icon.png')" size="22"></van-icon>
          <span>LV1 MEMBER</span>
        </div>
      </div>
      <div class="right"></div>
    </div>

    <div class="no-other">No other new types of products</div>

  </div>
</template>

<script>
    export default {
        name: "productList"
    }
</script>

<style scoped lang="scss">
  .productList{
    padding: 9px 15px 0;
    .product-item{
      background-color: rgba(175, 232, 251, .4);
      background-image: url(~assets/temp/shopee.png);
      background-size: 150px;
      height: 175px;
      margin-bottom: 10px;
      border-radius: 10px;
      display: flex;
      overflow: hidden;
      .left{
        flex: 1;
        background-color: rgba(39, 127, 227, .78);
        border-radius: 10px;
        .lv{
          background: url("~assets/icon/lvbg-icon.png") no-repeat;
          background-size: cover;
          width: 130px;
          font-size: 12px;
          color:#fff;
          display: flex;
          align-items: center;
          padding-left: 8px;
        }
      }
      .right{
        flex: 1;
      }
    }

    .no-other{
      color: #999999;
      background-color: #F1F1F1;
      border-radius: 13px;
      margin: 20px 20px;
      text-align: center;
      padding: 3px 0;
    }
  }

</style>