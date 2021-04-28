<template>
  <div class="ForgetPass">
    <navbar :title="$t('forgetPass')"></navbar>

    <div class="form">
      <dl>
        <dt>
          <van-icon :name="require('@/assets/icon/phone-icon.orenge.png')" size="24"></van-icon>
        </dt>
        <dd>
          <input type="text" :placeholder="$t('Phone number')" v-model="phone">
        </dd>
      </dl>

      <dl>
        <dt>
          <van-icon :name="require('@/assets/icon/sms-icon.orange.png')" size="24"></van-icon>
        </dt>
        <dd>
          <input type="text" :placeholder="$t('smsCode')" v-model="verify_code">
          <van-button size="mini" color="#FF7335" class="sendcode" @click="sendOtp" :disabled="countdown>0">
            {{ sendBtnText }}
          </van-button>
        </dd>
      </dl>


      <dl>
        <dt>
          <van-icon :name="require('@/assets/icon/pwd-icon.orange.png')" size="24"></van-icon>
        </dt>
        <dd>
          <input :type="pwdType" :placeholder="$t('New password')" v-model="password">
          <van-icon size="18" :name="pwdIcon" class="eye" @click="changePwdType"></van-icon>
        </dd>
      </dl>

      <dl>
        <dt>
          <van-icon :name="require('@/assets/icon/pwd-icon.orange.png')" size="24"></van-icon>
        </dt>
        <dd>
          <input :type="repeatPwdType" :placeholder="$t('Repeat new password')" v-model="confirmPassword">
          <van-icon size="18" :name="repeatPwdIcon" class="eye" @click="changeRepeatPwdType"></van-icon>
        </dd>
      </dl>

    </div>


    <van-button block class="submit-button" :loading="$store.getters['system/gloading']" @click="onSubmit">{{$t('Complete')}}
    </van-button>


  </div>
</template>

<script>
import {checkMobile} from "@/utils/tools";

export default {
  name: "ForgetPass",
  data() {
    return {
      pwdType: 'password',
      pwdIcon: require('@/assets/icon/close-eye-icon.png'),
      repeatPwdType: 'password',
      repeatPwdIcon: require('@/assets/icon/close-eye-icon.png'),
      phone: "",
      verify_code: '',
      password: '',
      confirmPassword: '',
      type: 1,
      countdown: 0,//倒计时
      timer: null,
    }
  },
  computed: {
    //发送验证码按钮的文字
    sendBtnText() {
      if (this.countdown <= 1) {
        return 'send code'
      }
      return this.countdown + 's'
    },
  },
  methods: {
    changePwdType() {
      if (this.pwdType === 'password') {
        this.pwdType = 'text'
        this.pwdIcon = require('@/assets/icon/openeye.svg')
      } else {
        this.pwdType = 'password'
        this.pwdIcon = require('@/assets/icon/close-eye-icon.png')
      }
    },
    changeRepeatPwdType() {
      if (this.repeatPwdType === 'password') {
        this.repeatPwdType = 'text'
        this.repeatPwdIcon = require('@/assets/icon/openeye.svg')
      } else {
        this.repeatPwdType = 'password'
        this.repeatPwdIcon = require('@/assets/icon/close-eye-icon.png')
      }
    },
    /**
     * 发送验证码
     * @returns {Promise<void>}
     */
    async sendOtp() {
      if (this.countdown > 0) return
      if (!checkMobile(this.phone)) return this.$toast.fail(this.$t('Phone number format is incorrect'))
      const r = await this.$http.post('/v1/send_opt', {phone: this.phone})
      const {code, message} = r
      if (code !== 200) return

      this.countdown = 60
      this.timer = setInterval(() => {
        this.countdown--
        if (this.countdown <= 1) {
          this.countdown = 0
          clearInterval(this.timer)
        }
      }, 1000)
    },
    /**
     * 表单提交
     */
    async onSubmit() {
      if (!checkMobile(this.phone)) return this.$toast.fail(this.$t('Phone number format is incorrect'))
      if (this.password.length < 6) return this.$toast.fail(this.$t('Password length is at least 6 characters'))
      if (this.password !== this.confirmPassword) return this.$toast.fail(this.$t('The two passwords are inconsistent'))
      if (this.verify_code.length === 0) return this.$toast.fail(this.$t('Please enter sms code'))
      const formData = {
        phone: this.phone,
        verify_code: this.verify_code,
        password: this.password,
        type: this.type
      }
      try {
        const resp = await this.$http.post('/v1/password/forget', formData)
        const {message} = resp
        this.$toast.success({
          message: message,
          onClose: () => this.$router.back()
        })
      } catch (e) {
        //console.log('err',e)
      }
    },
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
}
</script>

<style scoped lang="scss">
.ForgetPass {
  min-height: 100vh;
  background-color: #f4f4f4;

  .form {
    background-color: #fff;
    margin: 20px 15px 0;
    border-radius: 13px;
    padding: 15px;

    dl {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      dd {
        height: 50px;
        width: 283px;
        background: #F9F9F9;
        border-radius: 10px;
        margin-left: 10px;
        position: relative;

        input {
          height: 100%;
          width: 100%;
          background-color: transparent;
          border: none;
          padding-left: 15px;
          font-size: 14px;
        }

        .sendcode {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 15px;
        }

        .eye {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 15px;
        }
      }
    }
  }

  .submit-button {
    width: 250px;
    height: 55px;
    background: linear-gradient(180deg, rgba(94, 217, 248, 0.99) 0%, rgba(29, 111, 223, 0.99) 100%);
    border-radius: 28px;
    color: #fff;
    margin: 35px auto 0;
  }
}

</style>