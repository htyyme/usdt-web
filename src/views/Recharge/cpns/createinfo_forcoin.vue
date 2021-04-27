<template>
  <van-dialog v-model="show" :title="$t('Fill in the information')" show-cancel-button :show-confirm-button="false"
              @cancel="handleCancel">
    <van-form @submit="onSubmit">
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
import {checkMobile,checkEmail} from "@/utils/tools";

export default {
  name: "createInfo",
  data() {
    return {
      show: false,
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
      if (!this.email || !this.phone){
        this.show = true
      }
    },
    async onSubmit(values) {
      if (!checkMobile(this.phone)){
        return this.$toast.fail('Phone number format is incorrect')
      }
      if (!checkEmail(this.email)){
        return this.$toast.fail('Email format is incorrect')
      }

      const resp = await this.$http.post('/v1/auth/user/charge/modify',{
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