<template>
  <div class="box">
    <div class="hd">
      <div class="op" :class="{active:type==1}" @click="changeType(1)">{{$t('Buy by amount')}}</div>
      <div class="op" :class="{active:type==2}" @click="changeType(2)">{{$t('Buy by quantity')}}</div>
    </div>

    <div class="bd" v-if="type==1">
      <span class="coin">{{ $t('coin') }}</span>
      <input type="number" :placeholder="$t('Enter the amount you want to buy')" v-model="amount" @input="handleAmountInput">
    </div>
    <div class="bd" v-else-if="type==2">
      <span class="coin">U</span>
      <input type="number" :placeholder="$t('Enter the quantity you want to buy')"  v-model="nums" @input="handleNumsInput">
    </div>

    <div class="ft">
      <div>
        <span>{{$t('number')}}</span>
        <em>{{nums}} USDT</em>
      </div>
      <div>
        <span>{{$t('Total price')}}</span>
        <em>{{amount | moneyFormat}}</em>
      </div>
    </div>

    <van-button block round  class="sel-btn" :loading="$store.state.gloading" @click="handleSubmit">{{$t('Buy usdt')}}</van-button>
  </div>
</template>

<script>
export default {
  name: "paybox",
  props:{
    detail:Object,
  },
  data(){
    return {
      nums: 0,
      amount: 0,
      type: 2
    }
  },
  computed: {
    id() {
      return Number(this.$route.query.id)
    }
  },
  methods:{
    changeType(t) {
      this.type = t
    },
    //根据金额计算usdt
    handleAmountInput(){
      let amount = this.amount || 0
      //单价
      let price = this.detail.info.price
      let n = amount / price

      this.nums = n.toFixed(2)
    },
    //根据数量计算金额
    handleNumsInput(){
      let nums = this.nums || 0
      //单价
      let price = this.detail.info.price
      let n = price * nums

      // console.log(n)
      this.amount = n.toFixed(2)
    },
    async handleSubmit(){
      const confirmres = await this.$dialog.confirm({
        message:'Are you sure you want to buy'
      }).catch(err=>err)
      if (confirmres !== 'confirm'){
        return
      }
      if ( isNaN(this.nums) || this.nums <= 0 ){
        return this.$toast.fail('Please enter the correct quantity')
      }
      const formdata = {
        id : this.id,
        nums : Number(this.nums)
      }
      const resp = await this.$http.post('/v1/auth/ustd/buy',formdata)
      // console.log(resp)
      this.$toast.success({
        message:this.$t('success'),
        onClose:()=>{
          this.$store.dispatch('user/loadUserInfo')
          // this.$router.back()
          this.$store.commit('usdt/setCurrentshopinfo',resp.data)
          this.$router.push({
            name:'UsdtComfirmOrder'
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">

.box {
  border-radius: .21333rem;
  background-color: #fff;
  padding-bottom: .4rem;
  font-size: .32rem;
  margin: 10px 9px .26667rem;
  color: #555;
  overflow: hidden;

  .hd {
    height: 50px;
    display: flex;

    .op {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;

      &.active {
        background-color: #f0faf8;
        color:  #3CA1EB;
        font-weight: 700;
      }
    }
  }

  .bd {
    border: .02667rem solid #000;
    border-radius: .21333rem;
    overflow: hidden;
    margin: 10px 15px;
    display: flex;

    .coin {
      width: 50px;
      font-size: 22px;
      display: flex;
      align-items: center;
      padding-left: 18px;
      font-weight: 700;
    }

    input {
      height: 1.2rem;
      border: none;
      appearance: none;
      flex: 1;
      font-size: 16px;
      width: 75%;

      &::placeholder {
        font-size: 13px;
      }
    }
  }

  .ft {
    div {
      display: flex;
      justify-content: space-between;
      padding: 3px 15px;
    }
  }

  .sel-btn {
    width: 75%;
    margin: 20px auto 0;
    background: linear-gradient(180deg, rgba(94, 217, 248, 0.99) 0%, rgba(29, 111, 223, 0.99) 100%);
    color: #fff;
  }
}

</style>