<template>
  <div class="pageHeader">
    <div class="user">
      <avatarUploader />

      <div class="userinfo">
        <div>88889999</div>
        <div>ID:12</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "pageHeader",
  mounted() {

  },
  computed:{
    userInfo(){
      return this.$store.getters['user/userInfo']
    }

  },


}
</script>

<style scoped lang="scss">
  .pageHeader{
    height: 250px;
    background: url(~assets/img/mebg.png) no-repeat;
    background-size: cover;
    padding: 43px 0 0 40px;
    .user{
      display: flex;
      align-items: center;

      .userinfo{
        color: #fff;
        font-size: 17px;
        line-height: 1.7;
        padding-left: 17px;
      }
    }
  }
</style>