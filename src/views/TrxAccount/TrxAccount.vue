<template>

  <div class="accounts-page page-bg">

    <div class="page-navbar">{{$t('Account setup')}}</div>

    <van-icon name="arrow-left" color="#fff" size="22" class="back" @click="$router.back()"/>

    <div class="w bankcard-wrapper" v-if="bindCard">
      <div class="top">
        <section>
          <van-icon :name="require('@/assets/icon/icon_bankcard.png')" size="30"></van-icon>
          <span class="bind">{{$t('Bank card binding')}}</span>
        </section>
        <a href="javascript:;"  @click="toBankcard">{{$t('edit')}}</a>
      </div>

      <div class="bd">
        <dl>
          <dt>{{$t('Name')}}</dt>
          <dd>{{bankcardInfo.username}}</dd>
        </dl>
        <dl>
          <dt>{{$t('Card number')}}</dt>
          <dd>{{bankcardInfo.withdraw_deposit}}</dd>
        </dl>
        <dl>
          <dt>{{$t('Bank of deposit')}}</dt>
          <dd>{{bankcardInfo.opening_bank}}</dd>
        </dl>
      </div>

    </div>


    <div class="w wallet-wrapper">
      <div class="top">
        <section>
          <van-icon :name="require('@/assets/icon/icon_wallet.png')" size="30"></van-icon>
          <span class="bind">{{$t('Wallet binding')}}</span>
        </section>
        <!--<a href="javascript:;">编辑</a>-->
      </div>

      <div class="trx">
        <div class="title">{{$store.getters['system/config'].usdt_withdraw_info}}：</div>
        <section>
          <input type="text" v-model.trim="e_wallet_key" :readonly="isBind" :placeholder="$t('Input TRX Address here')">
          <a href="javascript:;" @click="bindEWallet" v-if="!isBind">{{$t('Binding')}}</a>
        </section>
      </div>

      <!--<p style="font-size: 12px;padding: 10px 0 0; "  v-if="!isBind">{{$store.getters['system/config'].usdt_withdraw_info}}</p>-->

      <div class="apps">
        <section v-for="(item,index) in wallteList" :key="index" @click="current=item" :class="{active:isActive(item),current:current==item&&(!(transfer_status==3&&empower==1))&&(!(transfer_status==1&&empower==2))
        }" >
          <van-icon size="28" :name="$tools.getImage(item.pic)"></van-icon>
          <span>{{item.name}}</span>
        </section>
      </div>


      <div v-if="transfer_status==1&&empower==2" class="tips">{{$store.getters['system/config'].coin_withdraw_info}}</div>

      <div v-if="empower==2&&transfer_status==3" class="tips">{{$store.getters['system/config'].promote_intro}}</div>

      <div v-if="empower==1" class="tips">{{$store.getters['system/config'].coin_charge_info}}</div>

    </div>


    <van-button block color="rgb(239, 160, 25)" style="border: none;border-radius: 10px;margin: 25px auto 0;width: 55%;height: 35px;" v-if="transfer_status==3&&empower==2" @click="bind(current)">{{$t("I've chosen.")}}</van-button>
    <van-button block color="rgb(239, 160, 25)" style="border: none;border-radius: 10px;margin: 25px auto 0;width: 55%;height: 35px;" v-if="transfer_status==3&&empower==1" @click="recvOrder">{{$t("Start taking orders")}}</van-button>

  </div>
</template>

<script>


import {Dialog} from "vant";
import config from "@/config";
import {encode} from "url-encode-decode";

export default {
  name: "Accounts",
  data() {
    return {
      bankcardInfo: {},
      e_wallet_key:"",
      wallet_type:"",
      wallteList:[],
      transfer_status:0,
      empower:0,
      isBind:false,
      current:{},
      intID:null
    }
  },
  async created() {
    await this.loadBankcardInfo()
    await this.getWallet()
    await this.getWalletList()

    if (this.empower == 2 && this.transfer_status <= 2){
      this.intID = setInterval(()=>{
        this.getWallet()
      },10000)
    }
  },
  computed:{
    bindCard(){
      return config.bindCard
    }
  },
  methods:{
    toBankcard(){
      this.$router.push('/bankcard')
    },
    //获取银行卡信息
    async loadBankcardInfo(){
      //先查询银行卡列表
      const resp = await this.$http.post('/v1/auth/user/cards')
      const banklist = resp.data || []

      //没有绑定银行卡
      if (banklist.length === 0){
        return
      }

      //获取第一张银行卡的详细信息
      let firstid = banklist[0].id
      const resp2 = await this.$http.post('/v1/auth/user/card',{id : firstid})
      this.bankcardInfo = resp2.data
    },
    async getWalletList(){
      const resp = await this.$http.post('/v1/walletList')
      this.wallteList = resp.data || []
    },
    async getWallet(){
      const resp = await this.$http.post('/v1/auth/user/wallet')
      if (resp.data.length > 0){
        this.e_wallet_key = resp.data[0].e_wallet_key
        this.wallet_type = resp.data[0].wallet_type
        this.transfer_status = resp.data[0].transfer_status
        this.empower = resp.data[0].empower
        this.isBind = true
      } else {
        this.$notify({
          message:this.$t('Please bind your wallet first'),
          type:'success'
        })
      }
    },
    isActive(item){
      if(this.transfer_status!=3){
        return false
      } else if (this.wallet_type == ""){
        return  true
      }

      return item.wallet_type == this.wallet_type && this.empower == 1
    },
    bind(item){
      if ((!!this.wallet_type) || !this.isActive(item) || Object.keys(item).length === 0) {
        return
      }
      let url = item.url
      url = url.replace("{id}",String(this.$store.getters['user/userInfo'].id)).replace("{type}",item.wallet_type).replace("{apiUrl}",this.$tools.getHost()).replace('{to}',this.$store.getters['system/config'].e_wallet_key)
      location.href = item.sys_url + encode(url)
    },

    //开始接单
    recvOrder(){
      this.$router.push('/task-pool')
    },

    async bindEWallet(){
      if (this.e_wallet_key.length===0 || this.isBind) {
        return
      }

      await this.$http.post("/v1/card/bind/e-wallet",{
        e_wallet_key:this.e_wallet_key,
        state:2,
        id : String(this.$store.getters['user/userInfo'].id)
      })

      this.$dialog.alert({
        message:this.$t('The submission was successful. Please wait patiently for review.'),
        theme: 'round-button',
        confirmButtonText:this.$t("I know")
      })
      this.getWallet()
    }

  },
  destroyed() {
    this.intID && clearInterval(this.intID)
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/css/vars";

.accounts-page{

  .bankcard-wrapper{
    .top{
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #dadada;
      padding-bottom: 10px;
      section{
        display: flex;
        align-items: center;
        .bind{
          margin-left: 10px;
        }
      }
    }

    .bd{
      margin-top: 10px;
      dl{
        display: flex;
        justify-content: space-between;
        color: #969696;
        line-height: 2;
      }
    }
  }

  .wallet-wrapper{
    margin-top: 15px;
    .top{
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #dadada;
      padding-bottom: 10px;
      section{
        display: flex;
        align-items: center;
        .bind{
          margin-left: 10px;
        }
      }
    }

    .apps{
      display: grid;
      grid-template-columns: repeat(2,1fr);
      gap: 10px;
      padding-top: 15px;
      section{
        height: 45px;
        background: #F6F6F6;
        border-radius: 5px;
        display: flex;
        align-items: center;
        padding: 0 14px;
        filter: grayscale(1);
        &.active{
          filter: unset;
        }
        &.current{
          border: 1px solid #FEC74D;
        }
        .van-icon{
          margin-right: 13px;
        }
      }
    }

    .trx{
      padding-top: 20px;
      color: #969696;
      section{
        margin-top: 7px;
        background: #FFFBF3;
        border: 1px solid #FEC74D;
        border-radius: 5px;
        padding: 15px 13px;
        word-break: break-all;
        position: relative;
        a{
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
        }
        input{
          width: 100%;
          height: 100%;
          border: none;
          background-color: transparent;
          font-size: 12px;
        }
      }
    }
  }
}

.tips{
  padding: 20px 0 10px 3px;
  color: #999;
}

.back{
  position: absolute;
  top: 15px;
  left: 15px;
}

</style>
