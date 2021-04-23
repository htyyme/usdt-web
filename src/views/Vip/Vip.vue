<template>
  <div class="vip">
    <pageHeader />

    <lvList />

  </div>
</template>

<script>
import pageHeader from "./cpns/pageHeader";
import lvList from './cpns/lvList'
export default {
  name: "Vip",
  components:{
    pageHeader,
    lvList
  }
}
</script>

<style scoped lang="scss">
.vip {

}

</style>