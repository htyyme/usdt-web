<template>
  <div class="field">
    <div class="left" :style="{backgroundColor:leftIconBgc}">
      <template v-if="leftIcon">
        <van-icon class="left-icon" :name="leftIcon"></van-icon>
      </template>
      <slot name="left"></slot>
      <div class="right">
        <slot name="right"></slot>
      </div>

    </div>
    <input :type="type" :placeholder="placeholder" @input="observerInput" v-bind="$attrs" :readonly="readonly">

  </div>
</template>

<script>
import vars from "@/assets/css/vars.scss";

export default {
  name: "field",
  // props:['leftIcon','placeholder','type'],
  props:{
    leftIcon:{},
    placeholder:{},
    type:{},
    readonly:{
      type:Boolean,
      default:false
    }
  },
  computed:{
    mainColor() {
      return vars.mainColor
    },
    leftIconBgc(){
      if(this.leftIcon){
        return 'transparent'
      }else{
        return this.mainColor
      }
    }

  },

  methods:{
    observerInput(el){
      this.$emit('input', el.target.value)
    }
  }
}
</script>

<style scoped lang="scss">
.field {
  display: flex;
  align-items: center;
  width: 100%;
  height: 79px;
  font-family: PingFang SC;
  position: relative;

  .left {
    margin-left: 25px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    //background-color: #23B95F;
    color: #fff;
    font-size: 13px;
    font-family: Cambria;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    .left-icon{
      font-size: 32px;
    }
  }
  .right{
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    //background-color: red;
  }

  input {
    border: none;
    flex: 1;
    margin-left: 15px;
    font-size: 14px;

    &::placeholder {
      color: #d1d1d1;
    }
  }

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: #CCCCCC;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
