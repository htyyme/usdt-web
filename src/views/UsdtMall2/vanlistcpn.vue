<template>
  <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
  >

    <section class="sale-item" v-for="i in 15" :key="i">

      <header>
        <div class="user">
          <div class="avatar"></div>
          <span class="username">海底捞火锅</span>
        </div>
        <div class="nums">
          <span>成单量2278</span>
          <span>89%</span>
        </div>
      </header>

      <div class="bd">
        <div class="line">
          <section>数量 120382.165606 USDT</section>
          <section>单价</section>
        </div>

        <div class="line">
          <section>限额 ￥500,000.00-￥756,000.00</section>
          <section class="price">￥6.28</section>
        </div>
      </div>

    </section>

  </van-list>

</template>

<script>
export default {
  name: "vanlistcpn",
  data() {
    return {
      list: [],
      loading: false,
      finished: true,
    };
  },
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
          background: #0066ED;
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
          color: #242EAC;
          font-size: 18px;
          font-weight: 700;
        }
      }
    }


  }
}

</style>
