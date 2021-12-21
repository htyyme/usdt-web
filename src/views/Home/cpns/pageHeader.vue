<template>
  <header>
    <div class="user">
      <span class="hi">hi</span>
      <span class="name">{{userInfo.member_name}}</span>
      <van-icon :name="require('@/assets/icon/lv-icon.png')" size="24" class="lv-icon"></van-icon>
      <van-icon :name="require('@/assets/icon/message.png')" size="24" class="message" :class="{has_new:has_new!=0}" @click="toMessagePage"></van-icon>
    </div>

    <div class="glass"  :class="assetsClass">
      <van-icon :name="require('@/assets/icon/toggle.png')" size="20" class="toggle" @click="toggleCoinType"></van-icon>

      <div class="balance">
        <dl>
          <dt>{{available_balance |moneyFormat(2,gcointype) }}</dt>
          <dd>Your Total Assets</dd>
        </dl>
        <dl>
          <dt>{{experience_amount | moneyFormat(2,gcointype)}}</dt>
          <dd>Virtual currency</dd>
        </dl>
      </div>
    </div>
  </header>
</template>


<script>

export default {
  name: "pageHeader",
  computed:{
    userInfo(){
      return this.$store.getters['user/userInfo']
    },
    gcointype(){
      return this.$store.getters['system/gcointype']
    },
    assetsClass(){
      if (this.gcointype === 'coin') {
        return 'type-coin'
      } else {
        return 'type-usdt'
      }
    },
    accountinfo(){
      if (this.gcointype === 'coin') {
        return this.$store.getters['user/coinAccount']
      } else {
        return this.$store.getters['user/usdtAccount']
      }
    },
    //体验金
    experience_amount(){
      return this.accountinfo.experience_amount
    },
    //可用余额
    available_balance(){
      return this.accountinfo.available_balance
    },

  },
  data(){
    return {
      has_new:0
    }
  },
  created() {
    this.loadmsg()
  },
  methods:{
    toggleCoinType(){
      this.$tools.toggleGlobalCoinType()
    },
    toMessagePage(){
      this.$router.push({
        name:'MsgList'
      })
    },
    async loadmsg(){
      const resp = await this.$http.post('/v1/auth/msgs/new',{})
      // console.log(resp)
      this.has_new = resp.data.has_new
    }

  }
}
</script>

<style scoped lang="scss">
  @keyframes fliker {
    0%{
      opacity: 0;
      transform: scale(0);
    }
    100%{
      opacity: 1;
      transform: scale(2);
    }
  }
  header {
    height: 185px;
    background: linear-gradient( to top,#242EAC,#626AD9);
    position: relative;

    .user {
      padding: 24px 15px 0;
      color: #fff;
      position: relative;
      display: flex;
      align-items: center;

      .hi {
        font-size: 20px;
        text-transform: uppercase;
      }

      .name {
        font-size: 14px;
        padding-left: 10px;
      }
      .lv-icon{
        padding-left: 3px;
      }
      .message {
        position: absolute;
        right: 16px;

        &.has_new::after{
          content: "";
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #f00;
          box-shadow: 0 0 1px 1px rgba(255,0,0,.3);
          position: absolute;
          right: -1px;
          top: 0;
          animation: fliker 1s linear  infinite ;
        }
      }

    }

    .glass{
      height: 114px;
      width: 340px;
      border-radius: 20px 20px 0px 0px;
      overflow: hidden;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(255, 255, 255, 0.2) url(~assets/img/usdtbg.png) no-repeat;
      background-size: cover;
      &.type-coin{
        background-image: url(~assets/img/coinbg.png);
      }
      .toggle{
        position: absolute;
        right: 10px;
        top: 10px;
      }

      .balance {
        display: flex;
        color: #fff;
        padding: 30px 24px 0;
        justify-content: space-between;

        dt {
          font-size: 20px;
          text-align: center;
          padding-bottom: 13px;
        }

        dd {
          width: 125px;
          height: 22px;
          background: #626AD9;

          border-radius: 11px;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
</style>
