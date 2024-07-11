<template>
  <div >
    <div class="invite">
      <div class="bg">
        <div id="qrcode"></div>
      </div>

      <div class="info">
        <div class="tit">{{$t('invitationCode')}}</div>
        <div class="code">
          <span class="de">{{code}}</span>
          <van-button @click="copyCode">{{ $t('copy') }}</van-button>
        </div>

        <div class="tit">{{$t('invitationLink')}}</div>
        <div class="code">
          <span class="de">{{link | linkFormat}}</span>
          <van-button @click="copyUrl">{{ $t('copy') }}</van-button>
        </div>

        <!--<van-button @click="saveImage" class="save-image" block type="primary">{{ $t('Save Image') }}</van-button>-->
      </div>

      <a :href="imgurl" style="display: none" ref="download" target="_blank" download="download" id="xiazai"></a>
    </div>

    <div class="save">
      <van-button @click="saveImage" class="save-image" block type="primary">{{ $t('Save Image') }}</van-button>
    </div>


  </div>
</template>

<script>
import appconfig from "@/config";
import QRCode from 'qrcodejs2'
import html2canvas from 'html2canvas'

export default {
  name: "Invite",
  computed:{
    //邀请码
    code(){
      return this.$store.getters['user/userInfo'].expand_code
    },
    link() {
      // let mode = this.$router.mode
      // if (mode == 'hash') {
      //   return appconfig.host + "/#/Register?invitation_code=" + this.code
      // } else {
      //   return appconfig.host + "/Register?invitation_code=" + this.code
      // }

      return this.$store.getters['system/config'].invite_link + "?invitation_code=" + this.code
    }

  },
  data(){
    return {
      // strDataURI:""
      imgurl:""
    }
  },
  mounted() {
    this.generateQrcode()
  },
  methods:{
    /**
     * 复制链接
     */
    async copyUrl() {
      const res = await this.$copyText(this.link)
      this.$toast.success(this.$t('success'))
    },
    /**
     * 复制邀请码
     */
    async copyCode() {
      const res = await this.$copyText(this.code)
      this.$toast.success(this.$t('success'))
    },
    /**
     * 生成二维码
     */
    generateQrcode() {
      new QRCode(document.getElementById("qrcode"), {
        text: this.link,
        width: 190,
        height: 190,
      })
    },
    saveImage(){
      html2canvas(document.querySelector('.bg')).then(canvas=>{
        var url = canvas.toDataURL("image/jpeg", 0.5)

        // console.log(url.length / 1024 + "k")

        var xiazai = document.querySelector('#xiazai')
        xiazai.setAttribute('href',url)
        xiazai.click()
      })
    }
  },
  filters:{
    linkFormat(v) {
      let lth = v.length
      let ret = v
      if (lth >= 20) {
        ret = ret.substr(0, 20)
        ret += '...'
      }
      return ret
    },
  }

}
</script>

<style scoped lang="scss">
@import "src/assets/css/vars.scss";
.invite{
  .bg{
    width: 100%;
    height: 500px;
    background: url(~assets/img/img.jpg) no-repeat;
    background-position: top center;
    background-size: 100vw;
    position: relative;
    #qrcode{
      position: absolute;
      width: 190px;
      height: 190px;
      //border: 1px solid red;
      top: 210px;
      left: 51%;
      transform: translateX(-50%);

    }
  }


  .info{
    padding: 10px 0 25px 27px;

    .tit{
      font-size: 14px;
      font-weight: bold;
      color:$shallowMainColor;
      margin-top: 15px;
    }
    .code{
      display: flex;
      margin-top: 13px;
      .de{
        color: #fff;
        width: 185px;
        height: 29px;
        background: $shallowMainColor;
        border-radius: 7px;
        display: flex;
        justify-content: center;
        align-items: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 12px;
      }
      .van-button{
        min-width: 57px;
        height: 29px;
        background: #FFC543;
        border-radius: 6px;
        color: #fff;
        border:none;
        margin-left: 40px;
      }
    }
  }
}


.save{
  background-color: #f4f4f4;
  padding-bottom: 30px;
  .save-image{
    border-radius: 10px;
    height: 35px;
    width: 90%;
    margin: 15px auto 0px;

  }
}


</style>
