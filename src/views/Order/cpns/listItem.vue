<template>
  <div class="list-item" >
    <div class="goodstag">
      <img :src="require('@/assets/icon/new.png')" alt="">
    </div>
    <div class="bd">
      <template >
        <!--倒计时大于0 就显示倒计时-->
        <!--<aside class="mult"  >-->
        <!--  <div class="title">{{$t('Double income')}}</div>-->
        <!--  <van-count-down :time="600000" />-->
        <!--</aside>-->
        <!--&lt;!&ndash;显示领取按钮&ndash;&gt;-->
        <!--<aside class="mult" >-->
        <!--  <div class="title">{{$t('Double income')}}</div>-->
        <!--</aside>-->

        <!--&lt;!&ndash;显示赎回按钮&ndash;&gt;-->
        <!--<template >-->
        <!--  <aside class="redom" >{{$t('redemption')}}</aside>-->
        <!--</template>-->
      </template>

      <van-image class="prod-img" :src="$tools.getImage(order.show_pic)"
                 ></van-image>
      <div class="details">
        <div class="tit">{{order.goods_name}} ({{order.buy_result}} Days)</div>
        <!--<div class="tags">-->
        <!--  &lt;!&ndash;<div class="type">24-hour earnings</div>&ndash;&gt;-->
        <!--  <div class="type">{{$t('Cycle')}}:{{order.buy_result}} Days</div>-->
        <!--</div>-->

        <div class="line">{{$t('Shared')}}:{{shareTime}}{{$t('Hours')}}</div>
        <div class="line">{{$t('Purchase Price')}}({{$t('coin')}}):{{order.amount}}</div>
        <div class="line">{{$t('Purchase Time')}}:{{order.buy_time | dateFormat}}</div>
      </div>
    </div>
    <div class="footer">
      <dl>
        <dt>{{$t('Cumulative earnings')}}({{$t('coin')}})</dt>
        <dd>{{order.win_amount}}</dd>
      </dl>
      <dl>
        <dt>{{$t('Hourly earnings')}}({{$t('coin')}})</dt>
        <dd>{{order.end_result}}</dd>
      </dl>
      <dl :class="{zero:order.bonus_amount<=0}" @click="collect">
        <dt>{{$t('To be collected')}}</dt>
        <dd>{{order.bonus_amount}}</dd>
      </dl>
    </div>


    <!--动画弹窗-->
    <doubleConfirm ref="doubleConfirmRef"/>
  </div>
</template>

<script>
import vars from "@/assets/css/vars.scss";
import doubleConfirm from "./doubleConfirm";
import {debounce} from "lodash";

export default {
  name: "listItem",
  components:{
    doubleConfirm
  },
  props: {
    order:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return {
      loading:false
    }
  },
  mounted() {

  },
  computed: {
    shareTime:{
      get(){
        return Math.floor((this.order.bonus_time - this.order.buy_time) / 3600)
      }
    }
  },
  watch:{


  },
  methods: {
    async collect(){
      if (this.order.bonus_amount<=0 || this.loading ){
        return
      }

      this.loading = true
      const resp = await this.$http.post('/v1/auth/business/match/bonus',{
        id : this.order.id
      }).catch(err=>err)

      if (resp.code==200){
        // this.$refs.doubleConfirmRef.handleOpen()

        this.$toast({
          message:this.$t('success'),
          onClose:()=>{
            this.$emit('collectFinish',this.order)
          }
        })
      }

      setTimeout(()=>{
        this.loading = false
      },800)

    }
  },

}
</script>

<!--suppress CssUnknownTarget -->
<style lang="scss" scoped>
@import "~assets/css/vars";

.list-item {
  width: 345px;
  height: 210px;
  background: #F6F2FC;
  border-radius: 10px;
  margin: 15px auto;
  display: flex;
  flex-direction: column;
  position: relative;

  .goodstag{
    width: 59px;
    height: 59px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    img{
      width: 100%;
      height: 100%;
    }
  }

  .bd {
    flex: 1;
    padding: 12px 0 0 10px;
    display: flex;
    position: relative;

    /*倒计时*/
    .mult{
      position: absolute;
      width: 115px;
      height: 30px;
      background-color: rgba(242,81,81,.4);
      top: 10px;
      right: 0;
      display: flex;
      flex-direction: column;
      color: #FFFFFF;
      padding-left: 25px;
      justify-content: center;
      align-items: center;
      &::before{
        content: '';
        height: 100%;
        width: 24px;
        background: url("~assets/icon/2x.png") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
      .title{
        font-size: 12px;
      }
      .van-count-down{
        font-size: 12px;
        color: #fff;
      }
    }

    .redom{
      position: absolute;
      right: 0;
      top: 140px;
      transform:  rotate(90deg);
      transform-origin: right top;
      //background: linear-gradient(to right,#9b59b6,#8e44ad);
      background: $mainColor;
      color: #fff;
      font-size: 13px;
      padding: 5px 6px;
      text-transform: capitalize;
      border-radius: 0 0 8px 8px;
    }

    .prod-img {
      width: 60px;
      height: 60px;
      border-radius: 10px;
      overflow: hidden;
    }

    .details {
      margin-left: 13px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .tit {
        font-size: 16px;
        font-weight: bold;
        max-width: 250px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        margin: 6px 5px;
      }

      .tags{
        display: flex;
        flex-wrap: wrap;
        .type {
          //background-color: rgba(126, 48, 249, .3);
          background-color: rgba(126, 48, 249, 0.3);
          height: 20px;
          border-radius: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 10px;
          font-size: 12px;
          //color: #fff;
          margin: 0 3px;
          color: rgba(126, 48, 249, 0.3);
        }
      }


      .line {
        font-size: 12px;
        color: #666;
        line-height: 2;
      }
    }
  }

  .footer {
    height: 82px;
    border-top: 1px solid #EBDFFE;
    display: flex;

    dl {
      flex: 1;
      display: flex;
      flex-direction: column-reverse;
      justify-content: flex-end;
      align-items: center;
      text-align: center;
      padding: 0 5px;

      dt {
        width: 100%;
        font-size: 12px;
        color: #999;
      }

      dd {
        margin: 8px 0 5px 0;
        font-size: 18px;
        font-family: Nirmala UI;
        color: $mainColor;
        font-weight: 700;
      }

      &:last-child {
        background-color: $mainColor;

        border-radius: 0 0 10px 10px;

        dd, dt {
          color: #fff;
        }

        &.zero {
          background-color: #ccc;
        }
      }
    }
  }
}

</style>
