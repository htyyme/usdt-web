<template>
  <div class="OrderGrab">
    <pageHeader :cointype="cointype" :count-data="countData"/>
    <product :goodsinfo="goodsinfo" :attr="attr" :cointype="cointype"/>
    <instructions />
    <!--抢单倒计时-->
    <grabbing :cointype="cointype" :goodsinfo="goodsinfo" :attr="attr"/>
    <!--抢单详情-->
    <grabOrderDetails />
    <!--购买成功-->
    <purchaseSuccess />
  </div>
</template>

<script>
import pageHeader from "./cpns/pageHeader";
import product from "./cpns/product";
import instructions from "./cpns/instructions";
import grabbing from "./cpns/grabbing";
import grabOrderDetails from "./cpns/grabOrderDetails";
import purchaseSuccess from "./cpns/purchaseSuccess";
import {PURCHASE_GRAB_SUCCESS} from "@/utils/events";

export default {
  name: "OrderGrab",
  components:{
    pageHeader,
    product,
    instructions,
    grabbing,
    grabOrderDetails,
    purchaseSuccess
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

    this.$bus.$on(PURCHASE_GRAB_SUCCESS , this.queryCountData)
  },
  methods:{
    //获取统计数据
    async queryCountData(){
      const resp = await this.$http.post('/v1/auth/user/shuadan/income')
      const countdata =  resp.data[this.cointype]
      this.countData.teamtodayearn = countdata.teamtodayearn
      this.countData.teamyesterdayearn = countdata.teamyesterdayearn
      this.countData.todayearn = countdata.todayearn
      this.countData.todayorder = countdata.todayorder
      this.countData.yesterdayearn = countdata.yesterdayearn

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