<template>
  <div class="RedEnvelope">
    <van-icon :name="require('@/assets/icon/return.png')" class="return" size="18" @click="$router.replace('/me')"></van-icon>

    <template v-if="detail.id!=0">
      <div class="amount">
        <div class="tit">{{$t('Amount')}}</div>
        <div class="val">{{sum | moneyFormat}}</div>
      </div>

      <div class="counter">
        <span>{{$t('Num')}}</span>
        <em>{{detail.surplus_size}}/{{detail.envelope_size}}</em>
        <span>{{$t('Bonus')}}</span>
        <em>{{$t('coin')}} {{detail.surplus_amount}}/{{detail.amount}}</em>
      </div>

      <div class="record">
        <div class="title">{{$t('red envelope record')}}</div>
        <van-empty v-if="list.length===0"></van-empty>
        <van-list class="list" v-model="loading" :finished="finished" finished-text="no more" @load="loadRecords">
          <div class="list-item" v-for="item in list" :key="item.id">
            <van-icon :name="require('@/assets/icon/user2.png')" size="40"></van-icon>
            <div class="nickname">{{item.PlayerName}}</div>
            <div class="date">{{item.draw_time | dateFormat}}</div>
            <div class="amount">{{item.amount | moneyFormat}}</div>
          </div>
        </van-list>
      </div>


      <template >
        <openRedEnvelope ref="openRedEnvelopeRef" :envelopeKey="key" @reloadList="reloadList"/>
      </template>

    </template>
  </div>
</template>

<script>
import openRedEnvelope from "./_cpns/openRedEnvelope";
export default {
  name: "RedEnvelope",
  components:{
    openRedEnvelope
  },
  data(){
    return {
      detail:{},
      sum:0,
      queryInfo:{
        page:0,
        pageSize:30,
        key:this.$route.query.key
      },
      list:[],
      loading:false,
      finished:false,
      total:0,
    }
  },
  async created() {
    await this.loadDetail()
    // await this.loadRecords()
  },
  computed:{
    key(){
      return this.$route.query.key
    }
  },
  methods:{
    /**
     * 查询红包详情
     * @returns {Promise<void>}
     */
    async loadDetail(){
      const resp = await this.$http.post('/v1/auth/redpack/detail',{key:this.key})
      // console.log(resp)
      const {detail,sum} = resp.data
      this.detail = detail
      this.sum = sum
      if (detail.id == 0){
        this.$toast.fail({
          message:'Envelope key is error',
          onClose:()=>this.$router.back()
        })
      }
    },
    /*
    * 查询领取记录
    * */
    async loadRecords(){
      this.queryInfo.page++
      try {
        const resp = await this.$http.post('/v1/auth/redpack/record',this.queryInfo)
        const {list,total} = resp.data
        this.list = this.list.concat(list || [])
        this.total = total
        this.loading = false;
        if (this.list.length >= total){
          this.finished = true
        }
      }catch (e) {
        // console.log('err',e)
        this.loading = false;
        this.finished = true
      }
    },
    reloadList(){
      this.loading = false
      this.finished = false
      this.list = []
      this.queryInfo.page = 0
      this.loadRecords()
      this.loadDetail()
    }
  }
}
</script>

<!--suppress CssUnknownTarget -->
<style lang="scss" scoped>
@import "~assets/css/vars";

.RedEnvelope{
  width: 100vw;
  height: 100vh;
  background-image: url(~assets/img/envelope_bg.png);
  background-size: 100vw ;
  background-repeat: no-repeat;
  background-position: top center;
  position: relative;
  .return{
    position: absolute;
    top: 10px;
    left: 15px;
  }
  .amount{
    position: absolute;
    top: 345px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    color: #fff;
    .tit{
      font-size: 18px;
      font-weight: 700;
      text-transform: uppercase;
    }

  }
  .counter{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 395px;
    color: $mainColor;
    background-color: #fff;
    padding: 5px 15px;
    border-radius: 14px;
    white-space: nowrap;
    em{
      margin: 0 5px;
    }
  }
  .record{
    position: absolute;
    width: 100%;
    top: 430px;
    left: 50%;
    transform: translateX(-50%);

    .title{
      text-transform: uppercase;
      color: $mainColor;
      text-align: center;
      font-weight: 700;
    }
    .list{
      .list-item{
        height: 70px;
        margin-left: 6px;
        border-bottom: 1px solid #000;
        position: relative;
        padding-left: 60px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .van-icon{
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 10px;
        }
        .nickname{
          color: #333;
          line-height: 1.4;
          font-size: 15px;
        }
        .date{
          color: #999;
          font-size: 14px;
        }
        .amount{
          position: absolute;
          color: $mainColor;
          top: 50%;
          right: 20px;
          transform: translateY(-50%);
          text-align: right;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
