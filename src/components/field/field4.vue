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
  name: "field4",
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
        return '#fff'
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

<!--suppress CssUnknownTarget -->
<style lang="scss" scoped>
@import "~assets/css/vars";
.field {
  display: flex;
  align-items: center;
  width: 100%;
  height: 58px;
  position: relative;
  background-color: rgba(255,255,255,.58);
  border-radius: 30px;
  margin: 30px 0;
  padding-right: 25px;

  .left {
    margin-left: 25px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    color: $mainColor;
    font-size: 13px;
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
    right: 22px;
    top: 50%;
    transform: translateY(-50%);
  }

  input {
    border: none;
    flex: 1;
    margin-left: 15px;
    font-size: 14px;
    background-color: transparent;


    &::placeholder {
      color: #EFEFEF;
    }
  }


}
</style>
