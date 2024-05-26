<template>

  <van-overlay :show="show" class="congrats-overlay">
    <van-image class="line" :src="require('@/assets/img/line.png')"></van-image>
    <van-image class="light" :src="require('@/assets/img/light.png')"></van-image>
    <div class="content">
      <div class="close" @click="handleClose">
        <van-image :src="require('@/assets/icon/close.png')"></van-image>
      </div>

      <div class="gift">
        <van-image class="cong" :src="require('@/assets/img/congrats2.png')"></van-image>
        <van-image :src="require('@/assets/gif/giftBox.gif')" class="giftBox"></van-image>
      </div>

      <div class="text">
        <div class="info">
          <!--<van-image src="/avatars/5.png" class="avatar"></van-image>-->
          <!--<div>ID: 10003697</div>-->
          <!--<div class="round">key#681 - key#700</div>-->
          <div class="item">
            <span>{{$t("Congratulations on winning the prize")}}:</span>
            <!--<strong>{{prizeInfo.prizeName}}</strong>-->
            <!--<span>Rs.Please check your wallet.</span>-->

            <!--<van-image :src="$tools.getImage(prizeInfo.prizePic)" class="goodsimg"></van-image>-->

            <div class="prizeslist">
              <div v-for="(item,index) in turnResultList" :key="index" class="prizesitem">
                <van-image :src="$tools.getImage(item.photo)" class="prizesitem-img"></van-image>
                <div class="reward_name">{{item.reward_name}}</div>
              </div>
            </div>

            <!--已绑定地址-->
            <div class="hasaddress-tip" v-if="!turnResult.need_bind && turnResult.is_win === 1">{{$t("We will mail it to your delivery address as soon as possible")}}</div>
            <!--未绑定地址-->
            <div class="noaddress" v-if="turnResult.need_bind && turnResult.is_win === 1">
              <van-button class="bind-add-btn" @click="toAddress">{{$t("Fill in the shipping address")}} >> </van-button>
            </div>

          </div>


        </div>
      </div>
    </div>

  </van-overlay>

</template>

<script>
export default {
  name: "congrats",
  data() {
    return {
      show: false,
      prizeInfo:{},
      turnResult:{},
      turnResultList:[]
    }
  },
  methods: {
    handleOpen(prizeInfo,turnResult,turnResultList) {
      this.show = true
      this.prizeInfo = prizeInfo
      this.turnResult = turnResult
      this.turnResultList = turnResultList
    },
    async handleClose() {
      if (this.turnResult.is_win === 1 && this.turnResult.need_bind) {
        const confirmres = await this.$jconfirm2(this.$t('Do you want to fill in the shipping address now?')).catch(err=>err)
        if (confirmres === 'confirm'){
          this.toAddress()
          return
        } else{
          //什么也不做 直接关闭
        }
      }

      this.show = false
      this.prizeInfo = {}
      this.turnResult = {}
    },
    //跳转收货地址
    toAddress(){
      this.$router.push('/address')

      this.show = false
      this.prizeInfo = {}
      this.turnResult = {}
    }
  }
}
</script>

<style scoped lang="scss">

.congrats-overlay {
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .line {
    height: 190px;
    margin-bottom: 0px;
    max-width: 360px;
    //font-family: uni;
    display: block;
    position: relative;
    margin: 0 auto;
  }

  .light {
    margin-bottom: 25px;
    width: 375px;
    max-width: 360px;
    position: fixed;
    height: 360px;
    //font-family: uni;
  }

  .content {
    background: url(~assets/img/empty_bg.png) no-repeat;
    background-size: 100% 100%;
    width: 300px;
    min-height: 200px;
    position: relative;
    padding: 58px 25px 30px;
    box-sizing: border-box;
    margin-top: -15px;

    .close {
      position: absolute;
      width: 35px;
      z-index: 3;
      bottom: -65px;
      left: calc(50% - 20px);

      .van-image {
        height: 36px;
        height: 100%;
      }
    }

    .gift {
      position: absolute;
      width: 100%;
      top: -100px;
      //left: calc(50% - 112px);
      left: 50%;
      transform: translateX(-50%);
      text-align: center;

      .cong {
        //height: 46px;
        width: 70%;
        z-index: 0;
        color: #fcf4c7;
        text-align: center;
      }

      .giftBox {
        height: 138px;
        width: 100px;
        margin-top: -40px;
        z-index: 10;
      }
    }

    .text{
      color: #fcf4c7;
      text-align: center;
      //font-family: uni;
      .info{
        font-size: 10px;
        margin-bottom: 5px;
        .avatar{
          height: 47px;
          width: 47px;
          margin-bottom: 5px;
          border-radius: 50%;
          overflow: hidden;
        }
        .round{
          font-size: 10px;
          color: red;
          margin: 3px 0 3px 0;
        }
        .item{
          font-size: 13px;
          strong{
            font-size: 20px;
            color: #f30;
            margin: 0 10px;
            display: block;
            padding-top: 5px;
          }
          .goodsimg{
            display: block;
            margin: 10px auto 0;
            max-width: 70px;
          }
          .prizeslist{
            display: flex;
            justify-content: center;
            gap: 9px;
            padding-top: 15px;
            .prizesitem{
              display: flex;
              flex-direction: column;
              text-align: center;
              align-items: center;
              .prizesitem-img{
                width: 40px;
                height: 40px;
                border-radius: 5px;
                overflow: hidden;
              }
              .reward_name{
                font-size: 12px;
                color: #fff;
                padding-top: 5px;
                word-break: break-all;
              }
            }
          }
          .hasaddress-tip{
            color: #f00;
            padding-top: 10px;
          }
          .noaddress{
            display: flex;
            justify-content: center;
            padding-top: 15px;
            .van-button{
              border-radius: 2px;
              //background-color: #0079ff;
              height: 38px;
              border:none;
              color: #000;
              font-size: 12px;
              text-decoration: underline;
              //background: linear-gradient(180deg,#0079ff 0%,#0079ff 100%);
              background: transparent;

            }

          }
        }
      }
    }
  }
}

</style>
