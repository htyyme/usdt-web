<template>
  <div class="lotteryHeader">
    <!--<img :src="require('@/assets/icon/02.png')" alt="" class="back-icon" @click="$router.back()">-->

    <!--<span class="rule" @click="toRule">-->
    <!--  <van-icon name="warning-o" size="15"  style="margin-right: 3px;"/>-->
    <!--  {{$t('Rule2')}} >></span>-->

    <div class="turntable-title">{{turntable.name}}</div>

    <div class="sub-title">{{$t("Small points, big surprise")}}</div>

    <div class="pixi-stage"></div>
  </div>
</template>

<script>
export default {
  name: "lotteryHeader",
  props:{
    turntable:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data() {
    return {
      app: null
    }
  },
  mounted() {
    // this.$nextTick(()=>{
    //   this.initAPP()
    // })



  },
  methods: {
    toRule(){
      this.$router.push({
        name:'lotteryRule',
        query:{
          id:this.turntable.id
        }
      })
    },
    //初始化app
    async initAPP() {
      if (!this.turntable.id){
        console.log('未获取id')
        setTimeout(this.initAPP.bind(this),90)
        return
      }


      this.app = new PIXI.Application({
        width: 375,
        height: 180,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        backgroundAlpha: 0
      })
      this.$el.querySelector('.pixi-stage').appendChild(this.app.view)

      //加载字体资源
      PIXI.Assets.addBundle('fonts', {
        "Hanaleifill Regular": "/myfonts/HanaleiFill-Regular.ttf",
        "Permanentmarker Regular": "/myfonts/PermanentMarker-Regular.ttf",
        "Ultra Regular": "/myfonts/Ultra-Regular.ttf",
        "TitanOne Regular": "/myfonts/TitanOne-Regular.ttf",
        "DaysOne Regular": "/myfonts/DaysOne-Regular.ttf",
      });
      const fonts = await PIXI.Assets.loadBundle("fonts")
      console.log('fonts', fonts)

      //创建一个容器
      const container = new PIXI.Container();
      container.width = this.app.screen.width
      container.height = this.app.screen.height
      container.x = 0
      container.y = 0
      this.app.stage.addChild(container)

      //添加标题
      const style = new PIXI.TextStyle({
        fontFamily: 'DaysOne Regular',
        fontSize: 31,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#e74c3c'], // gradient
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 330,
        lineJoin: 'round',
        //单词间距
        letterSpacing: 4
      });
      const title = new PIXI.Text(this.turntable.name, style);
      title.anchor.set(0.5)
      title.position.set(this.app.screen.width / 2, 80)

      //创建一个边框滤镜
      const outlineFilter = new PIXI.filters.OutlineFilter(2, 0xff0000, 1)
      //创建一个发光滤镜
      const glowFilter = new PIXI.filters.GlowFilter({
        color: 0xffff00,
        strength: 5,
        outerStrength: 2
      })
      title.filters = [outlineFilter, glowFilter]
      container.addChild(title)

      //创建副标题
      const subTitle = new PIXI.Text(this.$t("Small points, big surprise"), {
        fontFamily: 'Ultra Regular',
        dropShadow: true,
        dropShadowAlpha: 0.8,
        dropShadowAngle: 2.1,
        dropShadowBlur: 4,
        dropShadowColor: '0x111111',
        dropShadowDistance: 10,
        fill: ['#ffffff'],
        stroke: '#e74c3c',
        fontSize: 17,
        fontWeight: 'lighter',
        lineJoin: 'round',
        strokeThickness: 9,
      });
      // subTitle.skew.set(0.65, -0.3);
      subTitle.anchor.set(0.5)
      subTitle.position.set(this.app.screen.width / 2, 150)
      container.addChild(subTitle)

      // //创建置换滤镜
      // const displacementSprite = PIXI.Sprite.from(require('@/assets/img/displacement2.jpg'))
      // displacementSprite.scale.set(0.5)
      // displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT
      // const  displacementFilter = new PIXI.DisplacementFilter(displacementSprite)
      // container.addChild(displacementSprite)
      // container.filters = [displacementFilter]
      //
      //
      // this.app.ticker.add(()=>{
      //   displacementSprite.x+=1
      //   displacementSprite.y+=1
      // })

      let n = 0
      this.app.ticker.add(delta=>{
        n++
        //更新发光滤镜
        glowFilter.outerStrength = Math.sin(n/3)
      })

    },

  },
  destroyed() {
    if (this.app){
      this.app.destroy()
    }

  }
}
</script>

<style scoped lang="scss">
@import "src/assets/css/animate";
.lotteryHeader {
  position: relative;

  .back-icon{
    position:absolute;
    width: 30px;
    left: 15px;
    top: 15px;
  }

  .rule{
    position:absolute;
    right: 17px;
    top: 17px;
    color:#fff;
    font-size: 13px;
    display: flex;
    align-items: center;
  }

  .turntable-title{
    font-family: DaysOne;
    color: #fff;
    //color: transparent;
    font-size: 30px;
    font-weight: 700;
    position: absolute;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    //阴影
    text-shadow: 2px 2px 3px #000000;
    //background: linear-gradient(to right bottom,#fff,#e74c3c);

    //background-clip: text;
    //animation: huerotate 1s infinite linear;
  }

  .sub-title{
    //font-family: Ultra;
    color: #e74c3c;
    font-size: 17px;
    font-weight: 700;
    position: absolute;
    top: 139px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
  }

  .pixi-stage {
    width: 100%;
    height: 180px;

    ::v-deep  canvas {
      width: 100%;
      height: 100%;
    }
  }


}
</style>
