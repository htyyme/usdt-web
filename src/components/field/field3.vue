<template>
  <div class="field">
    <label>
      <span class="tit">{{title}}：</span>
      <input :type="type" :placeholder="placeholder" @input="observerInput" v-bind="$attrs">
    </label>
  </div>
</template>

<script>
export default {
  name: "field3",
  props:{
    type:{
      type:String,
      default:'text'
    },
    placeholder:{
      type:String,
    },
    title:{
      type:String,
      required:true
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
  margin: 10px 14px;
  label{
    .tit{
      font-size: 17px;
      font-weight: 700;
      display: block;
    }
    input{
      border: none;
      width: 100%;
      height: 50px;
      background-color: #F6F2FC;
      border-radius: 60px;
      padding-left: 25px;
      margin-top: 6px;
      font-size: 14px;
      &::placeholder{
        color: #999;
      }
    }
  }

}
</style>
