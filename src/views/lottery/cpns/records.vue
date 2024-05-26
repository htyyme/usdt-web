<template>
  <div class="records">
    <div class="win-title">{{$t("Lottery records")}}</div>

    <JEmpty v-if="list.length===0" :description="$t('No lottery record yet')"></JEmpty>

    <div class="win-records-list">
      <div class="item" v-for="item in list" :key="item.id">
          <!--<van-image :src="$tools.getImage(item.turntablePic)" class="prize-img"></van-image>-->

        <div class="right-info">
          <dl>
            <dt>{{$t("Lottery order number")}} :</dt>
            <dd style="color:orange">{{item.optSn&&item.optSn.slice(-14)}}</dd>
          </dl>

          <dl>
            <dt>{{$t("Lottery name")}} :</dt>
            <dd style="color:orange">{{item.turntableName}}</dd>
          </dl>

          <dl>
            <dt>{{$t("Prizes drawn")}} :</dt>
            <dd>
              <!--未中奖-->
              <span v-if="item.state==2">{{item.winningName}}</span>
              <!--中奖-->
              <span v-else style="color: deeppink">{{item.winningName}}</span>
            </dd>
          </dl>

          <dl>
            <dt>{{$t('Draw time')}} :</dt>
            <dd>{{item.buyTime | dateFormat}}</dd>
          </dl>

          <!--状态-->
          <dl v-if="item.state !==2">
            <dt>{{$t('Current status')}} :</dt>
            <dd>
              <!--待发货-->
              <span v-if="item.state === 1" style="color: #3498db">{{$t("To be delivered")}}</span>
              <!--已完成-->
              <span v-if="item.state === 3" style="color: #27ae60">{{$t("Order completed")}}</span>
            </dd>
          </dl>

          <!--邮寄单号-->
          <dl v-if="item.state === 3 && item.isCashPrizes !=1">
            <dt>{{$t("Mailing number")}}</dt>
            <dd style="display: flex;align-items: center;color: #27ae60;cursor: pointer" @click="copys(item.mailingNumber)">{{item.mailingNumber}}<van-icon name="edit" size="13" style="margin-left: 2px;"/></dd>
          </dl>

          <!--邮寄图片-->
          <dl v-if="item.state === 3 && item.isCashPrizes !=1">
            <dt>{{$t("Mail pictures")}}</dt>
            <dd>
              <span v-if="!item.mailingPic">{{$t("None yet")}}</span>
              <span v-else style="cursor: pointer;color: #27ae60;text-decoration: underline" @click="lookMailingPic(item)">{{$t("Take a look")}} >> </span>
            </dd>
          </dl>
        </div>

        <!--已中奖-->
        <div class="bottom-info" v-if="item.state!=2">
          <van-image :src="$tools.getImage(item.turntablePic)" class="prize-img"></van-image>
        </div>
      </div>

    </div>



    <template v-if="list.length>0">
      <van-divider v-if="!finished" :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '10px 16px' }" @click="loadmore">
        <span >{{$t('Load more')}}</span>
      </van-divider>


      <van-divider v-if="finished" :style="{ color: '#fff', borderColor: '#fff', padding: '10px 16px' }">
        <span >{{$t('No more')}}</span>
      </van-divider>

    </template>



  </div>
</template>

<script>
import { ImagePreview } from 'vant';
// import request_noloading from "@/utils/request_noloading.js";
import request_noloading from "@/utils/request.js";
export default {
  name: "records",
  data(){
    return {
      queryinfo:{
        page:0,
        pageSize:20,
        state:0
      },
      list:[],
      loading:false,
      finished:false
    }
  },
  mounted() {
    this.getrecords()
  },
  methods:{
    async getrecords(){
      this.queryinfo.page++
      const res = await request_noloading.post('/v1/auth/lucky/turntable/logs',this.queryinfo)
      if(res.code===200){
        this.list=this.list.concat(res.data.list||[])
        this.loading=false
        if(this.list.length>=res.data.total){
          this.finished=true
        }
      }
    },

    loadmore(){
      if(this.loading || this.finished){
        return
      }
      this.getrecords()
    },

    //重新加载数据
    reloadlist(){
      this.list = []
      this.queryinfo.page = 0
      this.loading=false
      this.finished=false
      this.getrecords()
    },

    async copys(t){
      await this.$copyText(t)
      this.$toast(this.$t('Text copied'))
    },

    //查看邮寄图片
    lookMailingPic(item){
      ImagePreview({
        images:[this.$tools.getImage(item.mailingPic)],
        closeable:true
      })
    }
  }
}
</script>

<style scoped lang="scss">
.records{
  padding-top: 380px;
  color: #fff;
  //padding-top: 30px;

  .win-title{
    text-align: center;
    font-size: 21px;
    color:orange;
    font-weight: 700;

  }

  .win-records-list{
    padding: 20px 17px 0;
    .item{
      //display: flex;
      margin-bottom: 15px;
      border-radius: 10px;
      backdrop-filter: blur(6px);
      background: lighten(#000, 15%);
      //background: linear-gradient(to bottom,transparentize(#be205a,.5),transparentize(#5a0668,.5));
      //background: rgba(255, 255, 255, .7);
      padding: 15px;



      .right-info{
        flex: 1;
        //padding-left: 10px;
        font-size: 13px;
        dl{
          //padding-bottom: 8px;
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
        }
      }

      .bottom-info{
        display: flex;
        justify-content: center;
        padding: 10px 0 5px;
        .prize-img{
          width: 70px;
          height: 70px;
          border-radius: 8px;
          overflow: hidden;
        }
      }

    }
  }
}

</style>
