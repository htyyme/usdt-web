<template>
  <div class="login">
    <div class="wrapper">
      <div class="form-title">register</div>
      <field4 :left-icon="require('@/assets/icon/phone-icon.png')" :placeholder="$t('Phone Number')">
        <template #left>+91</template>
      </field4>
      <field4 :left-icon="require('@/assets/icon/sms-icon.png')" :placeholder="$t('SMS Code')">
        <template #right>
          <van-button color="#35C1FF" class="otp" size="mini">send code</van-button>
        </template>
      </field4>
      <field4 :left-icon="require('@/assets/icon/pwd-icon.png')" :placeholder="$t('Password')"></field4>
      <field4 :left-icon="require('@/assets/icon/pwd-icon.png')" :placeholder="$t('Repeat Password')"></field4>
      <field4 :left-icon="require('@/assets/icon/invite-icon.png')" :placeholder="$t('Repeat Password')"></field4>
      <van-button class="submit-btn" block>Register</van-button>
      <p class="bottom-info">
        <span>Already have account?</span>
        <router-link :to="{name:'Login'}">Login Now</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register"
}
</script>

<style scoped lang="scss">
.login {
  width: 100vw;
  height: 100vh;
  background: url(~assets/img/login-bg.png) no-repeat;
  background-size: 375px;
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
      color: #FF00E6;
      text-align: center;
      padding: 55px 0 5px 0;
      text-transform: uppercase;
    }
    .submit-btn {
      width: 201px;
      height: 50px;
      background: linear-gradient(180deg, rgba(94, 217, 248, 0.99) 0%, rgba(29, 111, 223, 0.99) 100%);
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
        color: #FF00E6;
        padding-left: 7px;
      }
    }
  }
}
</style>