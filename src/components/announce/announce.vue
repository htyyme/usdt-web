<template>
  <van-overlay class="announce" :show="show">
    <div class="inner">
      <canvas id="welcome" ref="welcome" width="352" height="50"></canvas>

      <div class="content" v-html="content"></div>

      <van-button @click="handleClose" block>{{$t('gotIt')}}</van-button>
    </div>
  </van-overlay>
</template>

<script>
import {SHOW_ANNOUNCE} from "@/utils/events";

export default {
  name: "announce",
  data() {
    return {
      show: false
    }
  },
  computed: {
    content() {
      return this.$store.getters['system/config'].system_notice
    }
  },
  mounted() {
    this.$bus.$on(SHOW_ANNOUNCE, this.handleOpen)
    setTimeout(() => {
      this.drawTitle()
    }, 300)
  },
  methods: {
    handleOpen() {
      this.show = true
    },
    handleClose() {
      this.show = false
    },
    //绘制标题
    drawTitle() {
      let canvas = this.$refs.welcome
      let ctx = canvas.getContext('2d')
      ctx.font = "italic bold 25px imbplex"
      ctx.shadowBlur = 10
      ctx.shadowColor = 'pink'
      ctx.shadowOffsetX = 8
      ctx.shadowOffsetY = 8
      ctx.fillStyle = 'deeppink'
      ctx.fillText('Welcome', 120, 30)

      ctx.lineWidth = 1
      ctx.strokeStyle = '#277FE3'
      ctx.strokeText('Welcome', 120, 30)
    }
  },
  destroyed() {
    this.$bus.$off(SHOW_ANNOUNCE)
  }
}
</script>

<style scoped lang="scss">
.announce {
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;

  .inner {
    width: 352px;
    height: 484px;
    background: url(~assets/img/noticebg.png) no-repeat;
    background-size: cover;
    position: relative;

    #welcome {
      display: block;
      margin: 10px auto 0;
    }

    .content{
      font-size: 13px;
      padding: 0 40px;
      height: 330px;
      overflow: auto;
    }

    .van-button {
      border-radius: 5px;
      font-size: 20px;
      color: #fff;
      background: #fea322;
      border: none;
      width: 60%;
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>