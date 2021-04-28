<template>
  <div>
    <van-empty v-if="list.length===0"></van-empty>

    <van-list v-model="loading" :finished="finished"  finished-text="No more" @load="loadData">

      <div class="list-item" v-for="item in list" :key="item.id">
        <div class="hd">
          <div>
            <p><em>{{item.info.price | moneyFormat}}</em> <span>/{{$t('Unit Price')}}</span></p>
            <p>number {{item.info.sum}} USDT</p>
            <p>time {{item.start_time | dateFormat}}</p>
          </div>
          <div>{{sellPercent(item)}}</div>
        </div>


        <div class="ft" v-if="type==1 || type==2">
          <van-button round  block class="stop" v-if="type==1" @click="handleStop(item)" >{{$t('Stop')}}</van-button>
          <van-button round plain   block class="resume" v-if="type==2" @click="handleResume(item)">{{$t('Resume')}}</van-button>
        </div>

      </div>

    </van-list>
  </div>
</template>

<script>
import {
  USDT_RELOAD_ONSALELIST,
  USDT_RELOAD_SUSPENDLIST
} from "@/utils/events";

export default {
  name: "list",
  props:{
    type:Number
  },
  data(){
    return {
      list:[],
      loading:false,
      finished:false,
      queryInfo:{
        page:0,
        pageSize:20
      }
    }
  },
  created() {
    // this.loadData()
    if (this.type === 1){
      this.$bus.$on(USDT_RELOAD_ONSALELIST, this.reloaddata)
    }
    if (this.type === 2){
      this.$bus.$on(USDT_RELOAD_SUSPENDLIST, this.reloaddata)
    }
  },
  methods:{
    //重新加载数据
    reloaddata(){
      this.list = []
      this.loading = false
      this.finished = false
      this.queryInfo.page = 0
      // this.loadData()
    },
    async loadData(){
      this.queryInfo.page++
      const resp = await this.$http.post('/v1/auth/user/ustd',{
        ...this.queryInfo,
        tp : this.type
      })
      const {list,total} = resp.data
      list.forEach(el => el.info = JSON.parse(el.extra2))
      this.list = this.list.concat(list || [])
      this.loading = false
      if (this.list.length >= total){
        this.finished = true
      }
    },
    sellPercent(item){
      let {sell,sum} = item.info
      let n = sell / sum * 100
      return n.toFixed(2) + '%'
    },
    //暂停
    async handleStop(item){
      const confirmres = await this.$dialog.confirm({
        message:this.$t('Are you sure want to stop this item')
      }).catch(err=>err)
      if (confirmres !== 'confirm'){
        return
      }
      const resp = await this.$http.post('/v1/auth/ustd/sell/stop',{id : item.id})
      this.$toast.success({
        message:this.$t('success'),
        onClose: () => {
          this.reloaddata()
          this.$bus.$emit(USDT_RELOAD_SUSPENDLIST)
        }
      })
    },
    //恢复
    async handleResume(item){
      const confirmres = await this.$dialog.confirm({
        message:this.$t('Are you sure want to resume this item')
      }).catch(err=>err)
      if (confirmres !== 'confirm'){
        return
      }
      const resp = await this.$http.post('/v1/auth/ustd/sell/resume',{id : item.id})
      this.$toast.success({
        message:this.$t('success'),
        onClose: () => {
          this.reloaddata()
          this.$bus.$emit(USDT_RELOAD_ONSALELIST)
        }
      })
    }
  },
  destroyed() {
    this.$bus.$off(USDT_RELOAD_ONSALELIST)
    this.$bus.$off(USDT_RELOAD_SUSPENDLIST)
  }
}
</script>

<style scoped lang="scss">

.van-list{
  padding: 15px 10px;
  .list-item{
    border: .02667rem solid #ddd;
    border-radius: .21333rem;
    background-color: #fff;
    margin-bottom: .26667rem;
    font-size: .32rem;
    .hd{
      border-bottom: .02667rem solid #ddd;
      padding: .4rem;
      font-size: .32rem;
      color: #555;
      display: flex;
      justify-content: space-between;
      align-items: center;
      p{
        padding: 3px 0;
      }
      em{
        font-size: .42667rem;
        font-weight: 700;
      }
      .buy{
        border-radius: 1.33333rem;
        padding: 0 .96rem;
        color: #fff;
        background-color: #18b385;
        font-size: .42667rem;
        line-height: .96rem;
      }
    }
    .ft{
      height: 50px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-right: 15px;
      .stop {
        width: 25%;
        height: 35px;
        margin-left: 10px;
        background: linear-gradient(to bottom,#53C8F4,#2378E1);
        color: #fff;
      }
      .resume{
        width: 25%;
        height: 35px;
        margin-left: 10px;
        border-color: #2378E1;
        color: #2378E1;
        border-width: 2px;
        //background: linear-gradient(to bottom,#53C8F4,#2378E1);
        //color: #fff;
      }
    }
  }
}

</style>