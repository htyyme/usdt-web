<template>
  <van-popup v-model="show" round position="bottom" closeable >

    <div class="title">{{$t('Exchange USDT to TRX')}}</div>

    <div class="form-wrapper">
      <field3 title="Exchange USDT" v-model="money"></field3>

      <p class="tips">Exchange rate:1U ≈ {{$store.getters['system/config'].usdt_trx_rate}}TRX</p>
    </div>

    <footer>
      <van-button plain  color="#626AD9" @click="handleClose">{{$t('Cancel')}}</van-button>
      <van-button color="#626AD9" :loading="$store.getters['system/gloading']" @click="handleSubmit">{{$t('Confirm')}}</van-button>
    </footer>
  </van-popup>
</template>

<script>
export default {
  data(){
    return {
      show:false,
      money:''
    }
  },

  methods:{
    handleOpen(){
      this.show = true
    },
    handleClose(){
      this.show = false
      this.money = ''
    },
    async handleSubmit(){
      if (!this.money || isNaN(this.money) || this.money <= 0 || this.money > this.$store.getters['user/coinAccount'].available_balance){
        return this.$toast('money is incorrect')
      }
      const resp = await this.$http.post('/v1/auth/ustd/transeTrx',{amount : Number(this.money)})
      this.handleClose()
      this.$toast({
        message:this.$t('success'),
        onClose:()=>{
          this.$store.dispatch('user/loadUserInfo')
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">

.van-popup{
  padding-top: 15px;
}

.title{
  text-align: center;
  font-weight: 700;
  padding: 10px;
  font-size: 20px;
}

.tips{
  color: red;
  text-align: center;
  font-size: 14px;
  padding-bottom: 15px;
}

footer{
  display: flex;
  justify-content: center;
  padding: 25px 0 20px;
  border-top: 1px solid #ccc;
  .van-button{
    width: 40%;
    border-radius: 10px;
    margin: 0 5px;
  }
}

</style>
