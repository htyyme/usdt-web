<template>
  <van-overlay :show="show" class="openRedEnvelope">
    <img :src="require('@/assets/img/open-redenvelope.png')" alt="" class="redbag" @click="handleSubmit">
    <van-icon :name="require('@/assets/icon/close.png')" size="30" class="close" @click="handleClose"></van-icon>
  </van-overlay>
</template>

<script>


export default {
  name: "openRedEnvelope",
  props:{
    envelopeKey:{
      type:String,
      required:true
    }
  },
  data() {
    return {
      show: true,

    }
  },
  mounted() {

  },
  methods: {
    handleOpen() {
      this.show = true
    },
    handleClose() {
      this.show = false
    },
    async handleSubmit(){
      try {
        const resp = await this.$http.post('/v1/auth/service/envelope', {
          key: this.envelopeKey
        })
        this.handleClose()
        this.$emit('reloadList')
      } catch (e) {
        // console.log('err',e)
        this.handleClose()
      }finally {

      }

    }
  },
  destroyed() {

  }
}
</script>

<style scoped lang="scss">
.openRedEnvelope {
  z-index: 9999;

  .redbag {
    width: 230px;
    height: 290px;
    position: absolute;
    top: 130px;
    left: 50%;
    transform: translateX(-50%);
  }

  .close {
    position: absolute;
    bottom: 4.33rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99999;
  }
}
</style>
