<template>
  <div class="avatar">
    <van-image :src="$tools.getAvatar(userInfo.profile_photo)"></van-image>

    <!--H5上传-->
    <template v-if="!isApp">
      <van-uploader :after-read="afterRead">
        <van-icon :name="require('@/assets/icon/photo.png')" size="23"></van-icon>
      </van-uploader>
    </template>
    <!--App上传-->
    <template v-if="isApp">
      <van-uploader @click.native.prevent="handleAppUpload">
        <van-icon :name="require('@/assets/icon/photo.png')" size="23"></van-icon>
      </van-uploader>
    </template>

  </div>
</template>

<script>
import appConfig from "@/config";

export default {
  name: "avatarUploader",
  computed:{
    userInfo(){
      return this.$store.getters['user/userInfo']
    },
    isApp(){
      return appConfig.isApp
    }
  },
  methods:{
    /*
    * H5上传头像
    * */
    async afterRead(file) {
      //上传图片
      const fd = new FormData();
      fd.append('file', file.file)
      const config = {
        headers: {"Content-Type": "multipart/form-data"}
      };
      const resp = await this.$http.post('/api/fileUploadAndDownload/appupload', fd, config)

      //保存头像
      const r = await this.$http.post('/v1/auth/user/modify', {profile_photo: resp.data.file.url})
      //重新获取用户信息
      this.$store.dispatch('user/loadUserInfo')
    },
    /*
    * App上传头像
    * */
    handleAppUpload() {
      window.android.upload()
    },
  }
}
</script>

<style scoped lang="scss">
.avatar{
  width: 64px;
  height: 64px;
  //overflow: hidden;
  border-radius: 50%;
  background-color: #fff;
  position: relative;

  .van-image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }

  .van-uploader {
    position: absolute;
    right: 0;
    bottom: 0;
  }
}

</style>