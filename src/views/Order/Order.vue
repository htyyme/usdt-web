<template>
  <div class="Order">
    <navbar :title="$t('Order')" :leftArrow="false"></navbar>

    <van-empty v-if="list.length==0"></van-empty>

    <van-list class="list" v-model="loading" :finished="finished" :finished-text="$t('No more')" @load="loadData" :loading-text="$t('loading')">
      <listItem v-for="item in list" :key="item.id" :order="item" @collectFinish="collectFinish"/>
    </van-list>



  </div>
</template>

<script>
import listItem from "./cpns/listItem";

export default {
  components:{
    listItem
  },
  data(){
    return {
      loading: false,
      finished: false,
      list: [],
      queryInfo: {
        page: 0,
        pageSize: 30,
        tp: 10,
      }
    }
  },
  methods:{
    async loadData () {
      this.queryInfo.page++
      let resp = await this.$http.post('/v1/auth/business/match/record', {
        ...this.queryInfo,
      })
      const {list,total} = resp.data
      this.loading = false
      this.list = this.list.concat(list || [])
      if (this.list.length >= total){
        this.finished = true
      }
    },
    collectFinish(order){
      const index = this.list.findIndex(el => el.id == order.id)
      this.$set(this.list,index,order)

      this.$store.dispatch('user/loadUserInfo')

    }
  }
}

</script>

<style scoped lang="scss">
.Order{
  background: linear-gradient( to top,#242EAC,#626AD9);
  min-height: 100vh ;
}
</style>
