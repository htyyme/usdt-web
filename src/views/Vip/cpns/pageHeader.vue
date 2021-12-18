<template>
  <header>
    <van-icon :name="require('@/assets/icon/return.png')" size="25" class="return" @click="$router.back()"></van-icon>
    <van-icon :name="require('@/assets/icon/message.png')" size="25" class="message" @click="tomsgpage"></van-icon>
    <div class="pagetitle">{{$t('Luxury VIP privileges')}}</div>
    <van-image :src="curlvicon" class="level-icon" fit="contain"></van-image>

    <van-steps :active="active" active-color="#FEDF72" >
      <van-step v-for="(item,index) in viplist" :key="index">LV.{{index+1}}</van-step>
    </van-steps>

    <span class="cnt">Invite members:{{$store.getters['user/coinAccount'].limit_buy}}</span>
  </header>
</template>

<script>
import {getLvIcon} from "@/utils/tools";

export default {
  name: "pageHeader",
  props:{
    viplist:Array
  },
  data(){
    return {
      active:-1
    }
  },
  computed:{
    //当前的等级
    curlv(){
      return this.$store.getters['user/userInfo'].lv_id
    },
    //当前等级的图标
    curlvicon(){
      return getLvIcon(this.curlv)
    }
  },
  mounted() {
    //当前激活的步骤 = 当前等级 - 1
    this.active = this.curlv - 1
  },
  methods:{
    tomsgpage(){
      this.$router.push({
        name:'MsgList'
      })
    }
  },
  watch:{
    curlv(){
      //当前激活的步骤 = 当前等级 - 1
      this.active = this.curlv - 1
    }
  }
}
</script>

<style scoped lang="scss">

header {
  height: 308px;
  background: url(~assets/img/vip-headerbg.png) no-repeat;
  background-size: 100vw;
  position: relative;
  .return{
    position: absolute;
    top: 12px;
    left: 15px;
  }
  .message{
    position: absolute;
    top: 12px;
    right: 18px;
  }
  .pagetitle{
    padding-top: 12px;
    text-align: center;
    color: #fff;

  }
  .level-icon{
    width: 91px;
    height: 91px;
    position: absolute;
    top: 55px;
    left: 50%;
    transform: translateX(-50%);

  }
  .van-steps{
    background-color: transparent;
    position: absolute;
    top: 135px;
    left: 50%;
    transform: translateX(-50%);
    width: 85%;

  }

  .cnt{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 20px;
    font-weight: 700;
    font-size: 16px;
  }
}

</style>
