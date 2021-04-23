<template>
  <div class="OrderGrab">
    <pageHeader :cointype="cointype" :count-data="countData"/>
    <product :goodsinfo="goodsinfo" :attr="attr" :cointype="cointype"/>
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
      id:"",
      countData: {
        teamtodayearn: 0,
        teamyesterdayearn: 0,
        todayearn: 0,
        todayorder: 0,
        yesterdayearn: 0,
      },
      goodsinfo:{},
      attr:{}
    }
  },
  computed:{

  },
  created() {
    const {id,cointype} = this.$route.query
    this.id = Number(id)
    this.cointype = cointype
    if (!this.id || (this.cointype !=='coin' && this.cointype !=='usdt')){
      this.$router.back()
    }
    this.$store.dispatch('user/loadUserInfo')
    this.queryCountData()
    this.loadGoodsDetail()
  },
  methods:{
    //获取统计数据
    async queryCountData(){
      const resp = await this.$http.post('/v1/auth/user/shuadan/income')
      // console.log(resp)
      if (resp.data){
        let coin_type = 1
        if (this.cointype==='usdt'){
          coin_type = 2
        }
        resp.data.forEach(el => {
          if (el.coin_type == coin_type){
            this.countData.teamtodayearn = el.teamtodayearn
            this.countData.teamyesterdayearn = el.teamyesterdayearn
            this.countData.todayearn = el.todayearn
            this.countData.todayorder = el.todayorder
            this.countData.yesterdayearn = el.yesterdayearn
          }
        })

      }
    },
    //查询商品的详细信息
    async loadGoodsDetail(){
      const resp = await this.$http.post('/v1/business/match/detail',{
        id : this.id
      })
      // console.log(resp)
      const {items, match} = resp.data
      this.goodsinfo = match
      this.attr = items.find(el => el.title === this.cointype)
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