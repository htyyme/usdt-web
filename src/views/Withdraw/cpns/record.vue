<template>
  <div class="record" @click="toWithdrawRecordPage">
    <span>{{$t('Withdraw Record')}}</span>
    <van-icon :name="require('@/assets/icon/more.png')" size="12" class="more"></van-icon>
  </div>
</template>

<script>
export default {
  name: "record",
  methods:{
    toWithdrawRecordPage(){
      this.$router.push({
        name:'WithdrawRecord'
      })
    },
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/css/vars";
.record{
  margin: 15px 15px 0;
  padding: 18px;
  background-color: #fff;
  border-radius: 13px;
  color: $mainColor;
  font-size: 18px;
  font-weight: 700;
  position: relative;
  .more{
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
  }
}

</style>
