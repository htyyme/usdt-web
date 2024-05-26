<template>
  <div class="JFormItem">
    <div class="label">
      <van-image :src="labelImg" class="leftimg" v-if="labelImg"></van-image>
      <span>{{label}}</span>
    </div>

    <div class="ipt">
      <span class="prefix" v-if="inputPrefix">{{inputPrefix}}</span>
      <input :type="inputType" :placeholder="placeholder" :readonly="isreadonly" :value="value" @input="input" autocomplete="off">
      <van-image v-if="inputRightImg" :src="inputRightImg" class="ipt-right-img" @click="clickRightImg"></van-image>

      <!--可插入按钮-->
      <slot></slot>
    </div>

  </div>
</template>

<script>
export default {
  name: "JFormItem",
  props:{
    labelImg:String,
    label:String,
    inputPrefix:String,
    placeholder:String,
    inputType:{
      type:String,
      default:"text"
    },
    inputRightImg:String,
    //双向绑定的值
    value:{
      type:String | Number,
      dafault:''
    },
    //是否只读
    isreadonly:{
      type:Boolean,
      default: false
    }
  },
  methods:{
    input(e){
      this.$emit('input',e.target.value)
    },
    //点击右侧图片触发
    clickRightImg(){
      console.log('clickRightImg()')
      this.$emit('clickRightImg')
    }
  }
}
</script>

<style scoped lang="scss">

.JFormItem{
  margin-bottom: 30px;


  .label{
    display: flex;
    align-items: center;
    .leftimg{
      width: 24px;
      height: 24px;
      margin: 0 6px 0 0;
    }
    span{
      //color: #fff;
    }
  }

  .ipt{
    width: 100%;
    height: 44px;
    //background: #fff;
    background: rgba(100,100,100,.1);
    border-bottom: 1px solid rgba(0,0,0,.2);
    //box-shadow: 0 0.05333rem 0.21333rem #d0d0ed5c;
    border-radius: 8px;
    overflow: hidden;
    margin-top: 12px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    .prefix{
      margin-right: 10px;
      color: #161823;
    }
    input{
      flex: 1;
      height: 100%;
      border: none;
      color: #161823;
      background: transparent;
    }
    .ipt-right-img{
      width: 21px;
      height: 21px;
    }
  }
}


</style>
