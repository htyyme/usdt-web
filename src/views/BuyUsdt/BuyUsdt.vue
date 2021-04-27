<template>
  <div class="BuyUsdt">
    <navbar title="Buy Usdt"></navbar>

    <div class="banner">
      <van-image :src="$tools.getImage(detail.show_pic)"></van-image>
    </div>

    <div class="goods">
      <div class="user">
        <van-image :src="getItemAvatar(detail)" class="avatar"></van-image>
        <span class="username">{{detail.goods_name}}</span>
      </div>

      <div class="price">{{detail.info.price | moneyFormat(2,'coin')}}/USDT</div>
      <p class="shop_desc">{{detail.goods_intro}}</p>

    </div>


    <div class="box">
      <div class="hd">
        <div class="op" :class="{active:type==1}" @click="changeType(1)">Buy by amount</div>
        <div class="op" :class="{active:type==2}" @click="changeType(2)">Buy by quantity</div>
      </div>

      <div class="bd" v-if="type==1">
        <span class="coin">{{ $t('coin') }}</span>
        <input type="number" placeholder="Enter the amount you want to buy" v-model="amount" @input="handleAmountInput">
      </div>
      <div class="bd" v-else-if="type==2">
        <span class="coin">U</span>
        <input type="number" placeholder="Enter the quantity you want to buy"  v-model="nums" @input="handleNumsInput">
      </div>

      <div class="ft">
        <div>
          <span>number</span>
          <em>{{nums}} USDT</em>
        </div>
        <div>
          <span>Total price</span>
          <em>{{amount | moneyFormat}}</em>
        </div>
      </div>

      <van-button block round  class="sel-btn" :loading="$store.state.gloading" @click="handleSubmit">Buy usdt</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "BuyUsdt",
  data(){
    return {
      detail: {
        info:{}
      },
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
  created() {
    this.loadData()
  },
  methods:{
    //获取详情
    async loadData() {
      const resp = await this.$http.post('/v1/business/match/detail', {id: this.id})
      // console.log(resp)
      this.detail = resp.data.match
      this.detail.info = JSON.parse(this.detail.extra2)
    },
    getItemAvatar(item){
      if (item.info.pic){
        return this.$tools.getImage(item.info.pic)
      }else{
        return require('@/assets/icon/default_avatar.png')
      }
    },
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

.BuyUsdt{
  min-height: 100vh;
  background-color: #f4f4f4;
  .banner{
    height: 238px;
    .van-image{
      width: 100%;
      height: 100%;
    }
  }

  .goods{
    width: 362px;
    background: #FFFFFF;
    border-radius: 9px;
    margin: -17px auto 0;
    position: relative;
    z-index: 1;
    padding: 13px 14px;
    position: relative;
    .price{
      display: inline-block;
      height: 32px;
      background: #FFC543;
      border-radius: 7px;
      font-size: 19px;
      color: #fff;
      line-height: 32px;
      padding: 0 10px;
    }
    .shop_desc{
      line-height: 1.5;
      padding-top: 8px;
      font-size: 13px;
    }
    .user{

      position: absolute;
      right: 10px;
      display: flex;
      align-items: center;
      .avatar{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 5px;
      }
      .username{
        font-size: 12px;
        color: #3596E8;
        font-weight: 700;
      }
    }
  }

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
}

</style>