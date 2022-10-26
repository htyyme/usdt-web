<template>
  <div class="lvList">

    <div class="item" v-for="(item,index) in viplist" :key="index" @click="handleclick(item)">
      <van-image :src="getLvIcon(item.lv_id)" class="levelicon" fit="contain"></van-image>
      <div class="tit">LV.{{item.lv_id}}</div>
      <!--<div class="sub-tit">{{item.cond_limit | moneyFormat(0,'coin')}}</div>-->
      <div class="content">
<!--        <p>1. Each withdrawal limit is 5000</p>-->
<!--        <p>2. The number of orders can be swipe until 30 times</p>-->
        <p>1.{{$t('vipinfo1',{num1:rateFormat(item.superior_rebate) ,num2:rateFormat(item.two_level_rebate) ,num3:rateFormat(item.three_level_rebate)})}}</p>
        <!--<p>2.{{$t('vipinfo2',{num:maxgrab})}}</p>-->

        <p>2.{{$t('Withdraw fee',{num:item.withdrawal_fee})}}</p>
        <p>3.{{$t('viplimit',{limit:item.cond_limit})}}</p>

        <p>4.{{$t('Upgrade price')}}:{{item.price | moneyFormat}}</p>

      </div>

      <!--<div class="shadow">{{$t('widthdrawfrequency',{num:item.lv_id})}}</div>-->

      <div class="lock" v-if="curlv<item.lv_id"></div>
    </div>

  </div>
</template>

<script>
import {getLvIcon,getLvBgimage} from "@/utils/tools";
import {rateFormat} from "@/utils/filters";

export default {
  name: "lvList",
  props:{
    viplist:Array
  },
  computed:{
    //当前的等级
    curlv(){
      return this.$store.getters['user/userInfo'].lv_id
    },
    maxgrab(){
      return this.$store.getters['system/config'].max_grab
    }
  },
  methods:{
    getLvIcon(lv_id){
      return getLvIcon(lv_id)
    },

    async handleclick(item){
      let lvid = item.lv_id
      if (lvid <= this.curlv){
        return
      }
      const confirmRes = await this.$dialog.confirm({
        message: `Are you sure to buy this level`,
      }).catch(err=>err)
      if (confirmRes !== 'confirm') return

      const resp = await this.$http.post('/v1/auth/membership/buy', {
        id: item.level_id,
        coin_type:1
      })
      this.$toast.success({
        message:this.$t('success'),
        onClose:()=>{
          this.$store.dispatch('user/loadUserInfo')
        }
      })
    },

    rateFormat(val){
      return rateFormat(val)
    }
  }
}
</script>

<style scoped lang="scss">
.lvList{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 13px 25px;

  .item{
    height: 227px;
    width: 167px;
    background: url(~assets/img/vip1-bg.png) no-repeat;
    background-size: 167px;
    background-position: center bottom;
    position: relative;
    margin-bottom: 15px;
    &:nth-child(2){
      background-image: url(~assets/img/vip2-bg.png);
      .shadow{
        background-color: #F3B511;
      }
    }
    &:nth-child(3){
      background-image: url(~assets/img/vip3-bg.png);
      .shadow{
        background-color: #7187FB;
      }
    }
    &:nth-child(4){
      background-image: url(~assets/img/vip4-bg.png);
      .shadow{
        background-color: #FF7783;
      }
    }
    &:nth-child(5){
      background-image: url(~assets/img/vip5-bg.png);
      .shadow{
        background-color: #FF7783;
      }
    }
    .lock{
      position: absolute;
      width: 100%;
      height: 100%;
      background: url(~assets/img/vip-lock.png) no-repeat;
      background-size: 167px;
      background-position: center bottom;
      bottom: 0;
      left: 0;
    }
    .levelicon{
      width: 92px;
      height: 92px;
      position: absolute;
      top: 0;
      left: 10px;
    }
    .tit{
      font-size: 18px;
      font-weight: 700;
      text-align: right;
      padding: 30px 5px 0 0;
    }
    .sub-tit{
      color: #666;
      text-align: right;
      padding: 0px 5px 0 0;
    }
    .content{
      color: #666;
      font-size: 12px;
      padding: 40px 10px 0;
    }
    .shadow{
      position: absolute;
      font-size: 12px;
      color: #fff;
      height: 25px;
      border-radius: 13px;
      background-color: #9EB3E2;
      width: 162px;
      display: flex;
      justify-content: center;
      align-items: center;
      bottom: 12px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}

</style>
