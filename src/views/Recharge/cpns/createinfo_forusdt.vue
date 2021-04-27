<template>
  <van-dialog v-model="show" :title="$t('Fill in the information')" show-cancel-button :show-confirm-button="false"
              @cancel="handleCancel">
    <van-form @submit="onSubmit">

      <van-field
          type="tel"
          v-model="trx_account"
          name="trx_account"
          :label="$t('trxaccount')"
          :placeholder="$t('trxaccount')"
          :rules="[{ required: true }]"
          required
      />
      <van-field
          v-model="email"
          name="email"
          :label="$t('Email')"
          :placeholder="$t('Email')"
          :rules="[{ required: true }]"
          required
      />
      <van-field
          type="tel"
          v-model="phone"
          name="phone"
          :label="$t('Mobile')"
          :placeholder="$t('Mobile')"
          :rules="[{ required: true }]"
          required
      />
      <div style="margin: 16px;">
        <van-button round block :color="mainColor" native-type="submit">{{$t('Submit')}}</van-button>
      </div>
    </van-form>
  </van-dialog>
</template>

<script>
import vars from "@/assets/css/vars.scss";


export default {
  name: "createInfo",
  data() {
    return {
      show: false,
      trx_account: '',
      email: '',
      phone: '',
    };
  },
  created() {
    this.loadBankInfo()
  },
  computed: {
    mainColor() {
      return vars.mainColor
    },
    userinfo(){
      return this.$store.getters['user/userInfo']
    }
  },
  methods: {
    async loadBankInfo() {
      this.email = this.userinfo.email
      this.phone = this.userinfo.phone
      this.trx_account = this.userinfo.trx_account
      if (!this.trx_account ||!this.email || !this.phone){
        this.show = true
      }
    },
    async onSubmit(values) {
      const resp = await this.$http.post('/v1/auth/user/charge/modify',{
        trx_account:this.trx_account,
        email:this.email,
        phone:this.phone
      })
      this.$store.dispatch('user/loadUserInfo')
      //关闭弹窗
      this.handleClose()
    },
    handleClose(){
      this.show = false

    },
    handleCancel() {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="scss">
/deep/ .van-cell__title.van-field__label {
  width: 5.8em;
}
</style>