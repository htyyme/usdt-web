<template>
  <van-list
      v-model="loading"
      :finished="finished"
      :finished-text="$t('No more')"
      @load="loadData"
  >

    <section class="sale-item" v-for="(item,index) in list" :key="item.id" @click="handleClick(item)">

      <header>
        <div class="user">
          <canvas class="avatar" ref="avatar"></canvas>
          <span class="username">{{item.goods_name}}</span>
        </div>
        <!--<div class="nums">-->
        <!--  <span>成单量2278</span>-->
        <!--  <span>89%</span>-->
        <!--</div>-->
      </header>

      <div class="bd">
        <div class="line">
          <section>{{$t('number')}} {{item.goods_amount}} USDT</section>
          <section>{{$t('price')}}</section>
        </div>

        <div class="line">
          <section>{{$t('Quota')}} 1 USDT - {{item.num}} USDT</section>
          <section class="price">{{item.fee}}</section>
        </div>
      </div>

      <!--我要买-->
      <template v-if="cpnType==1 && item.visible">
        <div class="nums-wrap">
          <div style="display: flex;align-items: center">
            <van-button size="mini" plain class="num-ctrl" @click="item.nums > 1 && item.nums--">-</van-button>
            <input type="number" v-model.number="item.nums">
            <van-button size="mini" plain class="num-ctrl" @click="item.nums++">+</van-button>
          </div>

          <van-button color="#41AAED" size="mini" round class="purchase" :loading="$store.getters['system/gloading']" @click="purchase(item)">{{$t('Confirm the purchase')}}</van-button>
        </div>
      </template>


      <!--我要卖-->
      <template v-if="cpnType==2">
        <div class="options">
          <van-button color="#41AAED" size="mini" round class="purchase" :loading="$store.getters['system/gloading']" @click="toSallDetail(item,index)">{{$t('Sales detail')}}</van-button>
          <van-button color="#41AAED" size="mini" round class="purchase" :loading="$store.getters['system/gloading']" @click="recallGoods(item,index)">{{$t('revocation')}}</van-button>
        </div>
      </template>

    </section>



  </van-list>

</template>

<script>
export default {
  name: "vanlistcpn",
  props:{
    cpnType:Number
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      queryInfo:{
        tp:8,
        page:0,
        pageSize:20
      }
    };
  },
  computed:{
    member_id(){
      return this.$store.getters['user/userInfo'].id
    }
  },
  created() {

  },
  methods:{
    async loadData(){
      this.queryInfo.page++
      const queryInfo = {...this.queryInfo}
      if (this.cpnType == 2){
        queryInfo.member_id = this.member_id
      }
      const resp = await this.$http.post('/v1/auth/ustd/list',queryInfo)
      const {list,total} = resp.data
      this.list = this.list.concat(list || [])
      this.loading = false
      if (this.list.length >= total){
        this.finished = true
      }

      this.list.forEach(el=>{
        this.$set(el,'nums',1)
        this.$set(el,'visible',false)
      })

      //加载完毕 渲染头像
      this.$nextTick(() => {
        if (this.list.length > 0) {
          this.$refs.avatar.forEach((el, index) => {
            this.$tools.createFontAvatar(el, this.list[index]['goods_name'], 22, 22)
          })
        }
      })
    },

    handleClick(item){
      //我要买
      if (this.cpnType === 1){
        this.list.forEach(el=>{
          this.$set(el,'visible',false)
        })
        this.$set(item,'visible',!item.visible)
      }
    },

    async purchase(item){
      if (isNaN(item.nums) || item.nums <= 0){
        return
      }

      const formData = {
        nums:Number(item.nums),
        id : item.id
      }

      const resp = await this.$http.post('/v1/auth/ustd/buy',formData)
      const { amount,order_type,order_id,state } = resp.data
      if (state === 1){
        this.$notify({
          message:this.$t('Purchase success'),
          type:'success'
        })
      } else if (state === 2){
        this.$router.push({
          name:'Recharge',
          query:{
            cointype:'coin',
            amount,
            order_type,
            order_id,
          }
        })
      } else {
        this.$notify({
          message:this.$t('Purchase fail'),
          type:'danger'
        })
      }
    },

    //撤回
    async recallGoods(item,index){
      const resp = await this.$http.post('/v1/auth/ustd/recallGoods',{id:item.id})
      this.list.splice(index,1)
    },

    toSallDetail(item){
      this.$router.push({
        name:'UsdtPurchaseOrder',
        query:{
          id:item.id ,
          tp:2
        }
      })
    }

  }
}
</script>

<style scoped lang="scss">

.van-list{
  height: calc(100vh - 145px - 45px);
  overflow: auto;

  .sale-item{
    //height: 113px;
    border-bottom: 1px solid #E7EBEE;
    padding: 17px 14px 10px;
    header{
      display: flex;
      justify-content: space-between;
      .user{
        font-size: 13px;
        display: flex;
        align-items: center;
        .avatar{
          width: 22px;
          height: 22px;
          //background: #0066ED;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 10px;
          }
      }
      .nums{
        font-size: 12px;
        color: #868995;
        display: flex;
        span{
          padding: 0 7px;
          position: relative;
          &:first-child{
            &::after{
              content: "";
              width: 1px;
              height: 60%;
              background-color: #868995;
              position: absolute;
              right: 0;
              top: 50%;
              transform: translateY(-70%);
            }
          }
        }
      }
    }

    .bd{
      padding: 10px 0;
      .line{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        color: #868995;
        padding: 3px 0;
        .price{
          color: #41AAED;
          font-size: 18px;
          font-weight: 700;
        }
      }
    }


  }
}

.nums-wrap{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  input{
    width: 60px;
    border: 1px solid #ccc;
    margin: 0 10px;
    text-align: center;
    height: 24px;
    font-size: 13px;
  }
  .num-ctrl{
    width: 24px;
    height: 24px;
  }
  .purchase{
    padding: 0 10px;
    margin-left: 15px;
  }

}

.options{
  display: flex;
  justify-content: flex-end;
  .van-button{
    padding: 0 15px;
  }
}
</style>
