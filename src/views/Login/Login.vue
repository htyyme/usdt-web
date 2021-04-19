<template>
  <div class="login">
    <div class="wrapper">
      <div class="form-title">LOGIN</div>

      <field4 :left-icon="require('@/assets/icon/phone-icon.png')" :placeholder="$t('Please enter your mobile')" ></field4>

    </div>
  </div>
</template>

<script>
export default {
name: "Login"
}
</script>

<style scoped lang="scss">
.login{
  width: 100vw;
  height: 100vh;
  background:  url(~assets/img/login-bg.png) no-repeat;
  background-size: 375px;
  display: flex;
  align-items: center;
  justify-content: center;
  .wrapper{
    width: 322px;
    height: 530px;
    border: 1px solid #FFFFFF;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%);
    opacity: .7;
    border-radius: 20px;

    .form-title{
      font-size: 20px;
      font-weight: 800;
      color: #FF00E6;
      text-align: center;
      padding: 55px 0 5px 0;

    }
  }
}
</style>