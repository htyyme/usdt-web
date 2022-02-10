<template>
  <div>
    <van-empty v-if="list.length===0"></van-empty>

    <van-list v-model="loading" :finished="finished" finished-text="No more" @load="loadData">
      <div class="list-item" v-for="item in list" :key="item.id">
        <div class="user">
          <canvas ref="avatar"></canvas>
          <span>{{ item.goods_order_record.goods_name }}</span>
        </div>

        <div class="flex">
          <p><strong>Order number:</strong> {{ item.goods_order_record.order_sn }}</p>
        </div>


        <div class="flex">
          <p><strong>Nums</strong>: {{ item.goods_order_record.amount  }} USDT</p>
          <p><strong>Price</strong>: 1 : {{ item.goods_order_record.fee_amount | moneyFormat }}</p>

        </div>

        <div class="flex">
          <p><strong>Amount</strong>: {{ item.goods_order_record.actual_amount |moneyFormat }}</p>
          <p><strong>time</strong>: {{ item.goods_order_record.buy_time | dateFormat }}</p>
        </div>


        <div class="options">
          <van-button @click="optOrder(item,1)" v-if="state==20" size="mini" color="#41AAED" round>{{$t('revocation')}}</van-button>
          <van-button @click="optOrder(item,2)"  v-if="state==20" size="mini" color="#41AAED" round>{{$t('pay')}}</van-button>
        </div>

      </div>
    </van-list>
  </div>
</template>

<script>

export default {
  name: "list",
  props: {
    state: Number
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      queryInfo: {
        page: 0,
        pageSize: 20,
      }
    }
  },
  created() {

  },
  computed:{
    tp(){
      if (this.$route.query.tp){
        return  Number(this.$route.query.tp)
      } else {
        return  1
      }
    },
    id(){
      return Number(this.$route.query.id)
    }
  },

  methods: {

    async loadData() {
      this.queryInfo.page++
      const resp = await this.$http.post('/v1/auth/ustd/record', {
        ...this.queryInfo,
        state: this.state,
        tp:this.tp,
        id:this.id
      })
      const {list, total} = resp.data
      // list.forEach(el => el.info = JSON.parse(el.extra2))
      this.list = this.list.concat(list || [])
      this.loading = false
      if (this.list.length >= total) {
        this.finished = true
      }

      //加载完毕 渲染头像
      this.$nextTick(() => {
        if (this.list.length > 0) {
          this.$refs.avatar.forEach((el, index) => {
            this.$tools.createFontAvatar(el, this.list[index]['goods_order_record']['goods_name'], 18, 18)
          })
        }
      })
    },
    // totalprice(item) {
    //   let x = item.info.price
    //   let y = item.goods_order_record.amount
    //   let n = x * y
    //   return n
    // },

    async optOrder(item,op_type){
      if (op_type==1){
        const confirmRes = await this.$dialog.confirm({
          message:this.$t('Are you sure you want to undo?'),
          confirmButtonText:this.$t('confirm'),
          cancelButtonText:this.$t('cancel')
        }).catch(err => err)
        if (confirmRes !== 'confirm'){
          return
        }
      }

      const resp = await this.$http.post('/v1/auth/ustd/optOrder',{
        id : item.goods_order_record?.id ,
        op_type,
      })
      if (op_type == 1){
        this.$toast({
          message:this.$t('Revoked successfully'),
          onClose:()=>{
            location.reload()
          }
        })
      } else {
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

      }
    }

  },

}
</script>

<style scoped lang="scss">


.van-list {
  padding: 15px 10px;

  .list-item {
    border: .02667rem solid #ddd;
    border-radius: .21333rem;
    background-color: #fff;
    margin-bottom: .26667rem;
    font-size: .32rem;
    padding: .4rem;
    color: #555;

    .flex {
      display: flex;

      & > :nth-child(1),
      & > :nth-child(2) {
        flex: 1;
      }
    }

    .user {
      display: flex;
      align-items: center;

      canvas {
        border-radius: 50%;
        margin-right: 7px;
      }
    }

    p {
      padding-top: 5px;
    }

    strong {
      font-weight: 700;
      padding-right: 2px;
    }

    .options {
      padding-top: 10px;
      display: flex;
      justify-content: flex-end;
      .van-button{
        padding: 0 15px;
        margin-left: 10px;
      }
    }

  }
}

</style>
