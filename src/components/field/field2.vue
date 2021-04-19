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
    <input :type="type" :placeholder="placeholder" @input="observerInput" v-bind="$attrs">

  </div>
</template>

<script>
export default {
  name: "field2",
  props:['leftIcon','placeholder','type'],
  computed:{
    leftIconBgc(){
      if(this.leftIcon){
        return 'transparent'
      }else{
        return '#23B95F'
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
  height: 65px;
  font-family: PingFang SC;
  position: relative;

  .left {
    margin-left: 25px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    color: #fff;
    font-size: 13px;
    font-family: Cambria;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    .left-icon{
      font-size: 28px;
    }
  }
  .right{
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
  }

  input {
    border: none;
    margin-left: 15px;
    font-size: 14px;
    background-color: #f6f6f6;
    height: 50px;
    width: 270px;
    border-radius: 15px;
    padding-left: 20px;

    &::placeholder {
      color: #d1d1d1;
      font-family: Nunito;
    }
  }
}
</style>
