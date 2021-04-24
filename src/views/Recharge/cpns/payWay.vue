<template>
  <div class="payWay">
    <div class="title">Pay way</div>

      <ul>
        <li v-for="(item,index) in channellist"
            :key="index"
            :style="{color:getColor(item.payChannelName)}"
            :class="{active:item.channelCode===activeChannel.channelCode}"
            @click="chooseChannel(item)"
        >{{item.payChannelName}}</li>
      </ul>

  </div>

</template>

<script>
import {getColorByText} from "@/utils/tools";

export default {
  name: "payWay",
  props:{
    channellist:Array,
  },
  data(){
    return {
      activeChannel:{}
    }
  },
  mounted() {
    // this.$nextTick(()=>{
    //   //默认选择第一个通道
    //   if (this.channellist.length > 0){
    //     this.chooseChannel(this.channellist[0])
    //   }
    // })

  },
  methods:{
    getColor(text){
      return getColorByText(text)
    },
    //选择通道
    chooseChannel(item){
      this.activeChannel = item
      this.$emit('chooseChannel',item)
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
      //text-transform: uppercase;
      font-variant: small-caps;
      font-style: italic;
      margin-right: 12px;
      margin-bottom: 8px;
      text-align: center;
      &:nth-child(3n){
        margin-right: 0;
      }
      &.active{
        background-color: #3596E8;
        color: #fff !important;
      }
    }
  }
}

</style>