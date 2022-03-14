<template>
  <div >
    <div class="invite">
      <div id="qrcode"></div>

      <div class="line"></div>

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
      console.log(new QRCode(document.getElementById("qrcode"), {
        text: this.link,
        width: 150,
        height: 150,
      }))
    },
    saveImage(){
      html2canvas(document.querySelector('.invite')).then(canvas=>{
        var url = canvas.toDataURL()
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
.invite{
  height: 622px;
  background: url(~assets/img/invitebg.jpg) no-repeat;
  background-position: top center;
  background-size: 100vw;
  position: relative;
  #qrcode{
    position: absolute;
    width: 150px;
    height: 150px;
    //border: 1px solid red;
    top: 190px;
    left: 50%;
    transform: translateX(-50%);
  }

  .line{
    width: 273px;
    height: 1px;
    background-color: #707070;
    opacity: 0.3;
    position: absolute;
    top: 379px;
    left: 50%;
    transform: translateX(-50%);
  }

  .info{
    position: absolute;
    //border: 1px solid red;
    width: 316px;
    height: 195px;
    bottom: 29px;
    left: 50%;
    transform: translateX(-50%);
    padding: 0 0 0  27px;
    .tit{
      font-size: 14px;
      font-weight: bold;
      color:#ff1720;
      margin-top: 15px;
    }
    .code{
      display: flex;
      margin-top: 13px;
      .de{
        color: #fff;
        width: 160px;
        height: 29px;
        background: #ff1720;
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
        width: 57px;
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
    height: 30px;
    width: 90%;
    margin: 15px auto 0px;

  }
}


</style>
