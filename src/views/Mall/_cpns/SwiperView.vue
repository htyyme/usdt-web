<template>
  <swiper class="mySwiper" ref="mySwiper" :options="swiperOptions">

    <swiper-slide class="swiper-item" v-for="item in swiperList" :key="item.id">
      <img :src="item.img_url" />

    </swiper-slide>

    <!--分页器-->
    <div class="swiper-pagination" slot="pagination" ></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import 'swiper/swiper.min.css'

export default {
  name: "SwiperView",
  props:{
    swiperList:{
      type:Array,
      default(){
        return []
      }
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
        autoplay:true,//自动播放
        dynamicBullets: true,
        loop: true, // 循环模式选项
        pagination: {
          el: ".swiper-pagination",
        }
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },

  }

};
</script>

<style scoped lang="scss">
 .mySwiper {
   width: 100%;
   height: 380px;
   overflow: initial;

   .swiper-item {
     width: 100%;
     height: 380px;
     position: relative;
     img {
       width: 100%;
       height: 395px;
       object-fit: cover;
     }

     aside{
       position: absolute;
       right: 10px;
       top: -15px;
       width: 28px;
       height: 100%;
       background-color: #127339;
       color: #fff;
       display: flex;
       flex-direction: column;
       justify-content: flex-end;
       transform-origin: top center;
       transform: scaleY(0);
       opacity: 0;
       transition: 1s;
       span{
         width: 200px;
         height: 28px;
         white-space: nowrap;
         line-height: 28px;
         /*background-color: red;*/
         transform-origin: left top;
         transform: rotate(90deg) translate(-172px,-100%);
         text-transform: uppercase;
         letter-spacing: .1em;
       }
     }
   }

   .swiper-item.swiper-slide-active aside{
     transform: scaleY(1);
     opacity: .9;
   }
 }


</style>
