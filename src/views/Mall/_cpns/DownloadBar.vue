<template>
  <div  class="download-bar">
    <img  :src="require('@/assets/mall/d.png')" alt="">

    <p>{{$t('Open from the App')}}</p>


    <img  class="downbtn"  :src="require('@/assets/mall/d3.png')" alt="">

  </div>
</template>

<script>


  export default {
    name: "DownloadBar",
    computed: {



    },
    methods: {
      handleClose() {

      }
    }
  }
</script>

<style scoped lang="scss">


 .download-bar {
    height: 70px;
    width: 100vw;
    background-color: #eee;

    display: flex;
    align-items: center;
    padding: 2px 5px;

    img {
      width: 40px;
      height: 40px;
      margin: 0 5px;
      border-radius: 3px;
    }

    p {
      flex: 1;
      color: #9e9e9e;
      font-size: 19px;
      font-weight: 400;
      margin-left: 15px;
    }

    .down {
      background: #f2f2f2;
      border: 1px solid #00b8a9;
      color: #00b8a9;
      padding: 6px 8px;
      font-size: 12px;
      border-radius: 2px;
    }

    .downbtn{
      width: 35px;
      margin-right: 20px;
    }

    .close {
      margin: 0 .1em 0 .5em;
      font-weight: 600;
      font-size: 16px;
    }
  }
</style>
