<template>
  <div>
    <listItem v-for="item in list" :key="item.id" :order="item" @collectFinish="collectFinish"/>

  </div>
</template>

<script>
import listItem from "@/views/Order/cpns/listItem.vue";
export default {
  name: "presentOrders",
  components:{
    listItem
  },
  data(){
    return {
      list:[],
      queryInfo: {
        page: 1,
        pageSize: 2,
        tp: 10,
        present_type:2
      }
    }
  },
  mounted() {
    this.getOrders()
  },
  methods:{
    async getOrders(){
      const res = await this.$http.post('/v1/auth/business/match/record',this.queryInfo)
      this.list = (res.data.list || []).filter(item => {
         return (item.buy_time - item.bonus_time )/3600 / 24 < item.buy_result
      })
    },
    collectFinish(order){
      const index = this.list.findIndex(el => el.id == order.id)
      this.$set(this.list,index,order)

      this.$store.dispatch('user/loadUserInfo')

    }
  }
}
</script>

<style scoped>

</style>
