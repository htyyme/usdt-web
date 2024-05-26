<template>
  <div class="lottery-page">
    <!--头部-->
    <lotteryHeader :turntable="turntable"/>

    <!--我的金币-->
    <MyCoins v-if="islogin" class="MyCoins"/>

    <div class="big-wheel-box">
      <!--attributes.length>0判断是必须的-->
      <big-wheel
          v-if="attributes.length>0"
          width="300px"
          height="300px"
          ref="bigWheel"
          :prizeList="attributes"
          @over="over">
        <template v-slot:item="{ item }">
          <div class="prize-name">{{item.txt}}</div>
          <img class="prize-img" :src="item.img">
        </template>
      </big-wheel>

      <!-- 开始按钮 -->
      <img class="btn-go" @click="startDraw(1)" :src="require('@/assets/img/go.png')" />
    </div>

    <!--<div class="draw-options">-->
    <!--  <van-button :class="{active:continuousTimes==1}" @click="startDraw(1)">{{$t("single draw")}}</van-button>-->
    <!--  <van-button :class="{active:continuousTimes==5}" @click="startDraw(5)">{{$t("Five draws")}}</van-button>-->
    <!--</div>-->

    <!--中奖记录-->
    <records ref="recordsRef"/>

    <!--中奖弹窗-->
    <congrats ref="congratsRef"/>
  </div>
</template>

<script>
import lotteryHeader from "./cpns/lotteryHeader.vue";
import BigWheel from '@/components/BigWheel'
import congrats from "./cpns/congrats.vue";
// import request_noloading from "@/utils/request_noloading.js";
import request_noloading from "@/utils/request.js";
import records from "./cpns/records.vue";
import MyCoins from "./cpns/MyCoins.vue";
export default {
  name: "lottery",
  components:{
    MyCoins,
    BigWheel,
    congrats,
    lotteryHeader,
    records,
  },
  data() {
    return {
      valve: false, // 用于防止连续点击
      turntable:{},
      attributes:[],
      turnResult:{},//转盘结果
      turnResultList:[],
      continuousTimes:1,//连抽次数
    }
  },
  mounted() {
    this.$store.dispatch('user/loadUserInfo')
    this.getGame()
  },
  computed:{
    islogin(){
      return this.$store.getters['user/islogin']
    },
    id(){
      return (this.$route.query.id * 1 )|| 0
    }
  },
  methods: {
    //获取游戏
    async getGame(){
      const res = await this.$http.post("/v1/lucky/turntable",{id:this.id})
      this.turntable = res.data.turntable
      const attributes = res.data.attributes || []

      for (let i = 0; i < attributes.length; i++) {
        attributes[i]["txt"] = attributes[i]["prizeName"]
        attributes[i]["img"] = this.$tools.getImage(attributes[i]["prizePic"])
      }
      this.attributes=attributes
    },
    //抽奖
    startDraw(times){
      this.continuousTimes = times

      this.go()
    },

    // 开始转动
    go() {
      if (this.valve) {
        return
      }
      this.valve = true

      let url = ""
      if (this.continuousTimes === 1) {
        url = "/v1/auth/lucky/turntable/draw"
      } else if (this.continuousTimes === 5) {
        url = "/v1/auth/lucky/turntable/drawFive"
      }

      request_noloading({
        url:url,
        method:'post',
        data:{
          id:this.turntable.id
        }
      }).then((res)=>{
        console.log('res',res)
        if (res.code === 200){
          const results = res.data||[]
          this.turnResultList = results
          this.turnResult = results[results.length-1]
          let attribute_id = this.turnResult.attribute_id
          console.log('attribute_id',attribute_id)
          let index = this.attributes.findIndex(el => el.id === attribute_id)
          console.log('index',index)
          if (index === -1){
            console.log('err attribute_id',attribute_id)
          } else {
            // 转动转盘
            this.$refs.bigWheel.rotate(index)
          }
        }else{
          this.valve = false
        }
      }).catch(e=>{
        this.valve = false
      })



    },
    // 转盘转完事件
    async over(prizeInfo) {
      console.log("prizeInfo",prizeInfo)
      this.valve = false

      //刷新用户余额
      const res = await request_noloading({
        url:"/v1/auth/user",
        method:"post"
      })
      this.$store.commit('user/setUserInfo',res.data)

      //是否中奖
      let iswin = false
      for (let i = 0; i < this.turnResultList.length; i++) {
        if (this.turnResultList[i].is_win===1||this.turnResultList[i].is_win===3) {
          iswin = true
          break
        }
      }


      if (!iswin){
        //未中奖
        this.$jconfirm(this.$t('Sorry, you did not win this lottery'),this.turnResult.reward_name,{isShowCancelBtn:false})
      } else{
        //中奖
        this.$refs.congratsRef.handleOpen(prizeInfo,this.turnResult,this.turnResultList)
      }

      //刷新中奖列表
      if (this.$refs.recordsRef){
        this.$refs.recordsRef.reloadlist()
      }

    }
  },
}
</script>

<style scoped lang="scss">
$tabbarheight: 50px;
//$navbarheight: 44px;
.lottery-page {
  position: relative;
  overflow: hidden;
  width: 100vw;
  //min-height: 100vh;
  min-height: calc(100vh - #{$tabbarheight} );
  background: #5a0668 url('~assets/img/wheel_bg2.jpg');
  //background: linear-gradient(to bottom,#be205a,#5a0668);
  //background: #5a0668;
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100%;
  .big-wheel-box {
    position: absolute;
    top: 230px;
    left: 50%;
    transform: translateX(-50%);
    //position: relative;
    //z-index: 99;
    text-align: center;
    font-size: 0;
    background-image: url('~@/assets/img/disk_bg.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    padding: 22px;
    .prize-name {
      position: absolute;
      left: 13px;
      right: 13px;
      top: 20px;
      font-size: 13px;
      font-weight: 700;
      text-align: center;
      color: #7D2A00;
      //color: #3498db;
      //font-family: Arial;
    }
    .prize-img {
      position: absolute;
      top: 58px;
      left: 50%;
      transform: translateX(-50%);
      width: 30px;
      height: 30px;
    }
    .btn-go {
      position: absolute;
      //top: 115px;
      top: 38%;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
    }
  }

  .draw-options{
    margin-top: 385px;
    display: flex;
    justify-content: center;
    .van-button{
      height: 35px;
      border-radius: 17px;
      width: 140px;
      margin: 0 10px;
      font-size: 13px;
      &.active{
        color: #fff;
        background: linear-gradient(180deg,#0079ff 0%,#0079ff 100%);
        border: none;
      }
    }
  }
}



</style>
