<template>
  <div class="MsgDetail">
    <navbar :title="$t('Message Detail')"></navbar>

    <div class="inner">
      <div class="title">{{currentmsg.title}}</div>

      <div class="content">{{currentmsg.content}}</div>

      <div class="time">{{currentmsg.send_time | dateFormat}}</div>
    </div>

  </div>
</template>

<script>
export default {
  name: "MsgDetail",
  computed:{
    currentmsg(){
      return this.$store.getters['msg/currentmsg']
    }
  }
}
</script>

<style scoped lang="scss">
.MsgDetail{
  min-height: 100vh;
  background-color: #f4f4f4;
  padding: 15px 20px;

  .inner{
    background-color: #fff;
    border-radius: 10px;
    padding: 10px;
    font-size: 14px;

    .title{
      text-align: center;
      font-size: 15px;
      font-weight: 700;

    }

    .content{
      padding: 10px 0;

    }

    .time{
      text-align: right;
      padding-right: 10px;
      font-size: 13px;
      color: #666;
    }
  }
}

</style>