<template>
  <div class="mission">
    <div class="item" v-for="item in list" :key="item.id" @click="toDetailPage(item)">
      <van-image :src="item.show_pic" ></van-image>

      <div class="overlay">
        <span class="activity_name">{{item.activity_name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'mission',
  data(){
    return {
      list:[]
    }
  },
  created() {
    this.loaddata()
  },
  methods:{
    async loaddata(){
      const resp = await this.$http.post('/v1/activity/queryActivityList')
      this.list = resp.data || []
    },



    toDetailPage(item){
      if (item.activity_type == 1){
        this.$router.push({
          name:'InviteTask'
        })
      } else {
        this.$router.push({
          name:'ActivityDetail',
          query:{
            id:item.id
          }
        })
      }

    }
  }
}
</script>

<!--suppress CssUnknownTarget -->
<style scoped lang="scss">
@import "@/assets/css/vars.scss";

.mission{
  padding: 10px;
  .item{
    width: 9.2rem;
    height: 5.01333rem;
    border-radius: 0.26667rem;
    overflow: hidden;
    margin: 0 auto 0.4rem;
    position: relative;
    .van-image{
      width: 100%;
      height: 100%;
    }
    .overlay{
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 30px;
      overflow: hidden;
      .activity_name{
        position: relative;
        height: 100%;
        z-index: 1;
        display: flex;
        align-items: center;
        font-size: 14px;
        padding-left: 20px;
        color: #fff;
        font-weight: 700;
        background-color: rgba(0,0,0,.3);
      }
      &::after{
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: -30px;
        background-color: rgba(255,255,255,1);
        filter: blur(80px);
      }
    }
  }
}


</style>