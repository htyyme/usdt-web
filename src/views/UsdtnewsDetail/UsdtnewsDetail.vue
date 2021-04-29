<template>
  <div class="news">
    <navbar :title="$t('Usdt news')"></navbar>

    <article>
        <div class="title">{{newsdetail.title}}</div>
        <div class="content" v-html="newsdetail.content"></div>
    </article>
  </div>
  
</template>

<script>
export default {
  name: "UsdtnewsDetail",
  computed:{
    newsdetail(){
      return this.$store.getters['usdt/currentnews']
    }
  }
}
</script>

<style scoped lang="scss">
.news{
  min-height: 100vh;
  padding-bottom: 20px;
  background-color: #f4f4f4;

  article{
    background-color: #fff;
    margin: 15px 10px 0;
    padding: 18px 13px 18px;
    border-radius: 12px;
    .title{
      font-size: 14px;
      font-weight: 700;
      text-align: center;
    }
    .content{
      margin-top: 10px;
      font-size: 13px;
      line-height: 1.5;
      color: #333;

      /deep/img{
        max-width: 100%;
        margin: 5px 0;
      }
    }
  }
}

</style>