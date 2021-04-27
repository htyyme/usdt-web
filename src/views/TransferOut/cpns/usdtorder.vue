<template>
  <div>
    <van-empty v-if="list.length===0"></van-empty>

    <van-list class="list" v-model="loading" :finished="finished" :finished-text="$t('No more')" @load="loadData">
      <div class="recorditem" v-for="(item,index) in list" :key="index">
        <div class="line">
          <span>{{$t('productType')}}:</span>
          <span>{{$t('oneDay')}} +{{item.usdt_interest_rate | rateFormat}} [{{$t('set')}}] {{item.hold_cycle}} {{$t('days')}}</span>
        </div>

        <div class="line">
          <span>{{$t('depositAmount')}}:</span>
          <span>{{item.exp_amount }}</span>
        </div>

        <div class="line">
          <span>{{$t('expectedReturn')}}:</span>
          <span>{{ getExpectedReturn(item)   }}</span>
        </div>

        <div class="time">
          <span>{{$t('depositTime')}}:</span>
          <span>{{item.buy_time | dateFormat }}</span>
        </div>
        <div class="time">
          <span>{{$t('completeTime')}}:</span>
          <span>{{item.expire | dateFormat}}</span>
        </div>

        <!--提前取出-->
        <van-button class="takeout" v-if="canTakeout(item)" @click="takeOut(item)">{{$t('takeOut')}}</van-button>
        <!--到期取出  -->
        <van-button class="Extracted" v-else-if="canExtract(item)" @click="extract(item)">{{$t('Extracted')}}</van-button>


      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  name: "usdtorder",
  data(){
    return {
      queryInfo:{
        page:0,
        pageSize:20,
        coin_type:2
      },
      list: [],
      loading: false,
      finished: false,
    }
  },
  methods:{
    async loadData(){
      this.queryInfo.page++
      try {
        const resp = await this.$http.post('/v1/auth/finance/record', this.queryInfo)
        const {list,total} = resp.data
        this.list = this.list.concat(list || [])
        this.loading = false;
        if (this.list.length >= total) {
          this.finished = true
        }
      } catch (e) {
        this.loading = false;
        this.finished = true
      }
    },
    getExpectedReturn(item ){
      return item.exp_amount * item.usdt_interest_rate * item.hold_cycle + item.exp_amount
    },
    //判断能否提前取出
    canTakeout(item){
      let ransom_time = item.ransom_time //取出时间
      if (ransom_time > 0){
        //已经取出过
        return false
      }

      let now = Math.floor(new Date().getTime() / 1000)
      let expire = item.expire
      if (now < expire) {
        return true
      } else {
        return false
      }
    },
    //判断能否到期取出
    canExtract(item){
      let ransom_time = item.ransom_time //取出时间
      if (ransom_time > 0){
        //已经取出过
        return false
      }
      let now = Math.floor(new Date().getTime() / 1000)
      let expire = item.expire
      if (now > expire){
        return true
      }else{
        return false
      }
    },
    //提前取出
    async takeOut(item){
      let msg = this.$t('Are you sure to withdraw the balance? No interest will be calculated for unexpired withdrawal! And deduct handling charges')
      let confirmRes =await this.$dialog.confirm({
        message:msg ,
        confirmButtonText:this.$t('Confirm'),
        cancelButtonText:this.$t('cancel'),
      }).catch(e=>e)

      if (confirmRes !== 'confirm'){
        return
      }
      const resp = await this.$http.post('/v1/auth/finance/reedem',{id : item.oid})

      if (resp.code === 200){
        this.$toast.success({
          message:this.$t('success'),
          onClose:()=>{
            this.list = []
            this.loading = false
            this.finished = false
            this.queryInfo.page = 0
            this.loadData()
          }
        })
      }
    },
    //到期取出
    async extract(item){
      let msg = this.$t('Are you sure to withdraw the balance? ')
      let confirmRes =await this.$dialog.confirm({
        message:msg ,
        confirmButtonText:this.$t('Confirm'),
        cancelButtonText:this.$t('cancel'),
      }).catch(e=>e)

      if (confirmRes !== 'confirm'){
        return
      }
      const resp = await this.$http.post('/v1/auth/finance/reedem',{id : item.oid})

      if (resp.code === 200){
        this.$toast.success({
          message:this.$t('success'),
          onClose:()=>{
            this.list = []
            this.loading = false
            this.finished = false
            this.queryInfo.page = 0
            this.loadData()
          }
        })
      }
    },

  }
}
</script>

<!--suppress CssUnknownTarget -->
<style scoped lang="scss">
@import "@/assets/css/vars.scss";
.list {
  padding-bottom: 12px;

  .recorditem {
    box-sizing: border-box;
    width: 345px;
    height: 135px;
    background: #FFFFFF;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.06);
    border-radius: 12px;
    margin: 10px auto;
    padding: 12px;
    position: relative;

    .line {
      font-size: 14px;
      color: #333;
      margin-bottom: 4px;

      span:nth-child(2) {
        color: $mainColor;
        margin-left: 5px;
      }
    }

    .time {
      font-size: 12px;
      color: #999;
      margin-bottom: 4px;

      span:nth-child(2) {
        margin-left: 5px;
      }
    }

    .takeout {
      box-sizing: border-box;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right:25px;
      height: 25px;
      background: #3596E8;
      border-radius: 28px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 12px;


    }

    .Extracted {
      box-sizing: border-box;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 25px;
      height: 25px;
      background: green;
      border-radius: 28px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 12px;
    }

    .Completed {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 25px;
      height: 25px;
      color: green;
      font-size: 13px;
    }

    .Cancle {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 25px;
      height: 25px;
      color: orange;
      font-size: 13px;
    }
  }
}

.hand-fee {
  color: $mainColor;
  text-align: center;
  margin-top: 7px;
}
</style>