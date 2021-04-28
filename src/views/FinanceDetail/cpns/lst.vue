<template>
  <div class="lst">
    <van-empty v-if="list.length===0"></van-empty>

    <van-list class="list" v-model="loading" :finished="finished" :finished-text="$t('No more')" @load="loadData">
      <div class="list-item" v-for="item in list" :key="item.id">

        <div class="amount color-green" v-if="item.amount>=0">+{{item.amount }}</div>
        <div class="amount color-orange" v-else>{{item.amount }}</div>


        <div class="type color-gray"> {{item.op_type | traTypeFormat}}</div>
        <div class="orderNo">{{item.created_at |dateFormat}}</div>


      </div>
    </van-list>


  </div>
</template>

<script>
export default {
  name: "lst",
  props:{
    cointype:String
  },
  data(){
    return {
      queryInfo:{
        page:0,
        pageSize:30,
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
        const r = await this.$http.post('/v1/auth/user/records', {
          ...this.queryInfo,
          coin_type:this.cointype==='coin'?1:2
        })
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
.color-green{
  color: #40C167 !important;
}

.color-orange{
  color: #FFBF5E;
}

.color-gray{
  color: #999;
}

.lst{
  .list{
    .list-item{
      height: 55px;
      padding: 6px 15px;
      border-bottom: 1px solid #DCDCDC;
      position: relative;
      font-size: 13px;
      display: flex;
      align-items: center;
      .amount{
        width: 20%;
      }
      .orderNo{
        width: 40%;
      }
      .type{
        flex: 1;
      }
    }
  }
}
</style>