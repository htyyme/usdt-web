<template>
  <div class="login">
    <select v-model="locale" class="sel-lang" @change="handleLocaleChange">
      <option :value="item" v-for="(item,index) in languageList" :key="index">{{item}}</option>
    </select>

    <div class="wrapper">
      <div class="form-title">{{$t('login')}}</div>
      <field4 :left-icon="require('@/assets/icon/phone-icon.png')" :placeholder="$t('Phone Number')" v-model="form.playerName">
        <template #left>{{$store.getters['system/config'].international_code}}</template>
      </field4>
      <field4 :left-icon="require('@/assets/icon/pwd-icon.png')" :placeholder="$t('password')" v-model="form.passWord" :type="pwdType">
        <template #right>
          <van-icon :name="pwdIcon" @click="changePwdType"></van-icon>
        </template>
      </field4>

      <van-button class="submit-btn" block @click="doLogin" :disabled="btnDisabled" :loading="$store.getters['system/gloading']">{{$t('Login')}}</van-button>

      <div class="bottom-info">
        <p>
          <span>{{$t('Not have account yet?')}}</span>
          <router-link :to="{name:'Register'}" >{{$t('Register Now')}}</router-link>
        </p>

        <p v-if="isSendSms">
          <router-link :to="{name:'ForgetPass'}" >{{$t('Forget your password')}}</router-link>
        </p>
      </div>


    </div>

    <a href="javascript:;" class="down-app" v-if="!isApp" @click="downloadApp">
      <van-icon :name="require('@/assets/icon/download-icon.png')" size="25"></van-icon>
      <span>{{$t('Download App')}}</span>
    </a>

  </div>
</template>

<script>
import {SHOW_ANNOUNCE} from "@/utils/events";
import appConfig from "@/config";
import messages from "@/assets/lang/messages";
import { Locale } from 'vant';

export default {
  name: "Login",
  data() {
    return {
      form: {
        playerName: '',
        passWord: ''
      },
      pwdType:'password',
      pwdIcon:require('@/assets/icon/close-eye-icon.png'),
      messages:messages,
      locale: this.$store.getters['system/locale'] || appConfig.locale,
      languageList:Object.keys(messages)
    }
  },
  computed:{
    isApp(){
      return appConfig.isApp
    },
    //是否 发送短信
    isSendSms(){
      return this.$store.getters['system/config'].isSendSms
    },
    //提交按钮的禁用状态
    btnDisabled() {
      const {playerName, passWord} = this.form
      if (playerName && passWord) {
        return false
      } else {
        return true
      }
    },
    three_service_address(){
      return this.$store.getters['system/config'].three_service_address
    }

  },
  methods:{
    //下载app
    downloadApp(){
      // this.$tools.openUrl(this.$store.getters["system/config"].android_app_url)
      this.$tools.downloadApp()
    },
    //提交登录
    async doLogin(){
      const r = await this.$http.post('/v1/login', this.form)
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
    //选择语言
    handleLocaleChange(){
      this.$store.commit('system/setLocale',this.locale)
      this._i18n.locale = this.locale
      Locale.use(this.locale ,messages[this.locale] )
    },
  }
}
</script>

<style scoped lang="scss">
.login {
  width: 100vw;
  height: 100vh;
  //background: url(~assets/img/login-bg.png) no-repeat;

  background: linear-gradient( to top, #F8868C,#ff1720);
  background-size: cover;
  overflow: hidden;
  position: relative;
  .sel-lang{
    position: absolute;
    top: 20px;
    right: 15px;
  }


  .wrapper {
    width: 322px;
    border: 1px solid #FFFFFF;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%);
    border-radius: 20px;
    padding: 0 23px 20px 23px;
    margin: 140px auto 0;

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
      background: linear-gradient( to top, #F8868C,#ff1720);
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
      p{
        line-height: 1.7;
      }
    }
  }

  .down-app {
    display: flex;
    background-color: #fff;
    margin: 50px 23px 0;
    height: 60px;
    border-radius: 30px;
    color: #ff1720;
    font-size: 20px;
    align-items: center;
    justify-content: center;

    span {
      padding-left: 10px;
    }
  }
}
</style>
