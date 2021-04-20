<template>
  <van-overlay :show="visible">

    <div class="wrapper" @click.stop>

      <div class="content">{{content}}</div>

      <div class="options">
        <van-button @click="handleAction('no')" class="no">{{cancelBtnText}}</van-button>
        <van-button @click="handleAction('yes')" class="yes">{{yesBtnText}}</van-button>
      </div>

    </div>

  </van-overlay>
</template>

<script>
export default {
  name: "jconfirm",
  data() {
    return {
      visible: false,
      title: '',//标题
      content: '',//提示文字
      yesBtnText: 'Confirm',//确定按钮
      cancelBtnText: 'Cancel',//取消按钮
      otherBtnText: "", //其他按钮  (如果只需要两个按钮  此部分可不写)
      type: "", //提示类型success warn error(图标) 可忽略
      promiseStatus: null
    }
  },
  methods: {
    confirm() {
      console.log('confirm触发了')
      this.visible = true //显示模态框
      return new Promise(((resolve, reject) => {
        this.promiseStatus = {resolve, reject}
      }))
    },
    handleAction(action){
      console.log('handleAction触发了',action)
      this.visible = false //关闭模态框
      if (action=="yes"){
        this.promiseStatus && this.promiseStatus.resolve('confirm')
      } else {
        this.promiseStatus && this.promiseStatus.reject('cancel')
      }
    },
    //阻止冒泡事件的空方法
    stopAction(){
      console.log('stop popergation')
    }
  }
}
</script>

<style scoped lang="scss">

.wrapper{
  width: 295px;
  //min-height: 285px;
  border: 1px solid #FFFFFF;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%);
  //filter: blur(80px);
  opacity: 1;
  border-radius: 13px;
  position: absolute;
  top: 160px;
  left: 50%;
  transform: translateX(-50%);
  padding: 50px 19px 0;
  .content{
    font-size: 15px;
    font-weight: 700;
    color: #333333;
  }
  .options{
    margin: 40px 0;
    display: flex;
    justify-content: space-between;
    .yes{
      width: 120px;
      height: 45px;
      background: linear-gradient(180deg, rgba(94, 217, 248, 0.99) 0%, rgba(29, 111, 223, 0.99) 100%);
      opacity: 1;
      border-radius: 28px;
      border: none;
      color: #fff;
    }
    .no{
      width: 125px;
      height: 45px;
      background: #C4C4C4;
      opacity: 1;
      border-radius: 28px;
      border: none;
      color: #fff;
    }
  }
}

</style>