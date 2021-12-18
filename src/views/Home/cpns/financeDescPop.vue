<template>

  <van-popup v-model="show" get-container="#app" >

    <div class="content">
      什么是质押收益
    </div>

    <van-icon name="close" class="close" @click="handleClose" color="#fff" size="23"/>
  </van-popup>

</template>

<script>
export default {
  name: "financeDescPop",
  data() {
    return {
      show: false
    }
  },
  methods:{
    handleOpen(){
      this.show = true
    },
    handleClose(){
      this.show = false
    }
  }
}
</script>

<style scoped lang="scss">

.van-popup{

  background-color: transparent;

  .content{
    width: 345px;
    padding: 15px;
    border-radius: 10px;
    font-size: 13px;
    line-height: 1.3;
    background-color: #fff;
  }

  .close{

    display: block;
    margin:15px auto 0 ;
    text-align: center;
  }

}

</style>
