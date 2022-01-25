<template>
  <div class="productList-cpn">


    <div class="prod-item" v-for="(item,index) in productList" :key="index">

      <div class="lfwp">
        <div class="day">{{item.coinAttr.mold}}</div>
        <span>{{$t('Days')}}</span>
        <em class="arrow"></em>
      </div>


      <van-swipe :loop="false" :width="270" :show-indicators="false">
        <van-swipe-item @click="showDetail(item,'coin')">
          <div class="swipe-box">
            <div class="item-head">
              <span class="title">{{item.goods_name}}</span>
              <van-button size="mini" round color="#ff1720">Details</van-button>
            </div>
            <div class="item-bd">
              <van-image :src="$tools.getImage(item.show_pic)" class="prod-img"></van-image>
              <div class="content">
                <dl>
                  <dt>{{item.coinAttr.unit_cost | moneyFormat}}</dt>
                  <dd>{{$t('Price')}}</dd>
                </dl>
                <dl>
                  <dt>{{item.coinAttr.win_rate | moneyFormat}}</dt>
                  <dd>{{$t('Hourly earnings')}}</dd>
                </dl>
              </div>
            </div>
          </div>
        </van-swipe-item>

        <van-swipe-item @click="showDetail(item,'usdt')">
          <div class="swipe-box">
            <div class="item-head">
              <span class="title">{{item.goods_name}}</span>
              <van-button size="mini" round color="#ff1720">Details</van-button>
            </div>
            <div class="item-bd">
              <van-image :src="$tools.getImage(item.show_pic)" class="prod-img"></van-image>
              <div class="content">
                <dl>
                  <dt>{{item.usdtAttr.unit_cost | moneyFormat(2,'usdt')}}</dt>
                  <dd>{{$t('Price')}}</dd>
                </dl>
                <dl>
                  <dt>{{item.usdtAttr.win_rate | moneyFormat(2,'usdt')}}</dt>
                  <dd>{{$t('Hourly earnings')}}</dd>
                </dl>
              </div>
            </div>
          </div>
        </van-swipe-item>

      </van-swipe>




    </div>

    <productDetail ref="productDetailRef"/>

  </div>
</template>

<script>

import productDetail from "./productDetail";
export default {
  name: "productList",
  components:{
    productDetail
  },
  data(){
    return {
      productList:[],
    }
  },
  created() {
    this.loadProducts()
  },

  methods:{
    async loadProducts(){
      const resp = await this.$http.post('/v1/business/matches',{
        page:1,
        pageSize:30,
        tp:10
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

    showDetail(item,type){
      this.$refs.productDetailRef.handleOpen(item,type)
    }

  }
}
</script>

<style scoped lang="scss">

.productList-cpn{
  padding-bottom: 30px;

  .prod-item{
    display: flex;
    padding-left: 13px;
    align-items: center;
    margin-bottom: 15px;

    .lfwp{
      width: 45px;
      height: 108px;
      margin-right: 10px;
      background: linear-gradient( to top, #F8868C,#ff1720);
      border-radius: 7px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .day{
        background: #fff;
        color: #2980b9;
        font-size: 12px;
        margin-top: 10px;
        width: 20px;
        height: 34px;
        text-align: center;
        padding-top: 3px;
        font-weight: 700;
        position: relative;
        overflow: hidden;
        &::after{
          content: "";
          width: 18px;
          height: 18px;
          background: linear-gradient( to top, #F8868C,#ff1720);
          position: absolute;
          transform: rotate(45deg) ;
          bottom: -10px;
          left: 0;
          right: 0;
          margin: auto;
        }

      }
      span{
        font-size: 12px;
        color: #fff;
        font-weight: 700;
      }
      .arrow{
        width: 15px;
        height: 15px;
        background-color: #fff;
        border-radius: 50%;
        margin-top: 10px;
        position: relative;
        &::after{
          content: "";
          position: absolute;
          width: 5px;
          height: 5px;
          color: #2980b9;
          border-top: 3px solid currentColor;
          border-right: 3px solid currentColor;
          transform: rotate(45deg) translate(4px,1px);
        }
      }
    }

    .van-swipe{
      flex: 1;
      .van-swipe-item{
        padding: 3px 15px 3px 2px;
        .swipe-box{
          padding: 10px;
          border-radius: 7px;
          position: relative;
          overflow: hidden;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px;
          background-color: #fff;
          .item-head{
            display: flex;
            align-items: center;
            justify-content: space-between;
            .title{
              font-weight: 700;
              font-size: 14px;
            }
            .van-button{
              padding: 0 8px;
            }
          }
          .item-bd{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 10px;
            .prod-img{
              width: 55px;
              height: 55px;
              margin-right: 10px;
              border-radius: 6px;
              border: 1px solid rgb(40, 93, 242);
              overflow: hidden;
            }
            .content{
              display: flex;
              align-items: center;
              justify-content: space-between;
              font-size: 12px;
              flex: 1;
              dl{
                dt{
                  color: #FE8E42;
                  font-size: 14px;
                }
                dd{
                  color: #000;
                  font-weight: 700;
                }
              }
            }
          }
        }
      }
    }
  }


}

</style>
