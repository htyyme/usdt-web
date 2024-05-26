<template>
  <div class="MyCoins">
    <article>
      <!--<div class="test">-->
      <!--  <div class="num-symbol"><div class="num-symbol-dot"><br>1</div></div>-->
      <!--  <div class="num-symbol"><div class="num-symbol-dot">1<br>2</div></div>-->
      <!--  <div class="num-symbol"><div class="num-symbol-dot">5<br>3</div></div>-->
      <!--  <div class="num-symbol"><div class="num-symbol-dot">5<br>3</div></div>-->
      <!--</div>-->
      <img :src="require('@/assets/img/coin.png')" alt="" class="coin-img">
      <div class="coin-title">{{$t('Points remaining')}}:</div>
      <div class="animate__animated  coin-num-wrap" :class="{'animate__tada':istadaanimate}">
        <!--<div class="coin-num ">{{mycoin|moneyFormat}}</div>-->
        <div class="coin-num ">{{integral}}</div>
      </div>

    </article>

  </div>
</template>

<script>
export default {
  name: "MyCoins",
  computed:{
    userInfo(){
      return this.$store.getters['user/userInfo']
    },
    balance(){
      return this.userInfo.available_balance
    },

    mycoin(){
      return this.balance
    },
    //积分
    integral(){
      return this.userInfo.integral
    }
  },
  data(){
    return {
      istadaanimate:false
    }
  },
  watch:{
    balance(){
      //开启金额抖动动画
      this.istadaanimate = true
      setTimeout(()=>{
        this.istadaanimate=false
      },1200)
    }
  }
}
</script>

<style scoped lang="scss">

//.test{
//  display: flex;
//
//  .num-symbol-dot {
//    transform: translate3d(0, -40px, 0); // 0 到 -40px 的变化
//    transition: transform .5s cubic-bezier(.68,-.04,.26,1.55);
//  }
//
//  .num-symbol {
//    // 动画延迟
//    @for $i from 1 through 20 {
//      &:nth-last-child(#{$i}) .num-symbol-dot {
//        transition-delay: #{$i * 0.05}s
//      }
//    }
//  }
//
//}

.MyCoins {

  margin-top: 15px;
  article{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
  }

  .coin-img{
    width: 20px;
    height: 20px;
    margin-right: 3px;
    animation: coinrotate 5s linear infinite;
  }

  .coin-title{
    margin-right: 10px;
    color: #fff;
  }

  .coin-num-wrap{
    //animation-iteration-count: infinite;
    //animation-play-state: paused;
  }

  .coin-num{
    //font-size: 20px;
    color: #27ae60;
    text-shadow: 0 0 0px #fff,
    0 0 5px #fff,
    0 0 10px #fff,
    0 0 15px #fff700,
    0 0 20px #fff700,
    0 0 30px #fff700,
    0 0 40px #fff700,
    0 0 50px #fff700;

    animation: light .5s ease infinite alternate;
  }

  //字体发光闪烁效果
  @keyframes light {
    from {
      text-shadow: 0 0 10px #fff,
      0 0 20px #fff,
      0 0 30px #fff,
      0 0 40px #fff700,
      0 0 70px #fff700,
      0 0 80px #fff700,
      0 0 100px #fff700,
      0 0 150px #fff700;
    }

    to {
      text-shadow: 0 0 0px #fff,
      0 0 5px #fff,
      0 0 10px #fff,
      0 0 15px #fff700,
      0 0 20px #fff700,
      0 0 30px #fff700,
      0 0 40px #fff700,
      0 0 50px #fff700;
    }
  }

  //金币图标旋转
  @keyframes coinrotate {
    to{
      transform: rotateY(360deg);
    }
  }


}

</style>
