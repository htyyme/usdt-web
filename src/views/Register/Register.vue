<template>
  <div class="login">
    <div class="wrapper">
      <div class="form-title">{{$t('register')}}</div>
      <field4 v-model="registerForm.username" :left-icon="require('@/assets/icon/phone-icon.png')" :placeholder="$t('Phone Number')">
        <template #left>{{internationalCode}}</template>
      </field4>

      <!--验证码-->
      <field4 v-if="isSendSms" v-model="registerForm.sms_code" :left-icon="require('@/assets/icon/sms-icon.png')" :placeholder="$t('smsCode')">
        <template #right>
          <van-button color="#FF3364" class="otp" size="mini" :disabled="countdown>0" @click="getVerificationCode">{{sendBtnText}}</van-button>
        </template>
      </field4>

      <field4 v-model="registerForm.password" :left-icon="require('@/assets/icon/pwd-icon.png')" :placeholder="$t('password')" :type="pwdType">
        <template #right>
          <van-icon :name="pwdIcon" @click="changePwdType"></van-icon>
        </template>
      </field4>
      <field4 v-model="registerForm.repeatPassword" :left-icon="require('@/assets/icon/pwd-icon.png')" :placeholder="$t('repeatPassword')" :type="repeatPwdType">
        <template #right>
          <van-icon :name="repeatPwdIcon" @click="changeRepeatPwdType"></van-icon>
        </template>
      </field4>

      <!--邀请码-->
      <field4 v-if="!isGoogle" :left-icon="require('@/assets/icon/invite-icon.png')" :placeholder="$t('invitationCode')" v-model="registerForm.invitation_code" :readonly="invitationCodeReadonly"></field4>

      <van-button class="submit-btn" block @click="doRegister" :loading="$store.getters['system/gloading']">{{$t('register')}}</van-button>

      <p class="bottom-info">
        <span>{{$t('Already have account?')}}</span>
        <router-link :to="{name:'Login'}">{{$t('Login Now')}}</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import {checkMobile} from "@/utils/tools";
import {SHOW_ANNOUNCE} from "@/utils/events";
import appConfig from "@/config";
import {random} from "../../utils/tools.js";
export default {
  name: "Register",
  data() {
    return {
      countdown: 0,
      registerForm: {
        username: '',
        password: '',
        repeatPassword: '',
        sms_code: '',
        invitation_code: '',
      },
      pwdType:'password',
      pwdIcon:require('@/assets/icon/close-eye-icon.png'),
      repeatPwdType:'password',
      repeatPwdIcon:require('@/assets/icon/close-eye-icon.png')
    }
  },
  computed:{
    //是否 发送短信
    isSendSms(){
      return this.$store.getters['system/config'].isSendSms
    },
    //发送验证码按钮的文字
    sendBtnText() {
      if (this.countdown <= 1) {
        return this.$t('sendCode')
      }
      return this.countdown + 's'
    },
    internationalCode(){
      return this.$store.getters['system/config'].international_code
    },
    invitationCodeReadonly(){
      //如果链接上携带有邀请码 则邀请码不能修改
      if (this.$route.query.invitation_code){
        return true
      }else{
        return false
      }
    },
    three_service_address(){
      return this.$store.getters['system/config'].three_service_address
    },
    isGoogle(){
      return appConfig.isGoogle
    }
  },
  created() {
    //如果链接上有邀请码 则将邀请码默认填入
    let code = this.$route.query.invitation_code
    if (code) {
      this.registerForm.invitation_code = code
    }

    let preset_invite_code = []
    if (this.$store.getters['system/config'].preset_invite_code.length > 0){
      preset_invite_code = JSON.parse(this.$store.getters['system/config'].preset_invite_code)
    }

    if (this.isGoogle && preset_invite_code.length > 0){
      let i = this.$tools.random(0 , preset_invite_code.length)
      this.registerForm.invitation_code = preset_invite_code[i]
    }
  },
  methods:{
    /*
  * 发送验证码
  * */
    async getVerificationCode() {
      if (!checkMobile(this.registerForm.username)) return this.$toast.fail(this.$t('Phone number format is incorrect'))

      const r = await this.$http.post('/v1/send_opt', {
        phone: this.registerForm.username
      })

      this.countdown = 60
      this.timer = setInterval(() => {
        this.countdown--
        if (this.countdown <= 1) {
          this.countdown = 0
          clearInterval(this.timer)
        }
      }, 1000)

    },
    async doRegister(){
      if (!checkMobile(this.registerForm.username)) return this.$toast.fail(this.$t('Phone number format is incorrect'))

      if (this.registerForm.password.length<6) return this.$toast.fail(this.$t('Password length must be at least 6 characters'))
      if (this.registerForm.password !== this.registerForm.repeatPassword)  return this.$toast.fail(this.$t('The two passwords are inconsistent'))

      let appId = '1000001';
      let DTO = {
        ...this.registerForm,
        appId
      }
      const r = await this.$http.post('/v1/register', DTO)

      const {token,contact} = r.data
      this.$store.commit('user/setToken',token)
      this.$store.commit('system/setContactInfo',contact)
      this.$store.dispatch('user/loadUserInfo')
      this.$bus.$emit(SHOW_ANNOUNCE)

      // if (this.three_service_address.length>0){
      //   this.$router.replace({name:'Home'})
      // } else {
      //   this.$router.replace({name:'Mall'})
      // }

      this.$router.replace('/')
    },
    changePwdType(){
      if (this.pwdType === 'password'){
        this.pwdType = 'text'
        this.pwdIcon = require('@/assets/icon/openeye.svg')
      }else{
        this.pwdType = 'password'
        this.pwdIcon = require('@/assets/icon/close-eye-icon.png')
      }
    },
    changeRepeatPwdType(){
      if (this.repeatPwdType === 'password'){
        this.repeatPwdType = 'text'
        this.repeatPwdIcon = require('@/assets/icon/openeye.svg')
      }else{
        this.repeatPwdType = 'password'
        this.repeatPwdIcon = require('@/assets/icon/close-eye-icon.png')
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/css/vars";
.login {
  width: 100vw;
  height: 100vh;
  //background: url(~assets/img/login-bg.png) no-repeat;
  background: linear-gradient( to top, $mainColor,$shallowMainColor);
  background-size: 375px 100vh;
  display: flex;
  align-items: center;
  justify-content: center;


  .wrapper {
    width: 322px;
    border: 1px solid #FFFFFF;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%);
    /*opacity: .7;*/
    border-radius: 20px;
    padding: 0 23px 20px 23px;

    .form-title {
      font-size: 20px;
      font-weight: 800;
      color: #fff;
      text-align: center;
      padding: 55px 0 5px 0;
      text-transform: uppercase;
    }
    .submit-btn {
      width: 201px;
      height: 50px;
      //background: linear-gradient(180deg, rgba(94, 217, 248, 0.99) 0%, rgba(29, 111, 223, 0.99) 100%);
      background: linear-gradient( to top, $mainColor,$shallowMainColor);
      opacity: 1;
      border-radius: 25px;
      border: none;
      color: #fff;
      text-transform: capitalize;
      margin: 0 auto;
    }

    .bottom-info {
      font-size: 12px;
      color: #666;
      text-align: center;
      padding-top: 12px;

      a {
        color: #fff;
        padding-left: 7px;
      }
    }
  }
}
</style>
