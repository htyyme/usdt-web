<template>
  <van-overlay :show="show" z-index="999" class-name="collar" >
    <van-image class="collar-img" :src="require('@/assets/img/collar.gif')">
      <em>{{amount | moneyFormat}}</em>
      <span class="collar-btn" @click="handleClose"></span>
    </van-image>
  </van-overlay>
</template>

<script>
export default {
  name: "collar",
  data() {
    return {
      show: false,
      // isOne: true,
      // order: {}
      amount:0
    }
  },
  created() {
    // this.$bus.$on('show-collar', this.handleOpen)
    // this.$bus.$on('close-collar', this.handleClose)
  },
  computed:{
    // totalMoney(){
    //   if(this.isOne){
    //     return this.order.BonusNumber
    //   }else{
    //     return this.order.reduce((preVal, current) => preVal + current.BonusNumber, 0)
    //   }
    // }
  },
  methods: {
    handleOpen(payload) {
      this.show = true
      // const {isOne, order} = payload
      // this.isOne = isOne
      // this.order = order
      this.amount = payload.amount
    },
    handleClose() {
      this.show = false
      // this.$bus.$emit('reload-earnings-list')
    },

  },
  destroyed() {
    // this.$bus.$off('show-collar')
    // this.$bus.$off('close-collar')
  }
}
</script>

<style scoped lang="scss">
.collar {
  .collar-img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 375px;
    height: 503px;

    .collar-btn {
      position: absolute;
      width: 155px;
      height: 50px;
      bottom: 42px;
      left: 50%;
      transform: translateX(-50%);
    }

    em{
      color: #000;
      font-size: 22px;
      font-weight: 700;
      position: absolute;
      bottom: 140px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}

</style>
