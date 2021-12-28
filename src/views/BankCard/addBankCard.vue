<template>
  <div>
    <component :is="cpn"></component>
  </div>
</template>

<script>
import addBankCard_Columbia from "./addBankCard_Columbia.vue";
import addBankCard_default from "./addBankCard_default.vue";

export default {
  components:{
    addBankCard_Columbia,
    addBankCard_default
  },
  computed:{
    language(){
      return this.$store.getters['system/config'].language
    },
    cpn(){
      return this.language === 'Columbia' ? 'addBankCard_Columbia' : 'addBankCard_default'
    }
  }
}
</script>

