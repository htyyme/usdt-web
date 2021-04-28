<template>
  <div>
    <div id="backTop" v-show="show" @click="backToTop">

    </div>
  </div>
</template>

<script>
  export default {
    name: "backTop",
    data(){
      return {
        show:false
      }
    },
    mounted() {
      window.addEventListener('scroll',  ()  => {
        if (window.pageYOffset >= 900) {
          this.show = true
        } else {
          this.show = false
        }
      })
    },

    methods:{
      backToTop(){
        var timer = setInterval(function(){
          let osTop = document.documentElement.scrollTop || document.body.scrollTop;
          let ispeed = Math.floor(-osTop / 5);
          document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
          if(osTop === 0){
            clearInterval(timer);
          }
        },30)
      }
    }
  }
</script>

<style scoped lang="scss">
  #backTop{
    position: fixed;
    bottom: 50px;
    right: 20px;
    width: 39px;
    height: 39px;
    background: url("~assets/icon/backtop.png") no-repeat;
    background-size: 39px 39px;
  }
</style>