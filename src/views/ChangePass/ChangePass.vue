<template>
  <div class="change-pass">
    <navbar :title="$t('Change Password')"></navbar>

    <van-form @submit="onSubmit">
      <van-cell title="Phone" :value="userInfo.member_name"></van-cell>

      <van-field v-if="isSendSms" :label="$t('Verification code')" :placeholder="$t('Verification code')" name="verify_code"
                 v-model="verify_code" :rules="[{ required: true }]">
        <template #button>
          <van-button size="mini" color="#ff1720" :disabled="countdown>0" @click="sendOtp">{{ sendBtnText }}</van-button>
        </template>
      </van-field>

      <van-field v-model="ori_password" type="password" name="ori_password" :label="$t('Old password')"
                 :placeholder="$t('Old Password')" :rules="[{ required: true }]"/>
      <van-field v-model="password" type="password" name="password" :label="$t('New Password')"
                 :placeholder="$t('New Password')" :rules="[{ required: true }]"/>
      <van-field v-model="confirmPassword" type="password" name="confirmPassword" :label="$t('Confirm Password')"
                 :placeholder="$t('Confirm Password')" :rules="[{ required: true }]"/>


      <div style="margin: 16px;">
        <van-button block native-type="submit" class="save-btn">{{ $t('Submit') }}</van-button>
      </div>
    </van-form>

  </div>
</template>

<script>


export default {
  name: "ChangePass",
  data() {
    return {
      verify_code: '',
      ori_password: '', //原密码
      password: '',
      confirmPassword: '',
      type: 1,
      countdown: 0,//倒计时
      timer: null,
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters['user/userInfo']
    },

    config() {
      return this.$store.getters['system/config']
    },
    //发送验证码按钮的文字
    sendBtnText() {
      if (this.countdown <= 1) {
        return 'OTP'
      }
      return this.countdown + 's'
    },
    isSendSms(){
      return this.$store.getters['system/config'].isSendSms
    }
  },
  methods: {
    /**
     * 发送验证码
     * @returns {Promise<void>}
     */
    async sendOtp() {
      if (this.countdown > 0) return
      const r = await this.$http.post('/v1/send_opt', {phone: this.userInfo.member_name})
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
     * @param values
     */
    async onSubmit(values) {
      if (!this.ori_password) return this.$toast.fail(this.$t('Please enter the original password'))
      if (this.password.length < 6) return this.$toast.fail(this.$t('Password length is at least 6 characters'))
      if (this.password !== this.confirmPassword) return this.$toast.fail(this.$t('The two passwords are inconsistent'))
      const formData = {
        ori_password: this.ori_password,
        verify_code: this.verify_code,
        password: this.password,
        type: this.type
      }
      try {
        const resp = await this.$http.post('/v1/auth/password/modify', formData)
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
@import "src/assets/css/vars";
.change-pass {
  .save-btn {
    width: 220px;
    height: 40px;
    background: linear-gradient( to top, $shallowMainColor,$mainColor);
    border-radius: 28px;
    color: #fff;
    margin: 0 auto;
  }
}
</style>
