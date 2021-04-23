<template>
  <div class="instructions">
      <div class="title">Instructions for use</div>

      <p>1: One account can grab 5 order per day</p>
      <p>2: The system is based on LBS technology, through the cloud automatic matching business</p>

  </div>
</template>

<script>
export default {
  name: "instructions"
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