<template>
  <div class="amounts">
    <div class="title">Recharge amount</div>

    <ul>


      <li v-for="(item,index) in amountList"
          :key="index"
          :class="{active:item===activeAmount}"
          @click="chooseAmount(item)">{{item | moneyFormat(0 , cointype)}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "amounts",
  props:{
    cointype:String
  },
  data(){
    return {
      activeAmount:0
    }
  },
  computed: {
    //充值金额列表
    amountList() {
      let charge_range = this.$store.getters['system/config'].charge_range
      return charge_range.split(',')
    },
  },
  created() {
    //默认选择第一个金额
    if (this.amountList.length > 0){
      this.chooseAmount(this.amountList[0])
    }
  },
  methods:{
    //选择金额
    chooseAmount(amount){
      this.activeAmount = amount
      this.$emit('chooseAmount',amount)
    }
  }
}
</script>

<style scoped lang="scss">
.amounts {
  background-color: #fff;
  margin: 10px 15px;
  padding: 13px 15px 5px;
  border-radius: 13px;

  .title {
    font-size: 17px;
    color: #333;
    font-weight: 700;
  }

  ul {
    padding: 11px 9px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    li {
      width: 140px;
      height: 50px;
      background-color: rgba(53, 193, 255, 0.2);
      border-radius: 13px;
      margin-bottom: 13px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 21px;
      color: #1D6FDF;
      font-weight: 700;

      &.active {
        background-color: #3596E8;
        color: #fff;
      }
    }
  }
}

</style>