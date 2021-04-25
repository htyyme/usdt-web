<template>
  <div class="pageHeader">

    <div class="wrapper">
      <dl>
        <dt>Remaining available assets</dt>
        <dd>123</dd>
      </dl>
      <dl>
        <dt>Remaining available assets</dt>
        <dd>123</dd>
      </dl>
    </div>

    <div class="tip">These data are provided by AWOOFFICIALY provider</div>
  </div>
</template>

<script>
export default {
  name: "pageHeader",
  props:{
    coincountdata:Object,
    usdtcountdata:Object,
  }
}
</script>

<style scoped lang="scss">
.pageHeader{
  .wrapper{
    display: flex;
    justify-content: space-between;
    padding: 20px 15px 0;
    dl{
      width: 168px;
      height: 92px;
      background: #FFFFFF;
      border-radius: 13px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 0 25px ;
      dt{
        color: #333;
        font-size: 15px;
        font-weight: 700;
      }
      dd{
        margin-top: 5px;
        font-size: 21px;
        color: #F97D1D;
        font-weight: 700;
      }
      &:nth-child(2)>dd{
        color: #3799E9;
      }
    }
  }

  .tip{
    background-color: #E5E5E5;
    height: 25px;
    text-align: center;
    line-height: 25px;
    color: #3799E9;
    font-size: 13px;
    margin-top: 13px;
  }


}

</style>