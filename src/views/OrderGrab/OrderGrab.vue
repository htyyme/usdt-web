<template>
  <div class="OrderGrab">
    <pageHeader />

  </div>
</template>

<script>
import pageHeader from "./cpns/pageHeader";
export default {
  name: "OrderGrab",
  components:{
    pageHeader
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


</style>