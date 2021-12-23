<template>
  <div>

    <header>

      <div class="navbar">
        <van-icon :name="require('@/assets/icon/return.png')" @click="$router.back()" size="25"></van-icon>
      </div>

      <div class="bd">
        <div class="tit">{{$t('Usdt Balance')}}</div>
        <div class="num">{{available_balance | moneyFormat(5,'usdt')}}</div>
      </div>

    </header>

    <div class="box">
      <div class="tit">{{$t('number-usdt')}}</div>
      <div class="ipt">
        <span @click="decNum">-</span>
        <input type="number" v-model.number="form.nums">
        <span @click="incNum">+</span>
      </div>
      <div class="options">
        <span @click="quickSelect(1)">All</span>
        <span @click="quickSelect(2)">1/2</span>
        <span @click="quickSelect(3)">1/3</span>
        <span @click="quickSelect(4)">1/4</span>
      </div>
    </div>

    <div class="box pr">
      <div class="tit">{{$t('Selling price')}}</div>
      <div class="ipt">
        <span @click="decPrice">-</span>
        <input type="number" v-model.number="form.extra">
        <span @click="incPrice">+</span>
      </div>
      <div class="ft">{{$t('Unit price limit')}} 1- 99999</div>
    </div>


    <div class="total">{{$t('Total sale price')}} <em>{{totalPrice}}</em></div>

    <van-button round block  class="sel-btn" :loading="$store.getters['system/gloading']" @click="handleSubmit">{{$t('Sell')}}</van-button>
  </div>
</template>

<script>

export default {
  name: "UsdtSell",
  data(){
    return {
      available_balance:0,
      form:{
        extra:0,//单价
        nums:0,//数量

      }
    }
  },
  computed:{
    usdtAccount(){
      return this.$store.getters['user/usdtAccount']
    },
    totalPrice(){
      return (this.form.extra * this.form.nums) .toFixed(2)
    }
  },
  async created() {
    await this.loadMerchantInfo()
    this.$store.dispatch('user/loadUserInfo')
    this.getExchangeAccount()
  },
  methods:{
    async getExchangeAccount(){
      const resp = await this.$http.post('/v1/auth/ustd/exchangeAccount')
      this.available_balance = resp.data?.available_balance
    },
    //判断是否绑定了商家信息
    async loadMerchantInfo(){
      const resp = await this.$http.post('/v1/auth/user/merchant')
      if (resp.data.id==0){
        const confirmres = await this.$dialog.confirm({
          message:this.$t('You must fill the shop information at first')
        }).catch(err=>err)
        if(confirmres ==='confirm'){
          this.$router.push({
            name:'BusinessInfo'
          })
        }else{
          this.$router.back()
        }

      }
    },
    decNum(){
      if (this.form.nums <= 0){
        return
      }
      this.form.nums--
    },
    incNum(){
      this.form.nums++
    },
    decPrice(){
      if (this.form.extra <= 0){
        return
      }
      this.form.extra--
    },
    quickSelect(option){
      const balance = this.usdtAccount.available_balance
      if (option==1){ //all
        this.form.nums = balance
      }else if (option==2){ // 1/2
        this.form.nums =( balance / 2) .toFixed(2)
      }else if (option == 3){ // 1/3
        this.form.nums =( balance / 3) .toFixed(2)
      } else if (option == 4){ // 1/4
        this.form.nums =( balance / 4) .toFixed(2)
      }
    },
    incPrice(){
      this.form.extra++
    },
    async handleSubmit(){
      if (this.totalPrice <= 0){
        return this.$toast.fail(this.$t('Please enter the correct quantity'))
      }
      const resp = await this.$http.post('/v1/auth/ustd/sell',{
        extra:Number(this.form.extra),
        nums:Number(this.form.nums),
      })
      this.$toast.success({
        message:this.$t('success'),
        onClose:()=> {
          this.$store.dispatch('user/loadUserInfo')
          this.$router.back()
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
header{
  background-color: #3CA1EB;
  height: 6.66667rem;
  .navbar{
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 14px;
    a{
      color: #ff6500;
    }
  }

  .bd{
    color: #fff;
    text-align: center;
    .tit{
      padding-bottom: 7px;
      padding-top: 5px;
    }
    .num{
      font-weight: 700;
      font-size: 28px;
    }
  }


}


.box{
  border-radius: .21333rem;
  background-color: #fff;
  padding-left: .4rem;
  padding-right: .4rem;
  padding-bottom: .4rem;
  font-size: .32rem;
  margin: -100px 15px .26667rem;
  &.pr{
    margin: 12px 15px .26667rem;
  }
  .tit{
    font-size: .42667rem;
    font-weight: 700;
    line-height: 1.30667rem;
  }
  .ipt{
    border: .02667rem solid #000;
    background-color: #f0faf8;
    border-radius: .21333rem;
    margin-bottom: .26667rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    input{
      height: 1.30667rem;
      border: none;
      appearance: none;
      flex: 1;
      font-size: 16px;
      text-align: center;
    }
    span{
      width: 1.30667rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 25px;
      color: #3CA1EB;
    }
  }
  .options{
    display: flex;
    span{
      border: .02667rem solid #555;
      border-radius: .21333rem;
      font-size: .32rem;
      line-height: .85333rem;
      text-align: center;
      flex: 1;
      margin: 0 3px;
    }
  }
}


.total{
  margin: 0 15px ;
  color: #555;
  font-size: 15px;
  em{
    color: #FF7335;
    font-weight: 700;
  }
}

.sel-btn{
  margin: 20px auto 0;
  width: 70%;
  background: linear-gradient(180deg, rgba(94, 217, 248, 0.99) 0%, rgba(29, 111, 223, 0.99) 100%);
  color: #fff;
}

</style>
