<template>
  <div class="Mall">
    <DownloadBar v-if="!isApp" @click="downloadApp"/>

    <header>
      <div class="header-text">
        <div  class="cont">
          <div>{{$t('Welcome Back')}}</div>
          <p>{{$t('Quality Guarantee')}}</p>
        </div>
      </div>
      <SwiperView :swiperList="swiperList"/>
    </header>




    <section class="shop-list">
      <el-row>
        <el-col :span="12" v-for="goods of shops" :key="goods.id">
          <goods-card :card="goods" moneyPrefix="₹" :Precision="Precision" :base="base"></goods-card>
        </el-col>
      </el-row>
    </section>



<!--    <announce />-->
  </div>
</template>

<script>
import SwiperView from "./_cpns/SwiperView";
import {SHOW_ANNOUNCE} from "@/utils/events";
// import GoodsSwiper from "./_cpns/GoodsSwiper";
import goodsCard from './_cpns/goodsCard.vue'
import DownloadBar from "./_cpns/DownloadBar";
import swiper from "@/mall/swiper";
import muti_data from "@/mall/muti_data";
import config from "@/config";
export default {
  name: "Mall",
  components: {
    SwiperView,
    goodsCard,
    // GoodsSwiper,
    DownloadBar
  },
  data() {
    return {
      swiperList: swiper,
      categories: muti_data.categories,
      sliders: muti_data.sliders,
      shops: muti_data.shops,
      bottomList: [],
      isShowNews: true,
      Precision: 0,
      base: 1,
      contactUs: {
        add: '',
        Mumbai: '',
      }
    }
  },
  computed:{
    isApp(){
      return config.isApp
    }
  },
   created() {
     // this.$nextTick( _ => this.$bus.$emit(SHOW_ANNOUNCE))
  },
  methods: {
    /**
     * 下载App
     */
    downloadApp(){
      // this.$tools.openUrl(this.$store.state.config.android_app_url)
      this.$tools.downloadApp()
    }
  }

}
</script>

<style scoped lang="scss">
/*新闻滚动的动画*/
@keyframes newsScroll {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-200%);
  }
}




.Mall {
  background-color: #efefef;
  width: 100vw;


  header {
    width: 100vw;
    overflow: hidden;
    padding-top: 10px;
    text-align: center;
    background-color: #fff;

    .header-text {
      img {
        width: 100%;
      }

      text-align: center;
      padding: 16px;
      .cont{
        div{
          font-size: 34px;
          font-weight: 400;
          line-height: 20px;
          letter-spacing: .00735em;
          color: #1976d2!important;
        }
        p{
          font-size: 20px;
          font-weight: 500;
          margin-top: 20px;
          letter-spacing: .0125em;
          color: #9e9e9e;
        }
      }
    }
  }

  /*分类*/
  .cate-list {
    height: 110px;
    display: flex;
    background-color: #fff;

    a {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #000;
      text-decoration: none;
      -webkit-tap-highlight-color: transparent;

      img {
        width: 50px;
        height: 50px;
        margin-top: 10px;
      }

      span {
        margin-top: 10px;
      }
    }
  }

  /*滚动新闻*/
  .news {
    background-color: #fffbe8;
    height: 40px;
    color: #ed6a0c;
    width: 100vw;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;

    .news-title {
      flex: 1;
      padding-left: 10px;
      line-height: 40px;
      white-space: nowrap;
      overflow: hidden;
      font-size: 14px;

      p {
        animation: newsScroll 12s infinite linear;
      }
    }

    .close {
      width: 10%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
    }
  }

  /*推荐*/
  .recommend {
    background-color: #fff;
    margin-top: 10px;

    .title {
      text-align: center;
      text-transform: uppercase;
      padding: 15px 0 20px 0;
      position: relative;

      &::after {
        content: ' ';
        font-size: 0;
        width: 30px;
        height: 5px;
        display: block;
        position: absolute;
        background: #127339;
        bottom: 5px;
        left: 0;
        right: 0;
        margin: auto;
      }
    }

    .recommend-img {
      width: 100%;
      height: 200px;
      background-color: rgb(242, 242, 242);
      margin-bottom: 15px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
      }
    }
  }

  .shop-list {
    margin-top: 10px;
    background-color: #fff;
  }

  .service {
    margin-top: 10px;
    background-color: #fff;
    padding: 10px 15px 0;
    font-size: 14px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    a {
      color: #16a085;
      padding: 10px 0;
    }
  }

  .contact {
    text-align: center;

    .tit {
      font-size: 15px;
      font-weight: 600;
    }

    background-color: #fff;
    padding: 0 15px 15px;
    font-size: 14px;
    line-height: 1.6;
  }
}
</style>
