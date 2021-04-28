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

      <p class="soldnumber">
        <span>Sold number:</span>
        <em>{{detail.info.sell}} / {{detail.info.sum}}</em>
      </p>

    </div>




    <paybox :detail="detail"/>
  </div>
</template>

<script>
import paybox from "./cpns/paybox";
export default {
  name: "BuyUsdt",
  components:{
    paybox
  },
  data(){
    return {
      detail: {
        info:{}
      },

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
    .soldnumber{
      font-size: 14px;
      margin-top: 5px;
      span{
        font-weight: 700;
        color: #3596E8;
        padding-right: 10px;
      }
    }
  }


}

</style>