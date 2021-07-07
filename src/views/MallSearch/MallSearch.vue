<template>
  <div class="search-page">
    <div class="page-header">
      <input type="search" placeholder="Search for goods">
      <i  class="el-input__icon el-icon-search"></i>
    </div>

    <div class="page-body">
      <el-row>
        <el-col :span="12" v-for="goods of goodsList" :key="goods.id">
          <goods-card :card="goods" :moneyPrefix="moneyPrefix" :Precision="Precision" :base="base"></goods-card>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
import goodsCard from './_cpns/goodsCard.vue'
import search from "@/mall/search";
import muti_data from "@/mall/muti_data";

export default {
  components: {
    goodsCard
  },
  data() {
    return {
      searchText: '',
      activeName: 'All',
      goodsList: [],
      loading: false,
      moneyPrefix:'',
      Precision:0,
      base:1
    }
  },
  computed:{

  },
  async mounted() {
    this.goodsList = [
        ...search,

    ]
  },
  methods: {


  }
}
</script>

<style lang="scss">


 .search-page {
  .page-header {
    width: 100%;
    height: 56px;
    padding:0 12px;
    background: rgba(0,0,0,.05);
    position: relative;

    input[type=search]{
      height: 100%;
      width: 95%;
      background-color: transparent;
      border: none;
      outline: none;
    }

    .el-icon-search{
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 20px;
      font-size: 16px;
    }

    .header-input {
      width: 99%;
      height: 99%;

      input {
        border: 0px;
        background-color: #f7f8fa;
      }
    }

    &::after{
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background-color: #1976d2;
      z-index: 99;
      transform: scaleX(0);
      transition: .5s;
    }

    &:hover::after{
      transform: scaleX(1);
    }
  }

  .page-body {
    padding: 10px;
  }
}
</style>
