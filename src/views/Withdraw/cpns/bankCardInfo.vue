<template>
  <div class="bankCardInfo card-wrapper">
    <template v-if="cointype==='coin'">
      <dl>
        <dt>{{ $t('Name') }}</dt>
        <dd>{{ bankcardinfo.username }}</dd>
      </dl>

      <dl>
        <dt>{{ $t('Mobile') }}</dt>
        <dd>{{ bankcardinfo.mobile }}</dd>
      </dl>

      <dl>
        <dt>{{ $t('Bank Accounts') }}</dt>
        <dd>{{ bankcardinfo.withdraw_deposit }}</dd>
      </dl>

      <dl>
        <dt>{{ $t('IFSC') }}</dt>
        <dd>{{ bankcardinfo.bank_code }}</dd>
      </dl>
    </template>

    <template v-else>
      <dl>
        <dt>{{ $t('trxaccount') }}</dt>
        <dd>{{ trx_account }}</dd>
      </dl>
    </template>


    <van-button class="modify" block color="#3596E8" @click="toEditPage">
      {{ $t('Modify') }}
    </van-button>
  </div>
</template>

<script>

export default {
  name: "bankCardInfo",
  props: {
    bankcardinfo: Object,
    cointype: String
  },
  computed: {
    userinfo() {
      return this.$store.getters['user/userInfo']
    },
    trx_account() {
      return this.userinfo.trx_account
    }
  },


  created() {

  },
  methods: {
    //跳转编辑银行卡的页面 或者编辑usdt账号的页面
    toEditPage(){
      if (this.cointype === 'coin'){
        this.$router.push({
          name:'addBankCard',
          query:{
            id : this.bankcardinfo.id
          }
        })
      }else if (this.cointype === 'usdt'){
        this.$router.push({
          name:'Setting'
        })
      }
    }
  },
  destroyed() {

  }
}
</script>

<!--suppress CssUnknownTarget -->
<style lang="scss" scoped>
@import "~assets/css/vars";

.card-wrapper {
  display: block;
  width: 345px;
  background-color: #fff;
  margin: 15px auto;
  border-radius: 10px;
  padding: 10px 18px;

  .card-tit {
    font-weight: 700;
    font-size: 17px;
  }

  .card-val {
    //color: $mainColor;
    height: 49px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 21px;
    background-color: #F6F2FC;
    border-radius: 50px;
    margin-top: 10px;
    margin-bottom: 10px;
    overflow: hidden;

    input {
      flex: 1;
      height: 100%;
      border: none;
      background-color: transparent;
      font-size: 14px;
      padding-left: 26px;
      border-radius: 50px;

      &::placeholder {
        color: #999;
      }
    }

    .van-button {
      margin-left: 10px;
    }
  }

  dl {
    dt {

      font-size: 17px;
      color: #97B9F5;
    }

    dd {
      height: 49px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 17px;
      background-color: #F9F9F9;
      border-radius: 50px;
      margin-top: 10px;
      margin-bottom: 10px;
      overflow: hidden;
      padding-left: 26px;
    }
  }
}

.modify {
  width: 175px;
  height: 40px;
  border-radius: 55px;
  margin: 20px auto 0;
}

</style>
