<template>
  <div class="paidSuccess">
    <h2>{{statusText}}</h2>
    <van-button :type="type" size="small" block @click="handleclick">{{$t('Back To Home')}}</van-button>
  </div>
</template>

<script>
export default {
  name: "success",
  computed:{
    status(){
      if (this.$route.query.status){
        return this.$route.query.status
      } else{
        return 0
      }
    },
    statusText(){
      if (this.status==1){
        return this.$t('Paid successfully')
      }else{
        return this.$t('Paid failed')
      }
    },
    type(){
      if (this.status==1){
        return "primary"
      }else{
        return "danger"
      }
    },
    three_service_address(){
      return this.$store.getters['system/config'].three_service_address
    }
  },
  methods:{
    handleclick(){
      if (this.three_service_address.length>0){
        this.$router.replace({name:'Home'})
      } else {
        this.$router.replace({name:'Mall'})
      }
    }
  }
}
</script>

<style scoped lang="scss">

.paidSuccess{
  padding-top: 30px;
  h2{
    text-align: center;
    font-size: 20px;
    font-weight: 400;
    color: #666;
    margin: 15vh 0 10vh 0;
  }

  .van-button{
    width: 30vw;
    margin: 0 auto;
  }
}
</style>
