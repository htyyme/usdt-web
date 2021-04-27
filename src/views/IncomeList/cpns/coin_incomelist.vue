<template>
  <div class="incomeList">


    <van-empty v-if="list.length === 0"/>
    <van-list v-model="loading" :finished="finished" :finished-text="$t('No more')" @load="loadData">
      <div v-for="(item,index) in list" :key="index" class="list-item">
        <div class="nickname">{{item.nickname}}</div>
        <div class="amount">{{item.amount}}</div>
        <div class="dt">{{item.op_time | dateFormat}}</div>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
name: "coin_incomelist",
  data(){
    return {
      queryInfo:{
        page:0,
        pageSize:30,
        coin_type:1
      },
      list: [],
      loading: false,
      finished: false,
    }
  },

  methods:{
    async loadData(){
      this.queryInfo.page++
      try {
        const r = await this.$http.post('/v1/auth/team/list', this.queryInfo)
        const {list, total} = r.data
        this.list = this.list.concat(list || [])
        this.loading = false;
        if (this.list.length >= total) {
          this.finished = true
        }
      } catch (e) {
        this.loading = false;
        this.finished = true
      }
    }
  }
}
</script>

<style scoped lang="scss">
.list-item{
  display: flex;
  height: 45px;
  border-bottom: 1px solid #ccc;
  align-items: center;
  padding: 0 14px;
  font-size: 13px;
  .nickname{
    width: 35%;
    color: orange;
  }
  .amount{
    flex: 1;
    color: green;
  }
  .dt{
    width: 40%;
    color: #999;
    font-size: 12px;
  }
}
</style>