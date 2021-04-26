<template>
  <div class="usdt">
    <van-sticky>
      <van-search v-model="search" placeholder="search" shape="round"/>
    </van-sticky>

    <ul class="subnavs">
      <li @click="toSellPage">
        <van-image :src="require('@/assets/icon/usdt-nav1.png')"></van-image>
        <span>Sell</span>
      </li>

      <li>
        <van-image :src="require('@/assets/icon/usdt-nav2.png')"></van-image>
        <span>My sales</span>
      </li>
      <li>
        <van-image :src="require('@/assets/icon/usdt-nav3.png')"></van-image>
        <span>Purchase order</span>
      </li>
      <li>
        <van-image :src="require('@/assets/icon/usdt-nav4.png')"></van-image>
        <span>Sale order</span>
      </li>
    </ul>

    <van-empty :image="require('@/assets/img/nodata.png')" v-if="list.length===0"></van-empty>

    <van-list class="goods-list" v-model="loading" :finished="finished"   @load="loadData" :loading-text="$t('loading')">
      <div class="goods-item" v-for="(item,index) in list" :key="index">
        <div class="top">
          <van-image class="top-img" :src="$tools.getImage(item.show_pic)"></van-image>
          <div class="user">
            <van-image :src="getItemAvatar(item)" class="avatar"></van-image>
            <span class="username">{{item.goods_name}}</span>
          </div>
        </div>
        <div class="detail">
          <div class="intro">{{item.goods_intro}}</div>
          <div class="price">{{item.info.price}}{{$t('coin')}}/USDT</div>
          <div class="enter">Enter</div>
        </div>


      </div>
    </van-list>

  </div>
</template>

<script>
export default {
  name: "Usdt",
  data() {
    return {
      search: "",
      list: [],
      loading: false,
      finished: false,
      queryInfo:{
        page:0,
        pageSize:20,
        tp:8
      }
    }
  },
  methods:{
    async loadData(){
      this.queryInfo.page++
      const resp = await this.$http.post('/v1/auth/ustd/list',this.queryInfo)
      const {list,total} = resp.data
      list.forEach(el => el.info = JSON.parse(el.extra2))
      this.list = this.list.concat(list || [])
      this.loading = false
      if (this.list.length >= total){
        this.finished = true
      }

    },
    toSellPage(){
      this.$router.push({
        name:'UsdtSell'
      })
    },
    getItemAvatar(item){
      if (item.info.pic){
        return this.$tools.getImage(item.info.pic)
      }else{
        return require('@/assets/icon/default_avatar.png')
      }
    }
  }
}
</script>

<style scoped lang="scss">
/deep/.van-empty{
  .van-empty__image{
    height: unset;
  }
}

.usdt {
  min-height: 100vh;
  background-color: #f4f4f4;

  /deep/ .van-search {
    background: linear-gradient(180deg, #41AAED 0%, #2F8DE6 100%);
  }

  .subnavs{
    display: flex;
    li{
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      .van-image{
        width: 47px;
        height: 47px;
        border-radius: 50%;
        overflow: hidden;
        margin: 21px 0 6px 0;
      }
      span{
        font-size: 12px;
        color: #333;
      }
    }
  }

  .goods-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 20px 10px;
    .goods-item{
      width: 172px;
      border-radius: 12px;
      background-color: #fff;
      margin-bottom: 10px;
      overflow: hidden;
      position: relative;
      .top{
        height: 88px;
        position: relative;
        .top-img{
          height: 100%;
        }
        .user{
          min-width: 93px;
          height: 23px;
          background: #F3F9FF;
          border-radius: 2px;
          position: absolute;
          left: 0;
          top: 12px;
          box-shadow: 2px 2px 2px rgba(255,192,203,.6);
          .avatar{
            width: 34px;
            height: 34px;
            border-radius: 50%;
            overflow: hidden;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 6px;
          }
          .username{
            padding-left: 52px;
            padding-right: 15px;
            font-size: 12px;
          }
        }
      }
      .detail{
        font-size: 12px;
        color: #333;
        padding: 5px 8px 8px;
        .price{
          font-size: 15px;
          font-weight: bold;
          color: #E93737;
          margin-top: 3px;
        }
        .enter{
          min-width: 41px;
          height: 15px;
          background: #FFC543;
          font-size: 12px;
          position: absolute;
          bottom: 12px;
          right: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 2px 2px 2px #FF4943;
        }

      }

    }
  }

}
</style>