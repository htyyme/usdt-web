<template>
  <van-overlay :show="show" >
    <div class="wrapper" @click.stop>
      <ul class="countdown" >
<!--        <li>5</li>-->
<!--        <li>4</li>-->
        <li>3</li>
        <li>2</li>
        <li>1</li>
        <li @animationend="handleAnimationEnd">0</li>
      </ul>

      <van-button block class="search">Searching...</van-button>

    </div>
  </van-overlay>
</template>

<script>
import {SHOW_GRABBING,SHOW_GRAB_ORDER_DETAILS} from "@/utils/events";

export default {
  name: "grabbing",
  props:{
    cointype:String,
    goodsinfo:{},
    attr:{},
  },
  data(){
    return {
      show:false
    }
  },
  created() {
    this.$bus.$on(SHOW_GRABBING, this.handleOpen)
  },
  methods:{
    handleOpen(){
      this.show = true
    },
    handleClose(){
      this.show = false
    },
    //倒计时结束时触发
    async handleAnimationEnd(e){
      let submitdata = {}
      submitdata.id = this.attr.id
      if (this.cointype === 'coin'){
        submitdata.coin_type = 1
      } else if (this.cointype === 'usdt'){
        submitdata.coin_type = 2
      }
      const resp = await this.$http.post('/v1/auth/business/match/purchase',submitdata).catch(err=>err)
      if (resp.code !== 200){
        console.log(resp)
        this.handleClose()
        return
      }

      let payload = {}
      payload.goodsinfo = this.goodsinfo
      payload.attr = this.attr
      payload.order = resp.data.order
      payload.cointype = this.cointype

      this.handleClose()
      this.$bus.$emit(SHOW_GRAB_ORDER_DETAILS,payload)
    }
  },
  destroyed() {
    this.$bus.$off(SHOW_GRABBING)
  }
}
</script>

<style scoped lang="scss">
@keyframes countdown {
  0%{
    transform: scale(0) ;
    opacity: 0;
  }
  50%{
    transform: scale(1);
    opacity: 1;
  }
  100%{
    transform: scale(2) ;
    opacity: 0;
  }
}

.wrapper{
  width: 375px;
  height: 426px;
  background: url("~assets/img/countdownbg.png") no-repeat;
  background-size: cover;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);

  .countdown{
    position: absolute;
    width: 150px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 50%;
    transform: translateX(-50%) ;
    top: 39%;
    z-index: 999;
  }

  .countdown li{
    font-family: PingFang SC;
    position: absolute;
    font-size: 129px;
    font-weight: 800;
    color: #2F89E5;
    text-shadow: 0px 6px 6px rgba(0, 0, 0, 0.3);
    opacity: 0;
    animation: countdown 1000ms linear;
    //font-style: italic;
    font-variant: small-caps;
  }
  .countdown li:nth-child(2){
    animation-delay: 1s;
  }
  .countdown li:nth-child(3){
    animation-delay: 2s;
  }
  .countdown li:nth-child(4){
    animation-delay: 3s;
  }
  .countdown li:nth-child(5){
    animation-delay: 4s;
  }
  .countdown li:nth-child(6){
    animation-delay: 5s;
  }

  .search{
    width: 180px;
    height: 48px;
    background: linear-gradient(180deg, rgba(94, 217, 248, 0.99) 0%, rgba(29, 111, 223, 0.99) 100%);
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.16);
    opacity: 1;
    border-radius: 41px;
    color: #fff;
    font-size: 17px;
    border: none;
    position: absolute;
    bottom: 62px;
    left: 50%;
    transform: translateX(-50%);
  }
}

</style>