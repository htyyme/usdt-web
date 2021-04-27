<template>
  <div class="Mission">
    <div class="title">
      <span>{{$t('totalPeople')}}:{{TotalNum}}</span>
      <a href="javascript:;" @click="$router.push({name:'teamIncomeList'})">{{$t('details')}}</a>
    </div>


    <template v-for="(item,index) in taskList">
      <div class="mession-item" :key="item.Id">
        <div class="index">{{index+1}}</div>
        <div class="info" style="display: flex;flex-direction: column;">
          <div class="name">{{taskTitle(item)}}</div>
          <div class="money">{{$t('taskReward')}}:{{$t('moneyPrefix')}}{{item.Reward}}</div>
        </div>
        <div class="progress-box" style="display: flex;flex-direction: column;">
          <div class="num">{{item.Progress}}/{{item.Target}}</div>
          <van-progress :percentage="getPercent(item)" :show-pivot="false"/>
        </div>

        <div v-if="item.Status === 0" class="button-border">
          <van-button>{{$t('receive')}}</van-button>
        </div>

        <div v-else-if="item.Status === 1" class="button-border okBtn">
          <van-button @click="receive(item)">{{$t('receive')}}</van-button>
        </div>

        <div v-else-if="item.Status === 2" class="finish-label">
          <label>{{$t('finish')}}</label>
        </div>
      </div>
    </template>


  </div>
</template>

<script>
export default {
  name: "Mission",
  data() {
    return {
      taskList: [],
      TotalNum: 0,
    }
  },
  components:{
  },
  mounted() {
    this.loadTaskList()

    this.$http.post('/v1/activity/queryActivityList')
    // this.$http.post('/v1/auth/activity/queryActivityDetails',{
    //   activity_id:29
    // })
  },
  methods:{
    async loadTaskList(){
      const r = await this.$http.post('/v1/api/promote/tasks')
      this.taskList = r.Body.PromoteTasks
      this.TotalNum = r.Body.TotalNum
    },
    taskTitle(t) {
      return `Invited ${t.Target} valid member`
    },
    getPercent(t) {
      return t.Progress / t.Target * 100
    },
    async receive(t) {
      try {
        const resp = await this.$http.post('/v1/api/promote/receive', {taskId: t.Id})
        this.loadTaskList()
      } catch (e) {
        console.log('err',e)
      }
    }
  }
}
</script>

<!--suppress CssUnknownTarget -->
<style scoped lang="scss">
@import "@/assets/css/vars.scss";

.Mission{
  background-color: #fff;
  padding: 20px 15px;
  .title{
    display: flex;
    justify-content: space-between;
    span{
      color: #F97D1D;
      font-size: 17px;
      font-weight: 700;
    }
    a{
      height: 30px;
      background: $mainColor;
      border-radius: 28px;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 20px;
    }
  }


  .mession-item {
    margin-top: 7px;
    width: 100%;
    height: 65px;
    background: #FFFFFF;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 0 5px 0 10px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    .index {
      width: 35px;
      height: 35px;
      background: #4083FD;
      border-radius: 10px;
      text-align: center;

      font-size: 25px;
      font-weight: 800;
      line-height: 35px;
      color: #FFFFFF;
    }

    .info {
      .name {
        font-size: 12px;
        font-weight: 800;
        line-height: 20px;
        color: #333333;
      }

      .money {
        font-size: 12px;
        font-weight: 800;
        line-height: 20px;
        color: #97B9F5;
      }
    }

    .progress-box {
      .num {
        text-align: center;
        font-size: 12px;
        font-weight: 800;
        line-height: 25px;
        color: #333333;
      }

      .van-progress {
        width: 50px;
        height: 10px;
        margin-top: 5px;
        border-radius: 5px;
        overflow: hidden;
      }
    }

    .button-border {
      height: 56px;
      width: 56px;
      border: 1px solid #C1C1C1;
      border-radius: 50%;
      padding: 2px;
      box-sizing: border-box;

      button {
        height: 100%;
        width: 100%;
        background: #BCBCBC;
        border-radius: 50%;
        padding: 0;

        text-align: center;
        line-height: 5px;
        font-size: 12px;
        font-weight: 800;
        color: #FFFFFF;
      }

    }

    .okBtn {
      border: 1px solid #CF182C;

      button {
        background: #CF182C;
      }
    }

    .finish-label {
      height: 56px;
      width: 56px;
      text-align: center;
      line-height: 50px;
      font-size: 12px;
      font-weight: 800;
      color: #2DE75D;
    }
  }
}

</style>