<template>
  <div class="doubleConfirm">
    <van-dialog v-model="show" :show-confirm-button="false">

      <div class="inner">
        <van-image :src="require('@/assets/img/2xbtn.gif')"></van-image>

        <span class="start-btn" @click="handleClose"></span>
      </div>


    </van-dialog>
  </div>

</template>

<script>
export default {
  name: "doubleConfirm",
  data() {
    return {
      show: false,
    };
  },
  methods:{
    handleClose(){
      this.show = false
    },
    handleOpen(){
      this.show = true
    }
  }
}
</script>

<style scoped lang="scss">
.doubleConfirm {
  /deep/ .van-overlay {
    //background-color: rgba(0, 0, 0, .3);
    background-color: rgba(0, 0, 0, 0);
  }

  .van-dialog {
    top: 50%;
    background-color: rgba(0, 0, 0, 0);
  }

  .inner {
    height: 90vh;
    position: relative;

    .van-image {
      height: 100%;
      width: 100%;
    }
    .start-btn{
      position: absolute;
      width: 170px;
      height: 50px;
      //background-color: rgba(0,0,0,.2);
      left: 50%;
      transform: translateX(-50%);
      bottom: 24%;
    }
  }


}
</style>