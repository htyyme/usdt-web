<template>

  <div class="Mission">
    <navbar :title="$t('Mission')"></navbar>

    <div class="header">
      <span>{{$t('Total People')}}：{{invitation_count}}</span>
      <em @click="toInvitePage">{{$t('To invite friends')}}</em>
    </div>

    <ul class="lst">
      <li v-for="(item,index) in config_list" :key="index">
        <div class="index">{{index+1}}</div>
        <div class="content">
          <div class="tit">{{$t('Invited')}} {{item.need_invitation_size}} {{$t('valid member')}}</div>
          <div class="info">{{$t('Task reward')}}:{{item.reward_amount | moneyFormat}}</div>
          <div class="prog">
            <div class="prog-text">{{item.invitation_size}}/{{item.need_invitation_size}}</div>
            <van-progress :percentage="getPercent(item)" :show-pivot="false" stroke-width="7"/>
          </div>
        </div>


        <!--可领取-->
        <div class="receive " v-if="item.state==1"  @click="receive(item)">{{$t('Receive')}}</div>
        <!--已领取-->
        <div class="receive finish" v-if="item.state==2">{{$t('finish')}}</div>
        <!--不可领取-->
        <div class="receive ok" v-if="item.state==3" >{{$t('Receive')}}</div>
      </li>

    </ul>
  </div>


</template>

<script>
import vars from "@/assets/css/vars.scss";

export default {
  name: "InviteTask",
  computed: {
    mainColor() {
      return vars.mainColor
    }
  },
  data(){
    return {
      activity_id:0,
      invitation_count:0,
      config_list:[]
    }
  },
  created() {
    this.queryTaskList()
  },
  methods:{
    toInvitePage(){
      this.$router.push({
        name:'ReferralLink'
      })
    },
    async queryTaskList() {
      const r = await this.$http.post('/v1/auth/activity/invitationActivity')
      const {activity_id , config_list , invitation_count} = r.data
      this.invitation_count = invitation_count
      this.activity_id = activity_id
      this.config_list = config_list || []
    },
    getPercent(t) {
      return t.invitation_size / t.need_invitation_size * 100
    },
    async receive(t) {
      const formData = {
        config_id : t.config_id,
        activity_id:this.activity_id
      }
      const resp = await this.$http.post('/v1/auth/activity/invitationActivityAward',formData)
      this.$toast.success({
        message: this.$t('Received the amount') + ' : '+ resp.data,
        onClose:()=>{
          this.queryTaskList()
        }
      })
    }
  }
}
</script>

<!--suppress CssUnknownTarget -->
<style lang="scss" scoped>
@import "~assets/css/vars";
.Mission{
  padding: 15px;
  //background-color: #121325;
  min-height: 100vh;
  .header{
    font-size: 18px;
    font-weight: 700;
    color: orange;
    display: flex;
    justify-content: space-between;
    em{
      //font-size: 13px;
      font-weight: 400;
      margin-top: 3px;
    }
  }

  .lst{
    li{
      margin: 12px 0;
      width: 100%;
      height: 65px;
      background: #FFFFFF;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      padding: 0 5px 0 10px;

      display: flex;
      align-items: center;
      .index{
        width: 35px;
        height: 35px;
        background: $mainColor;
        border-radius: 10px;
        text-align: center;

        font-size: 25px;
        font-family: PingFang SC;
        font-weight: 800;
        line-height: 35px;
        color: #FFFFFF;
      }
      .receive{
        margin-right: 5px;
        width: 55px;
        height: 55px;
        border-radius: 50%;
        border: 2px solid #CF182C;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        background-color: #CF182C;
        padding: 1px;
        background-clip: content-box;
        color: #fff;
        text-transform: capitalize;
        &.ok{
          background-color: #A1A1A1;
          border-color: #A1A1A1;

        }
        &.finish{
          background-color: green;
          border-color: green;
        }
      }
      .content{
        flex: 1;
        font-size: 12px;
        padding-left: 10px;
        line-height: 1.5;
        position: relative;
        .tit{
          color: #121325;
        }
        .info{
          color: #97B9F5;
          font-weight: 700;
        }
        .prog{
          position: absolute;
          width: 60px;
          top: 50%;
          right: 10px;
          transform: translateY(-50%);
          .prog-text{
            margin-bottom: 3px;
            text-align: center;
            color: #121325;
          }
        }
      }
    }
  }
}
</style>