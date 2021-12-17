<template>
  <van-popup v-model="show" closeable>

    <van-image :src="$tools.getImage(item.show_pic)" class="prod-img"></van-image>
    <div class="goods-name">{{item.goods_name}}</div>

    <div class="desc" v-html="desc"></div>

    <div class="sub-info">
      <dl>
        <dt>{{$t('Price')}}:</dt>
        <dd>{{price}}</dd>
      </dl>
      <dl>
        <dt>{{$t('Hourly income')}}:</dt>
        <dd>{{hourIncome}}</dd>
      </dl>
      <dl>
        <dt>{{$t('Total revenue')}}:</dt>
        <dd>{{totalRevenue}}</dd>
      </dl>
      <dl>
        <dt>{{$t('Cycle days')}}:</dt>
        <dd>{{cycle}}</dd>
      </dl>
    </div>

    <van-button color="#2C9EF4" round block class="rent-btn" :loading="$store.getters['system/gloading']" @click="purchase">{{$t('Rent')}}</van-button>

  </van-popup>


</template>

<script>
export default {
  name: "productDetail",
  data(){
    return {
      show:false,
      item:{
        coinAttr:{},
        usdtAttr:{},
      },
      type:""
    }
  },
  computed:{
    desc(){
      return this.type == 'coin' ? this.item.coin_desc : this.item.usdt_desc
    },
    price(){
      return this.type == 'coin' ? this.item.coinAttr.unit_cost : this.item.usdtAttr.unit_cost
    },
    hourIncome(){
      return this.type == 'coin' ? this.item.coinAttr.win_rate : this.item.usdtAttr.win_rate
    },
    cycle(){
      return this.type == 'coin' ? this.item.coinAttr.mold : this.item.usdtAttr.mold
    },
    totalRevenue(){
      return Number((this.hourIncome * this.cycle).toFixed(2))
    }
  },
  methods:{
    handleOpen(item,type){
      this.item = item
      this.type = type
      this.show = true
    },
    handleClose(){
      this.show = false
      this.item = {
        coinAttr:{},
        usdtAttr:{},
      }
      this.type = ""
    },
    async purchase(){
      const formData = {
        id : this.type == 'coin' ? this.item.coinAttr.id : this.item.usdtAttr.id ,
        coin_type : this.type == 'coin' ? 1 : 2
      }
      const resp  = await this.$http.post('/v1/auth/business/match/purchase',formData).catch(err=>err)
      if (resp.code == 90004){
        this.$router.push('/TrxAccount')
      } else {
        this.$toast({
          message:this.$t('Rent Success'),
          onClose:()=>{
            this.handleClose()
            this.$store.dispatch('user/loadUserInfo')
          }
        })
      }

    }
  }
}
</script>

<style scoped lang="scss">

.van-popup{
  width: 320px;
  background-color: #fff;
  border-radius: 10px;
  padding: 15px 10px;
  .van-image{
    width: 80px;
    height: 80px;
    border: 1px solid #2980b9;
    border-radius: 13px;
    overflow: hidden;
    display: block;
    margin: 10px auto ;

  }

  .goods-name{
    font-size: 16px;
    font-weight: 700;
    text-align: center;
  }

  .desc{
    font-family: Avenir,Helvetica,Arial,sans-serif;
    font-size: 13px;
    line-height: 1.3 ;
    text-indent: 2em;
    position: relative;
    padding-bottom: 10px;
    &::after{
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      transform: scaleY(.5);
      width: 100%;
      height: 1px;
      background: #eee;
    }
  }

  .sub-info{
    dl{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 5px 2px;
      dt{
        color: #000;
      }
      dd{
       color: #2980b9;
        font-size: 17px;
        font-weight: 700;
      }
    }
  }

  .rent-btn{
    width: 192px;
    height: 40px;
    margin: 25px auto 10px;
  }

}

</style>
