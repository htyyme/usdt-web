<template>
  <div class="ForgetPass">
    <navbar title="Forget password"></navbar>

    <div class="form">
      <dl>
        <dt><van-icon :name="require('@/assets/icon/phone-icon.orenge.png')" size="24"></van-icon></dt>
        <dd>
          <input type="text" placeholder="Phone number">
        </dd>
      </dl>

      <dl>
        <dt><van-icon :name="require('@/assets/icon/sms-icon.orange.png')" size="24"></van-icon></dt>
        <dd>
          <input type="text" placeholder="SMS code">
          <van-button size="mini" color="#FF7335" class="sendcode">send code</van-button>
        </dd>
      </dl>


      <dl>
        <dt><van-icon :name="require('@/assets/icon/pwd-icon.orange.png')" size="24"></van-icon></dt>
        <dd>
          <input :type="pwdType" placeholder="New password">
          <van-icon size="18" :name="pwdIcon" class="eye" @click="changePwdType"></van-icon>
        </dd>
      </dl>

      <dl>
        <dt><van-icon :name="require('@/assets/icon/pwd-icon.orange.png')" size="24"></van-icon></dt>
        <dd>
          <input :type="repeatPwdType" placeholder="Repeat new password">
          <van-icon size="18" :name="repeatPwdIcon" class="eye" @click="changeRepeatPwdType"></van-icon>
        </dd>
      </dl>

    </div>


  </div>
</template>

<script>
export default {
  name: "ForgetPass",
  data(){
    return {
      pwdType:'password',
      pwdIcon:require('@/assets/icon/close-eye-icon.png'),
      repeatPwdType:'password',
      repeatPwdIcon:require('@/assets/icon/close-eye-icon.png'),
    }
  },
  methods:{
    changePwdType(){
      if (this.pwdType === 'password'){
        this.pwdType = 'text'
        this.pwdIcon = require('@/assets/icon/openeye.svg')
      } else {
        this.pwdType = 'password'
        this.pwdIcon = require('@/assets/icon/close-eye-icon.png')
      }
    },
    changeRepeatPwdType(){
      if (this.repeatPwdType === 'password'){
        this.repeatPwdType = 'text'
        this.repeatPwdIcon = require('@/assets/icon/openeye.svg')
      } else {
        this.repeatPwdType = 'password'
        this.repeatPwdIcon = require('@/assets/icon/close-eye-icon.png')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.ForgetPass{
  min-height: 100vh;
  background-color: #f4f4f4;

  .form{
    background-color: #fff;
    margin: 20px 15px 0;
    border-radius: 13px;
    padding: 15px;

    dl{
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      dd{
        height: 50px;
        width: 283px;
        background: #F9F9F9;
        border-radius: 10px;
        margin-left: 10px;
        position: relative;
        input{
          height: 100%;
          width: 100%;
          background-color: transparent;
          border: none;
          padding-left: 15px;
          font-size: 14px;
        }
        .sendcode{
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 15px;
        }
        .eye{
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 15px;
        }
      }
    }
  }
}

</style>