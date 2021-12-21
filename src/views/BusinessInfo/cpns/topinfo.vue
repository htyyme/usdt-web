<template>
  <div class="topinfo">
    <dl>
      <dt>{{sell_num | moneyFormat(5,'usdt')}}</dt>
      <dd>{{$t('Quantity sold')}}</dd>
    </dl>

    <dl>
      <dt>{{sell_price | moneyFormat(2,'coin')}}</dt>
      <dd>{{$t('Amount sold')}}</dd>
    </dl>
  </div>
</template>

<script>
import {SET_SHOP_COUNT_DATA} from "@/utils/events";

export default {
  name: "topinfo",
  data(){
    return {
      sell_num: 0,
      sell_price: 0
    }
  },
  created() {
    this.$bus.$on(SET_SHOP_COUNT_DATA , this.setdata)
  },
  methods:{
    setdata(payload){

      this.sell_num = payload.sell_num
      this.sell_price = payload.sell_price
    }
  },
  destroyed() {
    this.$bus.$off(SET_SHOP_COUNT_DATA)
  }
}
</script>

<style scoped lang="scss">

.topinfo {
  width: 344px;
  height: 100px;
  background: linear-gradient( to top,#242EAC,#626AD9);
  border-radius: 11px 11px 0 0;
  margin: 13px 15px 0;

  display: flex;
  color: #fff;
  dl{
    flex: 1;
    text-align: center;
    margin-top: 30px;
    dt{
      margin-bottom: 10px;
    }
  }
}

</style>
