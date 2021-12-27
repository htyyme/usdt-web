<template>
  <div class="me">
    <select v-model="locale" class="sel-lang" @change="handleLocaleChange">
      <option :value="item" v-for="(item,index) in languageList" :key="index">{{item}}</option>
    </select>

    <pageHeader />
    <wallet v-if="three_service_address.length>0"/>
    <menuList />
  </div>
</template>

<script>
import pageHeader from "./cpns/pageHeader";
import wallet from "./cpns/wallet";
import menuList from "./cpns/menuList";
import appConfig from "@/config";
import messages from "@/assets/lang/messages";
import { Locale } from 'vant';

export default {
  name: "Me",
  components:{
    pageHeader,
    wallet,
    menuList
  },
  data() {
    return {
      messages:messages,
      locale: this.$store.getters['system/locale'] || appConfig.locale,
      languageList:Object.keys(messages)
    }
  },
  computed:{
    three_service_address(){
      return this.$store.getters['system/config'].three_service_address
    }
  },
  methods:{
    //选择语言
    handleLocaleChange(){
      this.$store.commit('system/setLocale',this.locale)
      this._i18n.locale = this.locale
      Locale.use(this.locale ,messages[this.locale] )
    },
  },
  created() {
    this.$store.dispatch('user/loadUserInfo')


  }
}
</script>

<style scoped lang="scss">
.me{
  min-height: calc(100% - 49px);
  background-color: #f4f4f4;
  padding-bottom: 15px;
  position: relative;
  .sel-lang{
    position: absolute;
    top: 20px;
    right: 15px;
  }
}

</style>
