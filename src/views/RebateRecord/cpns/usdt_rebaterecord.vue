<template>
  <div>
    <van-empty v-if="list.length===0"></van-empty>

    <van-list class="wrapper" v-model="loading" :finished="finished" :finished-text="$t('No more')" @load="loadData">
      <div class="item" v-for="(item,index) in list" :key="index">
        <div class="name">{{itemName(item)}}</div>
        <div class="amount">{{item.amount | moneyFormat(2,'usdt')}}</div>
        <div class="date">{{item.created_at | dateFormat}}</div>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
name: "usdt_rebaterecord",
  data(){
    return {
      queryInfo:{
        page:0,
        pageSize:20,
        lv_id:Number(this.$route.query.lv_id),
        coin_type:2
      },
      list: [],
      loading: false,
      finished: false,
    }
  },
  computed:{
    itemName(item){
      return (item) => item.rebet[2]
    }
  },
  methods:{
    async loadData(){
      this.queryInfo.page++
      try {
        const r = await this.$http.post('/v1/auth/level/info', this.queryInfo)
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

.wrapper{
  .item{
    font-size: 14px;
    display: flex;
    padding: 15px 15px;
    border-bottom: 1px solid #ccc;
    .name{
      width: 30%;
    }
    .amount{
      width: 25%;
      color: green;
    }
    .date{
      text-align: right;
      color: #999;
      font-size: 13px;
    }
  }
}

</style>