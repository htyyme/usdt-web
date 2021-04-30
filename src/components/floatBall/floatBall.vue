<template>
  <nav @touchmove.prevent="boxMove" :class="openClass">
    <img class="title" :src="require('@/assets/icon/football.png')"  @click="toggle" />
<!--    <span class="contact">{{$t('contact')}}</span>-->
<!--    <ul :class="openSide">-->
<!--      <li  >-->
<!--        <img src="~assets/img/icon/CHAT.png"/>-->
<!--      </li>-->
<!--      <li>-->
<!--        <img src="~assets/img/icon/GROUP.png"/>-->
<!--      </li>-->
<!--      <li  >-->
<!--        <img src="~assets/img/icon/OTHER.png"/>-->
<!--      </li>-->
<!--    </ul>-->
  </nav>
</template>

<script>


import {mapGetters} from 'vuex'
export default {
  name: "WhatsappBar",
  data() {
    return {
      showChild: false,
      openSide: 'open-left',
      openClass:'',
      Chat:{},
      Customer:{},
      Group:{}
    }
  },
  computed: {
    contactInfo(){
      return this.$store.getters['system/contactInfo']
    },
    link(){
      return this.contactInfo.kf_link
    }
  },
  mounted() {

  },
  methods: {
    /*
    * 让悬浮球跟随手指移动
    * */
    boxMove(e) {
      let box = e.currentTarget

      //自身宽度
      let width = box.offsetWidth
      //自身高度
      let height = box.offsetHeight

      //手指在屏幕的坐标
      let clientX = e.targetTouches[0].clientX
      let clientY = e.targetTouches[0].clientY

      //让手指处于悬浮球中心
      let x = clientX - width / 2
      let y = clientY - height / 2


      //不能让悬浮球移出屏幕
      let maxX = document.body.offsetWidth - width
      x = x <= 0 ? 0 : x
      x = x >= maxX ? maxX : x

      let MaxY = document.body.offsetHeight - height
      y = y <= 0 ? 0 : y
      y = y >= MaxY ? MaxY : y

      if (x > document.body.offsetWidth / 2) {
        // 球在右边 展开再左边
        this.openSide = 'open-left'
      } else {
        // 球在左边 展开再右边
        this.openSide = 'open-right'
      }

      box.style.right = 'unset'
      box.style.bottom = 'unset'
      box.style.left = x + 'px'
      box.style.top = y + 'px'
    },
    /*
    * 展开与关闭
    * */
    toggle(){
      // if(this.openClass){
      //   this.openClass = ''
      // }else{
      //   this.openClass = 'open'
      // }

      this.$tools.openUrl(this.link)
    },



  }
}
</script>

<style scoped lang="scss">
nav {
  width: 70px;
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  cursor: pointer;
  right: 55px;
  top: 5px;
  z-index: 99;
  color: #3596E8;
  font-weight: 700;
}

.title {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1em;
  color: #fff;
  position: relative;
  z-index: 1;
}

ul {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: scale(0);
  transition: .5s;
}

li {
  width: 60px;
  height: 60px;
  position: absolute;
  top: -60px;
  left: -60px;
  color: #fff;
  font-size: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-origin: 90px 90px;
  transition: 1s;
  z-index: 10;
}

nav li img {
  transition: 1s;
  width: 40px;
  height: 40px;
}


nav.open ul {
  transform: scale(1);
}

nav.open li:nth-child(1) {
  transform: rotate(90deg);
}

nav.open li:nth-child(1) img {
  transform: rotate(270deg);
}

nav.open li:nth-child(2) {
  transform: rotate(135deg);
}

nav.open li:nth-child(2) img {
  transform: rotate(225deg);
}

nav.open li:nth-child(3) {
  transform: rotate(180deg);
}

nav.open li:nth-child(3) img {
  transform: rotate(180deg);
}

nav.open .open-left {
  ul {
    transform: scale(1);
  }

  li:nth-child(1) {
    transform: rotate(0deg);
  }

  li:nth-child(1) img {
    transform: rotate(360deg);
  }

  li:nth-child(2) {
    transform: rotate(-45deg);
  }

  li:nth-child(2) img {
    transform: rotate(-315deg);
  }

  li:nth-child(3) {
    transform: rotate(-90deg);
  }

  li:nth-child(3) img {
    transform: rotate(-270deg);
  }
}




</style>
