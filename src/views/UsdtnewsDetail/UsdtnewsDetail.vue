<template>
  <div class="news">
    <navbar :title="$t('Usdt news')"></navbar>

    <div class="wrapper">
      <div class="preview-list" :style="previewStyle">
        <van-image
            v-for="(item,index) in imgList"
            :key="index"
            :src="$tools.getImage(item['path'])"
            class="preview-img"
            fit="contain"
        />
      </div>
      <div class="prev" @click="toPrev" v-show="curIndex!==0"></div>
      <div class="next" @click="toNext" v-show="curIndex!==imgList.length-1"></div>
    </div>
    
    
    <div class="sm-preview-list">
      <van-image
          v-for="(item,index) in imgList"
          :key="index"
          :src="$tools.getImage(item['path'])"
          class="sm-preview-img"
          :class="{active:curIndex===index}"
          @click="toIdx(index)"
      />
    </div>

  </div>
  
</template>

<script>
export default {
  name: "UsdtnewsDetail",
  data(){
    return {
      curIndex:0,
      translatex:0
    }
  },
  computed:{
    newsdetail(){
      return this.$store.getters['usdt/currentnews']
    },
    imgList(){
      return JSON.parse(this.newsdetail.img)
    },
    previewStyle(){
      return {
        transform: `translateX(${this.translatex}rem)`
      }
    }
  },
  methods:{
    //下一张
    toNext(){
      if (this.curIndex === this.imgList.length-1){
        return
      }
      this.curIndex++
      this.translatex  = -10 *this.curIndex
    },
    //上一张
    toPrev(){
      if (this.curIndex === 0){
        return
      }
      this.curIndex--
      this.translatex  += 10
    },
    toIdx(index){
      this.curIndex = index
      this.translatex  = -10 *this.curIndex
    }
  }
}
</script>

<style scoped lang="scss">
.news{
  min-height: 100vh;
  background-color: #1d1818;
  position: relative;
  overflow: hidden;
  .wrapper{
    position: absolute;
    width: 100%;
    height: 500px;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    transform: translateY(-20px);

    .prev{
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      width: 40px;
      height: 80px;
      background-color: rgba(0,0,0,.3);
      &::before{
        content: "";
        position: absolute;
        width: 10px;
        height: 10px;
        border-left: 3px solid #fff;
        border-bottom: 3px solid #fff;
        transform:  rotate(45deg) ;
        left: 17px;
        bottom: 0;
        top: 0;
        margin: auto;
      }
    }
    .next{
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      width: 40px;
      height: 80px;
      background-color: rgba(0,0,0,.3);
      &::before{
        content: "";
        position: absolute;
        width: 10px;
        height: 10px;
        border-top: 3px solid #fff;
        border-right: 3px solid #fff;
        transform:  rotate(45deg) ;
        right: 17px;
        bottom: 0;
        top: 0;
        margin: auto;
      }
    }

    .preview-list{
      width: 10000%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      transition: .5s;


      .preview-img{
        width: 375px;
        height: 100%;
        float: left;
      }
    }


  }

  .sm-preview-list{
    position: absolute;
    width: 100%;
    height: 80px;
    bottom: 20px;
    left: 0;
    right: 0;
    margin: auto;
    background-color: rgba(255,255,255,.3);
    display: flex;
    justify-content: center;
    align-items: center;

    .sm-preview-img{
      width: 60px;
      height: 60px;
      border: 2px solid #95a5a6;
      transform: scale(.6);
      filter: blur(2px);
      transition: .5s;
      &.active{
        transform: scale(1.2);
        filter: blur(0);
      }
    }
  }
}

</style>