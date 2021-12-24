<template>
  <div class="usdtmall-page">

    <header>
      <div class="back" @click="$router.push('/Usdt')"></div>

      <div class="inner">
        <section>
          <nav :class="{active:routeName=='UsdtMall2_purchaselist'}" @click="toPurchaselist">我要买</nav>
          <nav :class="{active:routeName=='UsdtMall2_salelist'}" @click="toSalelist">我要卖</nav>
        </section>

        <section class="right-xsec">
          <van-image :src="require('@/assets/icon/icon_records.png')" width="19" height="19" @click="toRecords"></van-image>
          <!--<van-image :src="require('@/assets/icon/icon_more.png')" width="19" height="6"></van-image>-->

          <van-popover v-model="showPopover" trigger="click" :actions="actions"  placement="left-start" @select="selectOption">
            <template #reference>
              <van-image :src="require('@/assets/icon/icon_more.png')" width="19" height="6"></van-image>
            </template>
          </van-popover>
        </section>
      </div>

    </header>

    <router-view></router-view>




  </div>
</template>

<script>

export default  {
  data() {
    return {
      showPopover: false,
      actions: [
        { text: '收款方式管理', icon: require('@/assets/icon/transactioncenter.png') },
        { text: '发布订单', icon:require('@/assets/icon/shoukuan.png') },
        { text: '帮助中心', icon:require('@/assets/icon/helpcenter.png') },
      ],
    };
  },

  computed:{
    routeName(){
      return this.$route.name
    }
  },
  methods:{
    toSalelist(){
      if (this.$route.path !== '/UsdtMall2/salelist'){
        this.$router.push('/UsdtMall2/salelist')
      }

    },
    toPurchaselist(){
      if (this.$route.path !== "/UsdtMall2/purchaselist"){
        this.$router.push('/UsdtMall2/purchaselist')
      }

    },

    toRecords(){
      this.$router.push('/UsdtPurchaseOrder')
    },

    selectOption(action,index){
      console.log(action,index)
      if (index === 1){
        //发布订单
        this.$router.push({
          name:'UsdtSell'
        })
      }
    }

  }
}

</script>

<style scoped lang="scss">
  .usdtmall-page{
    header{
      height: 145px;
      background: linear-gradient( to top,#242EAC,#626AD9);
      color: #fff;
      display: flex;
      align-items: flex-end;
      padding: 14px;
      position: relative;
      .back{
        position: absolute;
        width: 15px;
        height: 15px;
        border-top: 3px solid #fff;
        border-left: 3px solid #fff;
        left: 20px;
        top: 20px;
        transform: rotate(-45deg);
      }
      .inner{
        width: 100%;
        display: flex;
        justify-content: space-between;
        section{
          display: flex;
          align-items: flex-end;

          nav{
            font-size: 16px;
            margin-right: 14px;
            padding-bottom: 3px;
            &.active{
              font-size: 26px;
              padding-bottom: unset;
            }
          }

          .van-image{
            margin-right: 16px;

          }
        }

        .right-xsec{
          align-items: center;
          padding-top: 10px;
        }
      }
    }
  }



</style>
