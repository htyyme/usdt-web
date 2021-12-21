<template>
  <div class="maininfo">
    <dl>
      <dt>
        <span>{{$t('Shop image')}}</span>
        <em class="redstar">*</em>
      </dt>
      <dd>
        <!--h5上传-->
        <van-uploader v-if="!isApp" :after-read="afterRead"  :fileList="fileList" :multiple="false" :deletable="false" :max-count="1" :upload-icon="uploadicon"/>
        <!--app上传-->
        <van-uploader v-else @click.native.prevent="handleAppUpload"  :fileList="fileList"  :multiple="false" :deletable="false" :max-count="1"/>
      </dd>
    </dl>

    <dl>
      <dt>
        <span>{{$t('Shop Name')}}</span>
        <em class="redstar">*</em>
      </dt>
      <dd>
        <div class="ipt">
          <input type="text" :placeholder="$t('Please enter shop name')" v-model="form.name">
        </div>
      </dd>
    </dl>

    <dl>
      <dt>
        <span>{{$t('Shop introduction')}}</span>
        <em class="redstar">*</em>
      </dt>
      <dd>
        <div class="ipt">
          <input type="text" :placeholder="$t('Please enter shop introduction')" v-model="form.intro">
        </div>
      </dd>
    </dl>

    <dl>
      <dt>
        <span>{{$t('Billing infomation')}}</span>
        <em class="redstar">*</em>
      </dt>
      <dd class="Billing">
          <div class="field">
            <div class="title">{{$t('Bank account')}}</div>
            <div class="enter">
              <input type="text" :placeholder="$t('Bank account')" v-model="form.account">
            </div>
          </div>

        <div class="field">
          <div class="title">{{$t('IFSC')}}</div>
          <div class="enter">
            <input type="text" :placeholder="$t('IFSC code')" v-model="form.ifsc">
          </div>
        </div>

        <div class="field">
          <div class="title">{{$t('Payee')}}</div>
          <div class="enter">
            <input type="text" :placeholder="$t('Payee')" v-model="form.account_name">
          </div>
        </div>

        <div class="field">
          <div class="title">{{$t('Whatsapp')}}</div>
          <div class="enter">
            <input type="text" :placeholder="$t('Whatsapp')" v-model="form.what_app">
          </div>
        </div>
      </dd>
    </dl>


    <van-button block class="submit-btn" :loading="$store.getters['system/gloading']" @click="handleSubmit">{{$t('Submit')}}</van-button>
  </div>
</template>

<script>
import appConfig from "@/config";
import {SET_SHOP_COUNT_DATA} from "@/utils/events";

export default {
  name: "maininfo",
  data() {
    return {
      form:{
        id:0,
        shop_pic:"",
        name:'',
        intro:"",
        account:"",
        ifsc:"",
        account_name:"",
        what_app:""
      },
      fileList:[],
      sell_num: 0,
      sell_price: 0,
      uploadicon:'photograph'
    };
  },
  computed:{
    isApp(){
      return appConfig.isApp
    }
  },
  created() {
    this.loadDetail()
  },
  methods:{
    //h5上传
    async afterRead(file) {
      //上传图片
      const fd = new FormData();
      fd.append('file', file.file)
      const config = {
        headers: {"Content-Type": "multipart/form-data"}
      };
      const resp = await this.$http.post('/api/fileUploadAndDownload/appupload', fd, config)
      this.form.shop_pic = resp.data.file.url

      this.uploadicon = this.$tools.getImage(this.form.shop_pic)

    },
    //app上传
    handleAppUpload() {
      window.android.upload()
    },
    async handleSubmit(){
      if (!this.form.shop_pic){
        return this.$toast.fail(this.$t('Please upload shop image'))
      }
      if (!this.form.name){
        return this.$toast.fail(this.$t('Please enter shop name'))
      }
      if (!this.form.intro){
        return this.$toast.fail(this.$t('Please enter shop introduction'))
      }
      if (!this.form.account){
        return this.$toast.fail(this.$t('Please enter bank account'))
      }
      if (!this.form.ifsc){
        return this.$toast.fail(this.$t('Please enter IFSC code'))
      }
      if (!this.form.account_name){
        return this.$toast.fail(this.$t('Please enter payee'))
      }
      if (!this.form.what_app){
        return this.$toast.fail(this.$t('Please enter whatsapp'))
      }
      const resp = await this.$http.post('/v1/auth/user/merchant/bind',this.form)
      // console.log(resp)

      this.$toast.success({
        message:this.$t('success'),
        onClose: ()=>{
          this.$router.back()
        }
      })
    },
    async loadDetail(){
      const resp = await this.$http.post('/v1/auth/user/merchant')
      this.sell_num = resp.data.sell_num
      this.sell_price = resp.data.sell_price

      this.form.id = resp.data.id
      this.form.shop_pic = resp.data.shop_pic
      this.form.name = resp.data.name
      this.form.intro = resp.data.intro
      this.form.account = resp.data.account
      this.form.ifsc = resp.data.ifsc
      this.form.account_name = resp.data.account_name
      this.form.what_app = resp.data.what_app

      if (this.form.shop_pic) {
        this.uploadicon = this.$tools.getImage(this.form.shop_pic)
      }


      let payload = {}
      payload.sell_num = resp.data.sell_num
      payload.sell_price = resp.data.sell_price
      this.$bus.$emit(SET_SHOP_COUNT_DATA,payload)
    }
  }
}
</script>

<style scoped lang="scss">
/deep/.van-uploader__upload-icon{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .van-icon__image{
    width: 100%;
    height: 100%;
  }
}
.maininfo{
  min-height: calc(100vh - 100px - 10px - 48px);
  background: #FFFFFF;
  border-radius: 13px 13px 0px 0px;
  padding: 0 25px 26px;
  dl{
    overflow: hidden;
    dt{
      margin: 10px 0 10px 0;
      span{
        font-size: 15px;
        font-weight: 700;
        color: #333;
      }
      .redstar{
        font-weight: 700;
        color: #f00;
        font-size: 20px;
        position: relative;
        top: 6px;
        padding-left: 4px;
      }
    }
    dd{
      /deep/.van-uploader__preview{
        overflow: hidden;
        border-radius: 5px;
      }
      .ipt{
        //width: 310px;
        height: 50px;
        background-color: rgba(232,232,232,.3);
        border-radius: 8px;
        position: relative;
        input{
          border: none;
          width: 100%;
          height: 100%;
          background-color: transparent;
          padding-left: 15px;
        }
        &::after{
          content: "";
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 15px;
          height: 15px;
          background: url(~assets/icon/edit2.png) no-repeat;
          background-size: cover;
        }
      }

      &.Billing{
        background-color: rgba(232,232,232,.3);
        border-radius: 8px;
        position: relative;
        padding: 44px 0 5px 14px;

        &::after{
          content: "";
          position: absolute;
          right: 12px;
          top: 15px;
          width: 15px;
          height: 15px;
          background: url(~assets/icon/edit2.png) no-repeat;
          background-size: cover;
        }

        .field{
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-right: 15px;
          margin-bottom: 15px;
          .title{
            font-size: 15px;
            font-weight: 700;
          }
          .enter{
            width: 180px;
            height: 32px;
            background-color: rgba(233,233,233,.3);
            border-radius: 3px;
            input{
              width: 100%;
              height: 100%;
              background-color: transparent;
              border: none;
              padding-left: 10px;
            }
          }
        }
      }
    }
  }

  .submit-btn{
    width: 250px;
    height: 55px;
    background: linear-gradient( to top,#242EAC,#626AD9);
    border-radius: 28px;
    color: #fff;
    font-size: 20px;
    margin: 20px auto 0;
  }
}

</style>
