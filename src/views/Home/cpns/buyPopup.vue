<template>
  <div class="buyPopup">
    <van-popup v-model="show" round position="bottom">
      <header>
        <div class="type-icon" >{{ productInfo.financial_name }}</div>
        <div class="inner">
          <div class="tit">
            {{$t('oneDay')}} +{{productInfo.interest_rate | rateFormat}} ([{{$t('set')}}] {{productInfo.hold_cycle}} {{$t('days')}})
          </div>
          <div class="sub-tit">[{{ $t('set') }}] {{ productInfo.hold_cycle }} {{ $t('days') }}</div>

        </div>
      </header>

      <div class="bd">
        <div class="tit">{{$t('depositAmount')}}</div>
        <div class="amount">
          <span>{{prefixcoin}}</span>
          <input type="number" :placeholder="$t('Please enter the transfer amount')" v-model.number="amount">
        </div>

        <div class="tip">{{$t('Please enter the transfer amount')}}</div>

        <div class="btns">
          <van-button class="no" round plain :color="mainColor" @click="closePopup">{{ $t('no') }}</van-button>
          <van-button class="yes" round :color="mainColor" :disabled="btnDisabled" @click="handleSubmit">
            {{ $t('yes') }}
          </van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import vars from "@/assets/css/vars.scss";
import {
  OPEN_BUY_POPUP,
  CLOSE_BUY_POPUP,
  RELOAD_PROFIT_INFO
} from "@/utils/events";

export default {
  name: "buyPopup",
  data() {
    return {
      show: false,
      productInfo: {},
      amount: '',
      cointype:''
    };
  },
  computed: {
    mainColor() {
      return vars.mainColor
    },
    //提交按钮的禁用状态
    btnDisabled() {
      const {amount} = this
      if (amount && amount > 0) {
        return false
      } else {
        return true
      }
    },
    prefixcoin(){
      if (this.cointype==='coin'){
        return this.$t('coin')
      } else {
        return 'U'
      }
    }

  },
  mounted() {
    this.$bus.$on(OPEN_BUY_POPUP, this.openPopup)
    this.$bus.$on(CLOSE_BUY_POPUP, this.closePopup)
  },
  methods: {
    /**
     * 打开弹窗
     */
    openPopup(productInfo,cointype) {

      this.show = true
      this.productInfo = productInfo
      this.cointype = cointype
    },
    /**
     * 关闭弹窗
     */
    closePopup() {
      this.show = false
      setTimeout(() => {
        this.resetData()
      }, 200)
    },
    /**
     * 重置数据
     */
    resetData() {
      Object.assign(this.$data, this.$options.data())
    },
    /**
     * 购买产品
     * @returns {Promise<void>}
     */
    async handleSubmit() {
      const submitData = {
        id: this.productInfo.id,
        amount: this.amount,
      }
      if (this.$store.state.currencyType=='coin'){
        submitData.coin_type = 1
      } else {
        submitData.coin_type =  2
      }

      const r = await this.$http.post('/v1/auth/finance/buy', submitData)

      this.$toast.success({
        message: 'Success',
        onClose: () => {
          this.closePopup()
          //重新获取资产信息
          this.$bus.$emit(RELOAD_PROFIT_INFO)
        }
      })
    }
  },
  destroyed() {
    this.$bus.$off(OPEN_BUY_POPUP)
    this.$bus.$off(CLOSE_BUY_POPUP)
  }
}
</script>
<!--suppress CssUnknownTarget -->
<style lang="scss" scoped>
@import "~assets/css/vars";

.buyPopup {
  header {
    height: 88px;
    background: #F6F2FC;
    display: flex;
    align-items: center;
    padding-left: 15px;

    .type-icon {
      width: 44px;
      height: 44px;
      background: url(~assets/icon/protype1.png) no-repeat;
      background-size: 100% 100%;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 25px;

      &.type-B {
        background-image: url(~assets/icon/protype2.png)
      }

      &.type-C {
        background-image: url(~assets/icon/protype3.png)
      }

      &.type-D {
        background-image: url(~assets/icon/protype4.png)
      }
    }

    .inner {
      flex: 1;
      margin-left: 11px;

      .tit {
        font-size: 17px;
        font-weight: bold;
      }

      .sub-tit {
        margin-top: 2px;
        font-size: 13px;
        color: #666;
      }

    }
  }

  .bd {
    padding: 15px;

    .tit {
      font-size: 17px;
      font-weight: bold;
    }

    .amount {
      width: 345px;
      height: 45px;
      border: 1px solid #863EF7;
      border-radius: 10px;
      overflow: hidden;
      margin-top: 10px;
      display: flex;
      align-items: center;

      span {
        font-size: 26px;
        margin: 0 16px 0 12px;
      }

      input {
        font-size: 15px;
        flex: 1;
        border: none;
      }
    }

    .tip {
      font-size: 14px;
      color: #ccc;
      text-align: center;
      margin: 10px 0 15px 0;
    }

    .btns {
      display: flex;
      justify-content: space-between;
      margin: 10px 0 10px 0;

      .no {
        width: 110px;
      }

      .yes {
        width: 223px;
      }
    }
  }
}
</style>
