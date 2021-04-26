<template>
  <header>
    <van-icon :name="require('@/assets/icon/return.png')" size="25" class="return" @click="$router.back()"></van-icon>
    <van-icon :name="require('@/assets/icon/message.png')" size="25" class="message" @click="tomsgpage"></van-icon>
    <div class="pagetitle">Vip</div>
    <van-image :src="require('@/assets/icon/level.png')" class="level-icon"></van-image>

    <van-steps :active="active" active-color="#FEDF72" >
      <van-step>LV.1</van-step>
      <van-step>LV.2</van-step>
      <van-step>LV.3</van-step>
      <van-step>LV.4</van-step>
      <van-step>LV.5</van-step>
    </van-steps>

  </header>
</template>

<script>
export default {
  name: "pageHeader",
  data(){
    return {
      active:1
    }
  },
  methods:{
    tomsgpage(){
      this.$router.push({
        name:'MsgList'
      })
    }
  }
}
</script>

<style scoped lang="scss">

header {
  height: 308px;
  background: url(~assets/img/vip-headerbg.png) no-repeat;
  background-size: 100vw;
  position: relative;
  .return{
    position: absolute;
    top: 12px;
    left: 15px;
  }
  .message{
    position: absolute;
    top: 12px;
    right: 18px;
  }
  .pagetitle{
    padding-top: 12px;
    text-align: center;
    color: #fff;

  }
  .level-icon{
    width: 110px;
    height: 98px;
    position: absolute;
    top: 55px;
    left: 50%;
    transform: translateX(-50%);

  }
  .van-steps{
    background-color: transparent;
    position: absolute;
    top: 135px;
    left: 50%;
    transform: translateX(-50%);
    width: 85%;

  }
}

</style>