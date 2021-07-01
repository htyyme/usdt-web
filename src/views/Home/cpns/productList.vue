<template>
  <div class="productList">

    <div class="product-item" v-for="item in productList" :key="item.id" :style="{backgroundImage:backgroundImage(item)}">
      <div class="left" @click="toOrderGrabPage(item,'usdt')">
        <div class="lv">
          <van-icon :name="require('@/assets/icon/lv-icon.png')" size="22"></van-icon>
          <span>{{$t('lvMember',{num:item.extra1})}}</span>
        </div>

<!--        <div class="pro-rate">-->
<!--&lt;!&ndash;          <span>{{rateFormat(item.usdt_extra2)}}</span>&ndash;&gt;-->
<!--          <span>{{item.usdtAttr.unit_cost * item.usdtAttr.multiplying_power * max_grab}}</span>-->
<!--        </div>-->
<!--        <div class="goods-info">-->
<!--          <div class="tit">{{item.goods_name}}</div>-->
<!--          <div class="desc">{{item.usdt_desc}}</div>-->
<!--          <div class="price">-->
<!--            <span>{{item.usdtAttr.unit_cost | moneyFormat(2,'usdt')}}</span>-->
<!--            <span>{{$t('specialArea')}}</span>-->
<!--          </div>-->
<!--        </div>-->
      </div>

      <div class="right" @click="toOrderGrabPage(item,'coin')">
<!--        <div class="pro-rate">-->
<!--&lt;!&ndash;          <span>{{rateFormat(item.extra2)}}</span>&ndash;&gt;-->
<!--          <span>{{item.coinAttr.unit_cost * item.coinAttr.multiplying_power * max_grab}}</span>-->
<!--        </div>-->
<!--        <div class="goods-info">-->
<!--          <div class="tit">{{item.goods_name}}</div>-->
<!--          <div class="desc">{{item.coin_desc}}</div>-->
<!--          <div class="price">-->
<!--            <span>{{item.coinAttr.unit_cost | moneyFormat}}</span>-->
<!--            <span>{{$t('specialArea')}}</span>-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </div>

    <div class="no-other">{{$t('NoOtherNewTypesOfProducts')}}</div>

  </div>
</template>

<script>
import {rateFormat} from "@/utils/filters";

export default {
  name: "productList",
  data(){
    return {
      productList:[],
    }
  },
  created() {
    this.loadProducts()
  },
  computed:{
    backgroundImage(){
      return item => `url(${this.$tools.getImage(item.goods_desc)})`
    },
    max_grab(){
      return this.$store.getters['system/config'].max_grab
    }
  },
  methods:{
    async loadProducts(){
      const resp = await this.$http.post('/v1/business/matches',{
        page:1,
        pageSize:30,
        tp:7
      })
      let productList = resp.data.list || []
      productList.forEach(el => {
        el.attributes.forEach(e=>{
          if (e.title === 'usdt'){
            el.usdtAttr = e
          }else if (e.title === 'coin'){
            el.coinAttr = e
          }
        })
      })
      this.productList = productList
    },
    toOrderGrabPage(item,cointype){
      this.$router.push({
        name:'OrderGrab',
        query:{
          id:item.id,
          cointype:cointype
        }
      })
    },
    rateFormat(val){
      return rateFormat(val)
    }
  }
}
</script>

<style scoped lang="scss">
.productList {
  padding: 9px 15px 0;

  .product-item {
    //background-color: rgba(175, 232, 251, .4);
    //background-image: url(~assets/temp/shopee.png);
    //background-color: #44bebf;
    background-size: 150px;
    height: 175px;
    margin-bottom: 10px;
    border-radius: 10px;
    display: flex;
    overflow: hidden;
    position: relative;

    .left {
      flex: 1;
      //background-color: rgba(39, 127, 227, .78);
      border-radius: 10px;
      position: relative;

      .lv {
        background: url("~assets/icon/lvbg-icon.png") no-repeat;
        background-size: cover;
        width: 130px;
        font-size: 12px;
        color: #fff;
        display: flex;
        align-items: center;
        padding-left: 8px;
      }
      .pro-rate{
        color: #f00;
      }
    }

    .right {
      flex: 1;
      position: relative;

      .goods-info {
        //color: #1D6FDF;
        color: #fff;
      }
    }

    .pro-rate {
      width: 100%;
      height: 50px;
      background: url(~assets/icon/prorate.png) no-repeat;
      background-size: contain;
      background-position: center center;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-weight: 700;
      font-size: 13px;

      span {
        position: relative;
        top: -3px;
      }
    }

    .goods-info {
      position: absolute;
      width: 100%;
      bottom: 0;
      height: 80px;
      color: #fff;
      text-align: center;
      font-weight: 700;

      .tit {
        font-size: 19px;
      }
      .desc{
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #f8b0b7;
        padding: 3px 10px;
        transform: scale(.9);
      }
      .price {
        font-size: 15px;

        span:nth-child(1) {
          padding-right: 5px;
        }
      }
    }
  }


  .no-other {
    color: #999999;
    background-color: #F1F1F1;
    border-radius: 13px;
    margin: 20px 20px;
    text-align: center;
    padding: 3px 0;
    font-size: 13px;
  }
}

</style>