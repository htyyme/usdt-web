<template>
  <div>
    <van-empty v-if="list.length===0"></van-empty>

    <van-list v-model="loading" :finished="finished" finished-text="No more" @load="loadData">
      <div class="list-item" v-for="item in list" :key="item.id">
        <div class="user">
          <canvas ref="avatar"></canvas>
          <span>{{ item.info.user }}</span>
        </div>

        <div class="flex">
          <p><strong>Order number:</strong> {{ item.goods_order_record.order_sn }}</p>
        </div>


        <div class="flex">
          <p><strong>Price</strong>: {{ item.info.price | moneyFormat }}</p>
          <p><strong>Amount</strong>: {{ item.goods_order_record.amount }}</p>
        </div>

        <div class="flex">
          <p><strong>Total</strong>: {{ totalprice(item) | moneyFormat }}</p>
          <p><strong>time</strong>: {{ item.goods_order_record.buy_time | dateFormat }}</p>
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
        tp: 1
      }
    }
  },
  created() {

  },
  methods: {

    async loadData() {
      this.queryInfo.page++
      const resp = await this.$http.post('/v1/auth/ustd/record', {
        ...this.queryInfo,
        state: this.state
      })
      const {list, total} = resp.data
      list.forEach(el => el.info = JSON.parse(el.extra2))
      this.list = this.list.concat(list || [])
      this.loading = false
      if (this.list.length >= total) {
        this.finished = true
      }

      //加载完毕 渲染头像
      this.$nextTick(() => {
        if (this.list.length > 0) {
          this.$refs.avatar.forEach((el, index) => {
            this.$tools.createFontAvatar(el, this.list[index]['info']['user'], 18, 18)
          })
        }
      })
    },
    totalprice(item) {
      let x = item.info.price
      let y = item.goods_order_record.amount
      let n = x * y
      return n
    },

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
    }

  }
}

</style>