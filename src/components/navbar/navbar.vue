<template>
  <van-nav-bar fixed :left-arrow="leftArrow" placeholder :title="title" @click-left="handleLeftClick" :right-text="rightText" @click-right="handleRightClick">
    <template #left v-if="leftArrow">
      <van-icon :name="require('@/assets/icon/return.png')" size="25"/>
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  name: "navbar",
  props: {
    title: {
      type: String
    },
    leftArrow: {
      type: Boolean,
      default: true
    },
    rightText:{
      type:String
    }
  },
  methods: {
    handleLeftClick() {
      this.$router.back()
    },
    handleRightClick(){
      this.$emit('handleRightClick')
    }
  }
}
</script>

<!--suppress CssUnknownTarget -->
<style scoped lang="scss">
@import "@/assets/css/vars.scss";

/deep/ .van-nav-bar {
  background: linear-gradient( to top,#242EAC,#626AD9);
  z-index: 9;

  .van-nav-bar__title {
    color: #fff;
    font-size: 16px;
    text-transform: capitalize;
  }
  .van-nav-bar__right{
    .van-nav-bar__text{
      color: #fff;
      font-size: 13px;
    }
  }
}
</style>
