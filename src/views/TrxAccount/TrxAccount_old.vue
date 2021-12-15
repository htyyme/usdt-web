<template>
  <div class="trx">
    <navbar :title="$t('USDT Wallet Account')"></navbar>


    <van-form @submit="onSubmit" v-if="!trxaccountReadonly">
      <van-field :label="$t('USDT Wallet Account')" v-model="trx_account" :readonly="trxaccountReadonly" placeholder="USDT Wallet Account"/>
      <div style="margin: 16px;" v-if="!trxaccountReadonly">
        <van-button round block native-type="submit" :loading="$store.getters['system/gloading']" class="save-btn">{{$t('Save')}}</van-button>
      </div>

      <p style="color: #3596E8">Once bound, you cannot change it by yourself, please fill in the correct address</p>
    </van-form>


    <div class="list-item" v-else >
      <div class="no-tit">{{$t('USDT Wallet Account')}}:</div>
      <div class="no">
        <span>{{trx_account}}</span>
        <em class="copy" @click="copy">copy</em>
      </div>
      <div class="line"></div>
    </div>




  </div>
</template>

<script>


export default {
  name: "TrxAccount",
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
    },
   async copy(){
      await this.$copyText(this.trx_account)
     this.$toast.success('success')
    }
  }
}
</script>

<style scoped lang="scss">
.trx{
  background-color: rgba(232, 232, 232, 0.3);
  height: 100vh;
  padding: 20px 15px;
}

.save-btn{
  width: 220px;
  height: 40px;
  background: linear-gradient(180deg, rgba(94, 217, 248, 0.99) 0%, rgba(29, 111, 223, 0.99) 100%);
  border-radius: 28px;
  color: #fff;
  margin: 0 auto;
}

.list-item{
  background-color: #fff;
  margin-bottom: 10px;
  padding: 7px 14px 0 25px;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  &::before{
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 12px;
    background-color: #3596E8;
  }
  &.success::before{
    background-color: #22BF3C;
  }
  &.fail::before{
    background-color: #CF182C;

  }
  &::after{
    content: "";
    position: absolute;
    width: 68px;
    height: 68px;
    right: 0;
    bottom: 0;
    background: url(~assets/icon/orderusdt.png) no-repeat;
    background-size: cover;
  }
  &.coin::after{
    background-image:  url(~assets/icon/ordercoin.png);
  }

  .no-tit{
    font-weight: 700;
    color: #333333;
  }
  .no{
    font-size: 12px;
    color: #333;
    padding-top: 6px;
  }
  .amount{
    font-size: 15px;
    margin-top: 6px;
    em{
      color: #3596E8;
      font-weight: 700;
    }
  }
  &.success .amount em{
    color: #22BF3C;
  }
  &.fail .amount em{
    color: #CF182C;
  }
  .dt{
    font-size: 12px;
    color: #999999;
    margin-top: 6px;
  }
  .line{
    width: 307px;
    border: 1px solid #707070;
    opacity: 0.2;
    margin-top: 11px;
  }
  .status{
    color: #3596E8;
    height: 28px;
    display: flex;
    align-items: center;
    .van-icon{
      padding-right: 5px;
    }
  }
  &.success .status{
    color: #22BF3C;
  }

  &.fail .status{
    color: #CF182C;
  }
}

.copy{
  font-size: 12px;
  padding: 1px 3px;
  border-radius: 3px ;
  color: #3596E8;
  border: 1px solid currentColor;
  margin-left: 10px;
  font-weight: 700;
}

</style>