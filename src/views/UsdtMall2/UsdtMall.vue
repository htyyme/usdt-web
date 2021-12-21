<template>
  <div class="usdtmall-page">

    <header>
      <div class="inner">
        <section>
          <nav :class="{active:routeName=='UsdtMall2_purchaselist'}" @click="toPurchaselist">我要买</nav>
          <nav :class="{active:routeName=='UsdtMall2_salelist'}" @click="toSalelist">我要卖</nav>
        </section>

        <section class="right-xsec">
          <van-image :src="require('@/assets/icon/icon_records.png')" width="19" height="19"></van-image>
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
        { text: '交易设置', icon:require('@/assets/icon/shoukuan.png') },
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

    selectOption(action,index){
      console.log(action,index)
    }

  }
}

</script>

<style scoped lang="scss">
  .usdtmall-page{
    header{
      height: 145px;
      background: #0852C4;
      color: #fff;
      display: flex;
      align-items: flex-end;
      padding: 14px;
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
