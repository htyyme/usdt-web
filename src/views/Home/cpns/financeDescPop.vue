<template>

  <van-popup v-model="show" get-container="#app" >

    <div class="content" v-html="shop_description">

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
  computed:{
    shop_description(){
      return this.$store.getters['system/config'].shop_description
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
    font-family: "Courier";

  }

  .close{

    display: block;
    margin:15px auto 0 ;
    text-align: center;
  }

}

</style>
