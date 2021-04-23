<template>
  <van-overlay :show="show" >
    <div class="wrapper" @click.stop>
      <div class="block" />
    </div>
  </van-overlay>
</template>

<script>
import {SHOW_GRABBING} from "@/utils/events";

export default {
  name: "grabbing",
  data(){
    return {
      show:false
    }
  },
  created() {
    this.$bus.$on(SHOW_GRABBING, this.handleOpen)
  },
  methods:{
    handleOpen(){
      this.show = true
    },
    handleClose(){
      this.show = false
    }
  },
  destroyed() {
    this.$bus.$off(SHOW_GRABBING)
  }
}
</script>

<style scoped>

</style>