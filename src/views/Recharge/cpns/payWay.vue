<template>
  <div class="payWay">
    <div class="title">Pay way</div>

      <ul>
        <li :style="{color:getColor('paytm upi')}">paytm upi</li>
        <li :style="{color:getColor('bolt')}">bolt</li>
        <li :style="{color:getColor('paytm upi')}">paytm upi</li>
        <li :style="{color:getColor('bolt')}">bolt</li>
        <li :style="{color:getColor('paytm upi')}">paytm upi</li>
        <li :style="{color:getColor('bolt')}">bolt</li>
        <li :style="{color:getColor('paytm upi')}">paytm upi</li>
        <li :style="{color:getColor('bolt')}">bolt</li>
      </ul>

  </div>

</template>

<script>
import {getColorByText} from "@/utils/tools";

export default {
  name: "payWay",
  methods:{
    getColor(text){
      return getColorByText(text)
    }
  }
}
</script>

<style scoped lang="scss">
.payWay{
  border: 1px solid #FFFFFF;
  background: linear-gradient(181deg, #98DEF8 0%, #7ED7FA 31%, #75D4FB 54%, #35C1FF 100%);
  border-radius: 13px;
  margin: 10px 15px 0;
  padding: 10px 18px;

  .title{
    font-size: 17px;
    color: #333;
    font-weight: 700;
    margin-bottom: 11px;
  }
  ul{
    display: flex;
    flex-wrap: wrap;
    li{
      width: 93px;
      height: 45px;
      background-color: #f5f5f5;
      font-family: imbplex;
      font-size: 15px;
      padding: 4px 20px;
      font-weight: 700;
      border-radius: 7px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-transform: uppercase;
      margin-right: 12px;
      margin-bottom: 8px;
      text-align: center;
      &:nth-child(3n){
        margin-right: 0;
      }
    }
  }
}

</style>