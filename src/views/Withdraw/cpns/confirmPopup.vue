<template>

  <van-popup v-model="show" class="comfirmpop" position="bottom" closeable round>
    <div class="title">{{ $t("Confirm withdrawal") }}</div>



    <van-form >
      <van-field
          v-model="displayAmount"
          :label="$t('Withdrawal amount')"
          :placeholder="$t('Withdrawal amount')"
          readonly
      >
      </van-field>

      <van-field
          v-model="password"
          type="password"
          :label="$t('Fund password')"
          :placeholder="$t('Fund password')"
      />

      <div style="margin: 16px;">
        <van-button round block type="info" :disabled="!password" color="#00ba5a" @click="onSubmit" v-no-more-click>{{$t("Submit")}}</van-button>
      </div>
    </van-form>


  </van-popup>

</template>

<script>
export default {
  data() {
    return {
      show: false,
      amount: "",
      password:"",
      verification_code:"",
      bank_id:"",
    }
  },
  computed:{
    displayAmount:{
      get(){
        return this.$t('coin') + this.amount
      },
      set(){}
    }
  },
  methods: {
    handleOpen(amount,verification_code,bank_id) {
      this.show = true
      this.amount = amount
      this.verification_code = verification_code
      this.bank_id = bank_id
    },
    handleClose() {
      this.show = false
      this.amount = ""
      this.verification_code = ""
      this.bank_id = ""
    },
    async onSubmit(){
      const formdata = {
        money:this.amount * 1,
        password:this.password,
        verification_code:this.verification_code,
        coin_type:1,
        bank_id:this.bank_id
      }
      console.log('formdata',formdata)
      let url = '/v1/auth/user/withdraw'
      const resp = await this.$http.post(url,formdata)
      if (resp.code === 200) {
        this.$toast({
          message: this.$t('success'),
          onClose:()=>{
            this.$store.dispatch('user/loadUserInfo')
            // this.handleClose()
            this.$router.push("/WithdrawRecord")
          }
        })
      }
    }
  }
}

</script>

<style lang="scss" scoped>

.comfirmpop {
  padding: 0 15px 15px;

  .title{
    text-align: center;
    padding: 15px 0;
  }

  ::v-deep .van-field__label{
    width: unset !important;
  }
  ::v-deep .van-field__control{
    text-align: right;
  }
}


</style>