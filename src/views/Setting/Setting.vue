<template>
  <div class="settings">
    <navbar :title="$t('Setting')"></navbar>


    <van-form @submit="onSubmit">
      <van-field :label="$t('Phone Number')" v-model="phone" readonly/>
      <van-field :label="$t('Nickname')" v-model="nickname"/>
      <van-field :label="$t('Real Name')" v-model="realname"/>
<!--      <van-field :label="$t('trxaccount')" v-model="trx_account" :readonly="trxaccountReadonly"/>-->
      <van-cell :title="$t('Login Password')" is-link  :to="{name:'ChangePass'}"/>
      <van-cell :title="$t('Payment Password')" is-link  :to="{name:'PaymentPassword'}"/>

      <div style="margin: 16px;">
        <van-button round block native-type="submit" :loading="$store.getters['system/gloading']" class="save-btn">{{$t('Save')}}</van-button>
      </div>
    </van-form>

  </div>
</template>

<script>


export default {
  name: "Setting",
  data(){
    return {
      nickname:"",
      realname:"",
      phone:"",
      trx_account:'',
      trxaccountReadonly:false
    }
  },
  created() {
    this.nickname = this.userInfo.nickname
    this.realname = this.userInfo.extend_info.realname
    this.phone = this.userInfo.member_name
    this.trx_account = this.userInfo.trx_account

    //钱包地址不允许修改
    if (this.trx_account.length > 0){
      this.trxaccountReadonly = true
    }
  },
  computed: {

    userInfo(){
      return this.$store.getters['user/userInfo']
    }
  },
  methods:{
    async onSubmit() {
      const formData = {
        nickname:this.nickname,
        trx_account:this.trx_account,
        extend_info: {realname:this.realname},
      }
      const resp = await this.$http.post('/v1/auth/user/modify',formData)
      // console.log(resp)
      const {message} = resp
      this.$toast.success({
        message: message,
        onClose: () => this.$router.back()
      })
    }
  }
}
</script>

<style scoped lang="scss">
.settings{
  background-color: rgba(232, 232, 232, 0.3);
  height: 100vh;
}
.save-btn{
  width: 220px;
  height: 40px;
  background: linear-gradient(180deg, rgba(94, 217, 248, 0.99) 0%, rgba(29, 111, 223, 0.99) 100%);
  border-radius: 28px;
  color: #fff;
  margin: 0 auto;
}

</style>