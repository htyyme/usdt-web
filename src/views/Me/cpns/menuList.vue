<template>
  <div class="menuList">
    <ul>
      <li @click="toVipPage">
        <van-icon :name="require('@/assets/icon/membersystem.png')" size="40"></van-icon>
        <span>{{$t('memberSystem')}}</span>
        <van-icon :name="require('@/assets/icon/more.png')" class="more"></van-icon>
      </li>

      <li @click="toBankCardPage">
        <van-icon :name="require('@/assets/icon/bankcard.png')" size="40"></van-icon>
        <span>{{$t('Bank card')}}</span>
        <van-icon :name="require('@/assets/icon/more.png')" class="more"></van-icon>
      </li>

      <li @click="toWithdrawRecordPage">
        <van-icon :name="require('@/assets/icon/withdrawrecord.png')" size="40"></van-icon>
        <span>{{$t('Withdraw record')}}</span>
        <van-icon :name="require('@/assets/icon/more.png')" class="more"></van-icon>
      </li>

      <li>
        <van-icon :name="require('@/assets/icon/rechargerecord.png')" size="40"></van-icon>
        <span>{{$t('rechargeRecord')}}</span>
        <van-icon :name="require('@/assets/icon/more.png')" class="more"></van-icon>
      </li>

      <li @click="toPersonInfoPage">
        <van-icon :name="require('@/assets/icon/personalinfomation.png')" size="40"></van-icon>
        <span>{{$t('Personal information')}}</span>
        <van-icon :name="require('@/assets/icon/more.png')" class="more"></van-icon>
      </li>

      <li>
        <van-icon :name="require('@/assets/icon/Businessinfo.png')" size="40"></van-icon>
        <span>{{$t('Business information')}}</span>
        <van-icon :name="require('@/assets/icon/more.png')" class="more"></van-icon>
      </li>

      <li @click="toAboutPage">
        <van-icon :name="require('@/assets/icon/aboutus.png')" size="40"></van-icon>
        <span>{{$t('About us')}}</span>
        <van-icon :name="require('@/assets/icon/more.png')" class="more"></van-icon>
      </li>

      <li @click="signOut">
        <van-icon :name="require('@/assets/icon/signout.png')" size="40"></van-icon>
        <span>{{$t('signOut')}}</span>
        <van-icon :name="require('@/assets/icon/more.png')" class="more"></van-icon>
      </li>

    </ul>
  </div>
</template>

<script>
export default {
  name: "menuList",
  methods:{
    toVipPage(){
      this.$router.push({
        name:'Vip'
      })
    },
    toPersonInfoPage(){
      this.$router.push({
        name:'Setting'
      })
    },
    toBankCardPage(){
      this.$router.push({
        name:'bankCard'
      })
    },
    toAboutPage(){
      this.$router.push({
        name:'About'
      })
    },
    toWithdrawRecordPage(){
      this.$router.push({
        name:'WithdrawRecord'
      })
    },
    async signOut(){
      const confirmres = await this.$dialog.confirm({
        message: this.$t('Do you want to logout?'),
        confirmButtonText:this.$t('Confirm'),
        cancelButtonText:this.$t('Cancel')
      }).catch(err=>err)
      if (confirmres !== 'confirm') return
      this.$store.commit('user/setToken','')
      this.$store.commit('system/setBanners1',[])
      this.$router.replace({name:'Login'})
    }
  }
}
</script>

<style scoped lang="scss">
.menuList{
  background-color: #fff;
  padding: 0 20px 10px;

  ul{
    li{
      font-size: 14px;
      color: #333;
      display: flex;
      align-items: center;
      padding: 15px 0 0;
      font-weight: 700;
      position: relative;
      span{
        padding-left: 15px;
      }
      .more{
        position: absolute;
        right: 0;
      }
    }
  }

}

</style>