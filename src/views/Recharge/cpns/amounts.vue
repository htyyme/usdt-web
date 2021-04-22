<template>
  <div class="amounts">
    <div class="title">Recharge amount</div>

    <ul>
      <li>100₹</li>
      <li class="active">100₹</li>
      <li>100₹</li>
      <li>100₹</li>
      <li>100₹</li>
      <li>100₹</li>
      <li>100₹</li>
      <li>100₹</li>
    </ul>
  </div>
</template>

<script>
export default {
name: "amounts"
}
</script>

<style scoped lang="scss">
.amounts{
  background-color: #fff;
  margin: 10px 15px;
  padding: 13px 15px 5px;
  border-radius: 13px;
  .title{
    font-size: 17px;
    color: #333;
    font-weight: 700;
  }
  ul{
    padding: 11px 9px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li{
      width: 140px;
      height: 50px;
      background-color: rgba(53, 193, 255, 0.2);
      border-radius: 13px;
      margin-bottom: 13px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 21px;
      color: #1D6FDF;
      font-weight: 700;
      &.active{
        background-color: #3596E8;
        color: #fff;
      }
    }
  }
}

</style>