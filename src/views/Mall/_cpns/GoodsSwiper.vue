<template>
  <swiper class="mySwiper" ref="mySwiper" :options="swiperOptions">

    <swiper-slide class="swiper-item" v-for="(item,index) in sliders" :key="index" @click.native="toDetail(item.id)">
      <img :src="item.img_url" alt="">
      <span class="goods-name">{{item.name}}</span>
      <span class="price">{{moneyPrefix}}{{moneyFormat(item.now_price)}}</span>
    </swiper-slide>

<!--    <div class="swiper-scrollbar" slot="scrollbar"></div>-->
  </swiper>
</template>

<script>
  import {Swiper, SwiperSlide, directive} from "vue-awesome-swiper";
  import 'swiper/css/swiper.css'

  export default {
    name: "GoodsSwiper",
    props: {
      sliders: {
        type: Array,
        default() {
          return []
        }
      },
      moneyPrefix:{
        type:String,
        default:''
      },
      Precision:{
        type:Number,
        default:0
      },
      base:{
        type:Number,
        default:1
      }
    },
    components: {
      Swiper,
      SwiperSlide
    },
    directives: {
      swiper: directive
    },
    data() {
      return {
        swiperOptions: {
          autoplay:{
            delay: 2500,  // 设置轮播的时间
            disableOnInteraction: false,  // 这一行是为了避免手动滑动轮播图后，自动轮播失效，默认为true
          },
          dynamicBullets: true,
          loop: false, // 循环模式选项
          slidesPerView: 'auto',
          spaceBetween: 10,
          freeMode: true,
          // scrollbar: {
          //   el: '.swiper-scrollbar',
          //   hide: true,
          // },
          observer:true,
          preventLinksPropagation:false,
          observeParents:true,
        }
      };
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper;
      }
    },
    methods:{
      toDetail(id){
        this.$router.push('/detail?id='+id)
      },
      moneyFormat(money){
        money = money ? money : 0
        money = money * this.base
        return parseFloat(money).toFixed(this.Precision)
      }
    }

  }
</script>

<style scoped lang="scss">
  .mySwiper{
    height: 210px;
    width: 100vw;
    overflow: hidden;

    .swiper-item{
      width: 150px !important;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img{
        width: 130px;
        height: 130px;
        object-fit: contain;
        margin: 10px auto;
      }
      .goods-name{
        font-size: 14px;
        width: 90%;
        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .price{
        font-size: 16px;
        color: #f39839;
        font-weight: 700;
        margin-top: 5px;
      }
    }
  }
</style>
