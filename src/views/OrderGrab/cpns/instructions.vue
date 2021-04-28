<template>
  <div class="instructions">
      <div class="title">{{$t('InstructionsForUse')}}</div>

      <p>1: {{$t('InstructionsForUseLine1',{num:max_grab})}}</p>
      <p>2: {{$t('InstructionsForUseLine2')}}</p>

  </div>
</template>

<script>
export default {
  name: "instructions",
  computed:{
    max_grab(){
      return this.$store.getters['system/config'].max_grab
    }
  }
}
</script>

<style scoped lang="scss">
.instructions{
  width: 345px;
  //height: 120px;
  background: #FFFFFF;
  border-radius: 13px;
  margin: 0 auto;
  padding: 10px 17px;
  .title{
    font-size: 17px;
    color: #1D6FDF;
    font-weight: 700;
    margin-bottom: 5px;
  }
  p{
    font-size: 13px;
    color: #666;
    line-height: 1.5;
  }
}

</style>