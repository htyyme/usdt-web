<template>
  <van-popup v-model="show" class="myconfirm" get-container="#app" :close-on-click-overlay="false">

    <div class="container">
      <van-image class="warn-icon" :src="icon"/>
      <div class="mytitle" v-if="title.length>0">{{title}}</div>
      <div class="info">{{ content }}</div>

      <div class="btns" :style="{justifyContent: isShowCancelBtn ? 'space-between' : 'center'}">
        <van-button class="cancel" @click="handleClose" v-if="isShowCancelBtn">{{ cancelBtnText }}</van-button>
        <van-button class="confirm" @click="handleAction('confirm')" :loading="confirmLoading">{{ confirmBtnText }}
        </van-button>
      </div>


    </div>

  </van-popup>
</template>

<script>

export default {
  name: "jconfirm",
  data() {
    return {
      show: false,
      title: '',
      content: '',
      icon: require('@/assets/img/confirm-icon.png'), //上面的图标
      confirmBtnText: this.$t('confirm'),//确定按钮的文字
      cancelBtnText: this.$t('cancel'),//取消按钮的文字
      promiseStatus: null,
      closeOnConfirm: true,//点击后是否关闭弹窗
      confirmLoading: false,//确定按钮的loading状态
      isShowCancelBtn:true,//是否显示取消按钮
    }
  },

  methods: {
    handleOpen() {
      this.show = true
      return new Promise((resolve, reject) => {
        this.promiseStatus = {resolve, reject}
      })
    },
    handleClose() {
      this.show = false
      this.promiseStatus && this.promiseStatus.reject('cancel')
    },

    handleAction(action) {
      if (action == 'confirm') {
        if (this.confirmLoading) {
          return
        }

        this.confirmLoading = true
        setTimeout(() => {
          this.confirmLoading = false
        }, 2000)

        this.promiseStatus && this.promiseStatus.resolve('confirm')
        if (this.closeOnConfirm) {
          this.show = false
        }
      } else {
        this.promiseStatus && this.promiseStatus.reject('cancel')
        this.show = false
      }
    }
  },
}
</script>

<style scoped lang="scss">
@import "src/assets/css/vars";

.myconfirm {
  width: 300px;
  //min-height: 250px;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  padding-bottom: 25px;
  //font-family: bahnschrift;

  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;

    .warn-icon {
      width: 78px;
      height: 78px;
    }

    .mytitle{
      color: #fb6966;
      font-size: 24px;
    }
    .info {
      width: 100%;
      color: #000;
      font-size: 16px;
      font-weight: 700;
      padding: 10px 14px 0;
      text-align: center;
    }

    .btns {
      width: 100%;
      padding: 28px 20px 0;
      display: flex;
      justify-content: space-between;

      .van-button {
        height: 40px;
        border-radius: 20px;
      }

      .cancel {
        width: 104px;
        //color: #0079ff;
        color: lighten(#000,15%);
        border-color: currentColor;
      }

      .confirm {
        width: 144px;
        //background: linear-gradient(180deg, #ff867a 0%, #f95959 100%);
        //background: linear-gradient(180deg,#0079ff 0%,#0079ff 100%);
        background: linear-gradient(180deg,lighten(#000,15%) 0%,lighten(#000,35%) 100%);
        border: none;
        color: #fff;
      }
    }
  }
}
</style>
