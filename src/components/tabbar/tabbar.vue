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

export default {
  name: "tabbar",
  data() {
    return {
      activeName: 'Home',
      tabbarList: [
        {
          name: 'Home',
          title: this.$t('tabBarHome'),
          icon: require('@/assets/tabbar/home.png'),
          activeIcon: require('@/assets/tabbar/home.blue.png'),
          url: '/Home'
        },
        {
          name: 'Order',
          title: this.$t('tabBarOrder'),
          icon: require('@/assets/tabbar/order.png'),
          activeIcon: require('@/assets/tabbar/order.blue.png'),
          url: '/Order'
        },


        {
          name: 'Usdt',
          title: this.$t('usdt'),
          icon: require('@/assets/tabbar/transhall.png'),
          activeIcon: require('@/assets/tabbar/transhall-active.png'),
          url: '/Usdt'
        },

        {
          name: 'Team',
          title: this.$t('tabBarTeam'),
          icon: require('@/assets/tabbar/team.png'),
          activeIcon: require('@/assets/tabbar/team.blue.png'),
          url: '/Team'
        },
        {
          name: 'Me',
          title: this.$t('tabBarMe'),
          icon: require('@/assets/tabbar/me.png'),
          activeIcon: require('@/assets/tabbar/me.blue.png'),
          url: '/Me'
        },
      ]
    };
  },
  created() {
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
