<template>
  <div class="goods-card" :style="{ height:height }" @click="toDetail(card.id)">
    <div class="product-img">
      <img :src="card.img_url">
    </div>
    <div class="card-info">
      <div class="title">{{card.name}}</div>
      <div class="money" style="height: 20px"> {{card.now_price | moneyFormat}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'goodsCard',
    props: {
      height: {
        type: String,
        validator: function(value) {
          if (!value) {
            return '200px'
          }
          if (value.indexOf('px') > -1) {
            return value
          }
          return value + 'px'
        }
      },
      card: {
        type: Object,
        required: true,
        default: {
          img_url: '',
          name: '',
          now_price: '',
          old_price: ''
        }
      },
      moneyPrefix:{
        type:String,
        default:''
      },
      Precision:{
        type:Number,
        default:0
      },
      base:{
        type:Number,
        default:1
      }
    },
    data() {
      return {
        msg: ''
      }
    },
    methods: {
      toDetail(id) {
        this.$router.push('/mallDetail?id=' + id)
      },
      moneyFormat(money){
        money = money ? money : 0
        money = money * this.base
        return parseFloat(money).toFixed(this.Precision)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">


.goods-card {
    word-break: break-all;
    padding: 10px;
    margin: 13px;
    position: relative;
    box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);
    height: 230px;

    .product-img {
      display: block;
      position: relative;
      width: 100%;
      padding-top: 100%;
      overflow: hidden;

      img {
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        object-fit: contain;
      }
    }

    .title {
      font-size: 14px;
      word-break: break-all;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      line-height: 1.5;
    }

    .money {
      font-size: 16px;
      color: #f44336;
      font-weight: 400;
      margin-top: 5px;
    }
  }
</style>
