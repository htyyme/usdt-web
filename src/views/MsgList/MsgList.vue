<template>
  <div class="MsgList">
    <navbar title="Message"></navbar>

    <van-empty v-if="list.length===0"></van-empty>

    <van-list class="msglist" v-model="loading" :finished="finished" :finished-text="$t('No more')" @load="loadData">

      <div class="msgitem" v-for="item in list" :key="item.id" @click="toMsgDetailPage(item)">
        <van-image :src="require('@/assets/icon/readmsg.png')" class="msgicon"></van-image>
        <div class="msg">
          <div class="tit">{{item.title}}</div>
          <div class="content">{{item.content}}</div>
        </div>
        <van-icon :name="require('@/assets/icon/more.png')" class="more"></van-icon>
      </div>

    </van-list>

  </div>
</template>

<script>
export default {
  name: "MsgList",
  data() {
    return {
      queryInfo: {
        page: 0,
        pageSize: 30,
      },
      list: [],
      loading: false,
      finished: false,
    }
  },
  methods: {
    async loadData() {
      this.queryInfo.page++
      try {
        const r = await this.$http.post('/v1/msgs', this.queryInfo)
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
    },
    toMsgDetailPage(item){
      this.$store.commit('msg/setCurrentmsg',item)
      this.$router.push({
        name:'MsgDetail'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.MsgList {
  min-height: 100vh;
  background-color: #f4f4f4;
  padding: 5px 0 20px 0;

  .msglist {
    .msgitem {
      width: 345px;
      height: 90px;
      background: #FFFFFF;
      margin: 10px 15px;
      border-radius: 10px;
      position: relative;

      .msgicon {
        position: absolute;
        width: 48px;
        height: 48px;
        top: 50%;
        left: 18px;
        transform: translateY(-50%);
      }

      .msg {
        color: #333;
        display: flex;
        //flex-wrap: wrap;
        flex-direction: column;
        margin-left: 81px;
        max-width: 50%;

        .tit {
          font-size: 15px;
          font-weight: 700;
          margin: 24px 0 5px 0;
        }

        .content {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 14px;
          color: #919191;

        }
      }

      .more {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 15px;
      }
    }
  }

}


</style>