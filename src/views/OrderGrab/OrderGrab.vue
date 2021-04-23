<template>
  <div class="OrderGrab">
    <pageHeader />
    <product />
    <instructions />
  </div>
</template>

<script>
import pageHeader from "./cpns/pageHeader";
import product from "./cpns/product";
import instructions from "./cpns/instructions";
export default {
  name: "OrderGrab",
  components:{
    pageHeader,
    product,
    instructions
  },
  data(){
    return {
      cointype:'',
      id:""
    }
  },
  created() {
    const {id,cointype} = this.$route.query
    this.id = Number(id)
    this.cointype = cointype
    if (!this.id || (this.cointype !=='coin' && this.cointype !=='usdt')){
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="scss">

.OrderGrab{
  min-height: 100vh;
  background-color: #f4f4f4;
  padding-bottom: 20px;
}
</style>