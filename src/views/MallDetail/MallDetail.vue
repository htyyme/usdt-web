<template>
  <div class="goods">
    <navbar :title="$t('Product')"></navbar>

    <div class="detail">
      <swiper class="mySwiper" ref="mySwiper" :options="swiperOptions">
        <swiper-slide class="swiper-item" v-for="(item,index) in goodsInfo.swiper_img_urls" :key="index">
          <img :src="item"/>
        </swiper-slide>
        <!--分页器-->
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>

      <div class="top-title">{{goodsInfo.name}}</div>
      <div class="top-price" v-cloak>
        <span class="now-price">{{$t('coin')}}{{moneyFormat(goodsInfo.now_price)}}</span>
        <span class="old-price">{{$t('coin')}}{{moneyFormat(goodsInfo.old_price)}}</span>
      </div>

      <!--商品尺寸-->
      <template v-if="goodsInfo && goodsInfo.size && goodsInfo.size.length">
        <p class="attr">{{$t('size')}}:</p>
        <div class="attr-list">
          <div class="attr-list-item" :class="{active:currentIndex==index}" v-for="(item,index) in goodsInfo.size"
               :key="index" @click="chooseSize(item,index)">{{item}}
          </div>
        </div>
      </template>

      <!--选择数量-->
      <p class="attr">{{$t('quantity')}}:</p>
      <div class="counter">
        <a href="javascript:;" @click="subNum">-</a>
        <input type="number" v-model="num">
        <a href="javascript:;" @click="addNum">+</a>
        <!--        <span >In stock:{{goodsInfo.stock}}</span>-->
      </div>

      <!--商品描述-->
      <div class="desc">
        <div class="title">{{$t('description')}}</div>
        <div class="info" v-html="goodsInfo.description"></div>
      </div>

      <div class="soldout">{{$t('Sold Out')}}</div>
      <p class="soldout-p">{{$t('Product Specifications')}}</p>

    </div>



  </div>

</template>

<script>
import {Swiper, SwiperSlide, directive} from "vue-awesome-swiper";
import 'swiper/swiper.min.css'
import muti_data from "@/mall/muti_data";
import search from "@/mall/search";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  directives: {
    swiper: directive
  },
  data() {
    return {
      goodsInfo: {},
      swiperOptions: {
        loop: true, // 循环模式选项
        autoplay: true,
        dynamicBullets: true,
        pagination: {
          el: ".swiper-pagination",
        }
      },
      num: 1,
      currentIndex: 0,
      Precision:0,
      base:1
    }
  },
  computed: {
    goodsId() {
      return this.$route.query.id
    },
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
    size() {
      if (!this.goodsInfo.size.length) {
        return ''
      }

      return this.goodsInfo.size[this.currentIndex]
    },
    loginUser() {
      return this.$store.state.loginUser
    },

  },
   created() {
    this.fetchGoodsInfo()

  },
  methods: {
    moneyFormat(money){
      money = money ? money : 0
      money = money * this.base
      return parseFloat(money).toFixed(this.Precision)
    },
    async fetchGoodsInfo() {
      // const resp = await this.$axios.get('/goods/api/shop/detail?id=' + this.goodsId + "&theme=" + this.theme)
      // this.goodsInfo = resp.data

      let list = [
          ...muti_data.shops,
          ...muti_data.sliders,
          ...search
      ]

      this.goodsInfo = list.find(el => el.id == this.goodsId)
    },
    addNum() {
      this.num++
    },
    subNum() {
      if (this.num > 1) {
        this.num--
      }
    },
    //选择尺寸
    chooseSize(item, index) {
      this.currentIndex = index
    },
    goBack() {
      this.$router.go(-1)
    },
    toHome() {
      this.$router.push('/home')
    },
    toBuy() {
      this.$router.push({
        name: 'toBuy',
        query: {
          goodsId: this.goodsInfo.id,
          num: this.num,
          size: this.size
        }
      })

    }
  }
}
</script>

<style scoped lang="scss">


.goods {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin-bottom: -72px;
}

.nav-bar {
  height: 50px;
  display: flex;
  margin-bottom: -72px;

  a {
    text-decoration: none;
    font-size: 25px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000;

    &:nth-child(-n+2) {
      width: 18%;
    }

    &:nth-child(3) {
      flex: 1;
      color: #fff;
      background-color: #16743c;
      font-size: 18px;
      text-transform: capitalize;
    }
  }

}

.detail {
  flex: 1;
  overflow-y: auto;

  .mySwiper {
    width: 100%;
    height: 430px;

    .swiper-item {
      width: 100%;
      height: 430px;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 331px;
        height: 395px;
        object-fit: contain;
      }
    }
  }

  .top-title {
    padding: 0 .5rem;
    font-weight: 600;
    text-align: center;
    font-size: 16px;
  }

  .top-price {
    padding: 10px 0 0 .5rem;
    text-align: center;

    .now-price {
      font-size: 22px;
      color: #F39939;
    }

    .old-price {
      text-decoration: line-through;
    }
  }

  .attr {
    padding: 10px .5rem;
    font-size: 18px;
    font-weight: 600;
    text-transform: capitalize;
  }

  .attr-list {
    padding: 0 .5rem;
    display: flex;
    flex-wrap: wrap;

    .attr-list-item {
      margin: 5px 10px 5px 0;
      font-size: 14px;
      text-align: center;
      background-color: #f2f2f2;
      color: #000;
      padding: 8px 30px;
    }

    .attr-list-item.active {
      background-color: #1976d2;
      color: #fff;
      font-weight: 700;
    }
  }

  .counter {
    padding: 0 .5rem;
    display: flex;
    align-items: center;

    a {
      width: 28px;
      height: 28px;
      vertical-align: middle;
      color: #323233;
      background-color: #f2f3f5;
      text-decoration: none;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
    }

    input {
      box-sizing: border-box;
      outline: none;
      width: 70px;
      height: 28px;
      background-color: #f2f3f5;
      border: none;
      text-align: center;
      margin: 0 8px;
    }

    span {
      margin-left: 10px;
      font-weight: 600;
      font-size: 14px;
    }
  }

  .desc {
    padding-bottom: 20px;

    .title {
      margin: 20px 0 10px 0;
      padding-bottom: 10px;
      text-align: center;
      text-transform: capitalize;
      border-bottom: 1px solid #666;
    }

    .info {
      padding: 0 .5rem;
      font-size: 14px;
      line-height: 1.6;
    }
  }

  .soldout{
    background-color: #9e9e9e;
    color: #fff;
    display: inline-block;
    padding:  8px 12px;
    border-radius: 4px;
    margin: 0 12px 18px;
    box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);
  }
  .soldout-p{
    margin-bottom: 20px;
    margin-left: 14px;
    color: #9e9e9e;
  }
}

</style>
