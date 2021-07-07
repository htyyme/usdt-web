<template>
  <div>
    <van-tabbar v-model="activeName" :active-color="mainColor" inactive-color="#000" placeholder :border="false">
      <van-tabbar-item replace v-for="(item,index) in tabbarList" :key="index" :name="item.name" :to="item.url">
        <template #icon>
          <van-icon :name="item.activeIcon" v-if="activeName==item.name"/>
          <van-icon :name="item.icon" v-else/>
        </template>
        <div>{{ item.title }}</div>
      </van-tabbar-item>
    </van-tabbar>
  </div>

</template>

<script>
import vars from "@/assets/css/vars.scss";
import tabbar_dev from "./tabbar_dev";
import tabbar_prod from "./tabbar_prod";

export default {
  name: "tabbar",
  data() {
    return {
      activeName: 'Home',
      tabbarList: []
    };
  },
  created() {
    let three_service_address = this.$store.getters['system/config'].three_service_address
    if (three_service_address.length===0) {
      this.tabbarList = tabbar_dev
    } else {
      this.tabbarList = tabbar_prod
    }


    this.activeName = this.$store.getters['system/tabbar']
  },
  computed: {
    mainColor() {
      return vars.mainColor
    }
  },

  methods: {

  }
}
</script>

<style scoped lang="scss">
/deep/ .van-tabbar {

  height: 49px;
  //background: linear-gradient(180deg, #FFFFFF 0%, #E9FFF5 100%);
  box-shadow: 0px -1px 4px rgba(61, 61, 61, 0.1);
  opacity: 1;
  border-radius: 10px 10px 0px 0px;
}

/deep/ .van-tabbar-item--active {
  background-color: transparent;
}

/deep/ .van-tabbar-item__icon {
  width: 22px;
  height: 22px;

  .van-icon {
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

/deep/ .van-tabbar-item__text {
  text-transform: capitalize;
}
</style>
