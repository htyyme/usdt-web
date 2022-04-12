<template>
  <van-overlay :show="show" z-index="999" class-name="collar" >
    <van-image class="collar-img" :src="require('@/assets/img/11.gif')">
      <!--<em>{{amount | moneyFormat}}</em>-->
      <!--<span class="collar-btn" @click="handleClose"></span>-->
    </van-image>


    <em class="amount">{{coin_type == 1 ? $t('coin') : 'U' }}{{amount}}</em>

    <span class="collar-btn" @click="handleClose" >Collect</span>
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
      amount:0,
      coin_type:""
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
      this.coin_type = payload.coin_type
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
  width: 100vw;
  height: 100vh;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;
  .collar-img {
    width: 250px;
    //position: absolute;
    //top: 30%;
    //left: 50%;
    //transform: translateX(-50%);
    //width: 375px;
    //height: 503px;

    //.collar-btn {
    //  position: absolute;
    //  width: 155px;
    //  height: 50px;
    //  bottom: 42px;
    //  left: 50%;
    //  transform: translateX(-50%);
    //}
    //
    //em{
    //  color: #000;
    //  font-size: 22px;
    //  font-weight: 700;
    //  position: absolute;
    //  bottom: 30px;
    //  left: 50%;
    //  transform: translateX(-50%);
    //}
  }
  .amount{
    font-weight: 700;
    font-size: 20px;
    color: yellow;
  }

  .collar-btn {
    //width: 155px;
    //height: 50px;
    //background-color: yellow;
    color: #fff;
    font-size: 22px;
    font-weight: 700;
    margin-top: 25px;
    -webkit-box-reflect: below 20px linear-gradient(transparent,rgba(255,255,255,0.3));
    padding: 8px 25px;
    //border: 1px solid #fff;
    border-radius: 10px;
    box-shadow: 1px 2px 2px 2px rgba(255,255,255,.8);
    overflow: hidden;

  }
}

</style>
