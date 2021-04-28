<template>
  <div class="swiper-cpn">
    <van-swipe class="my-swipe" :autoplay="6000" indicator-color="white">
      <van-swipe-item v-for="item in banners" :key="item.id">
        <van-image :src="$tools.getImage(item.image_url)"></van-image>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "swiper",
  computed: {
    banners() {
      return this.$store.getters['system/banners1']
    }
  },
  created() {
    this.loadbanners()
  },
  methods: {
    loadbanners() {
      if (this.banners.length === 0) {
        this.$store.dispatch('system/loadBanners1')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.swiper-cpn {
  padding: 11px 0;

  .my-swipe {
    .van-swipe-item {
      margin: 0 auto;
      width: 345px !important;
      height: 200px;
      border-radius: 10px;
      overflow: hidden;

      .van-image {
        width: 100%;
        height: 100%;
      }
    }
  }
}

//指示器颜色
/deep/ .van-swipe__indicator--active {
  background-color: #1989fa !important;
}

</style>