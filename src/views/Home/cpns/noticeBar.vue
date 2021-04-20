<template>
  <div class="noticeBar">
    <van-notice-bar
        left-icon="volume-o"
        :text="noticeText"
        background="#FFC543"
        color="#fff"
        :left-icon="require('@/assets/icon/horn.png')"
    />
    <footer></footer>
  </div>
</template>

<script>
export default {
  name: "noticeBar",
  computed: {
    noticeText() {
      return JSON.parse(this.$store.getters['system/config'].notice).join(" ")
    }
  },
}
</script>

<style scoped lang="scss">
.noticeBar {
  .van-notice-bar {
    height: 25px;
    z-index: 1;

  }

  footer {
    height: 10px;
    background-color: #f4f4f4;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      width: 25px;
      height: 25px;
      background-color: #F8B829;
      right: 0;
      bottom: 0;
      transform: translateY(-5px) rotate(-30deg);
    }

  }
}

</style>