<template>
<div class="product-page">
  <!--<navbar :title="$t('Pledge income')"></navbar>-->
  <navbar :title="product.financial_name"></navbar>

  <van-empty v-if="!hasProduct"></van-empty>

  <div class="product-main" v-else>
    <div class="product-base-info">
      <van-image :src="$tools.getImage(product.img)" class="product-img" lazy-load></van-image>
      <div class="product-details">
        <div class="product-name">{{product.financial_name}}</div>
        <div class="product-cycle">{{product.hold_cycle}} dias</div>
        <div class="product-profit">Lucro {{product.interest_rate*100}}%</div>
      </div>
    </div>

    <div class="desc">
      <div class="rich-text" v-html="product.coin_desc"></div>
    </div>

    <div class="input-field">
      <div class="lable">Deposit amount</div>
      <input v-model.number="amount"  onkeyup="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')" type="text" maxlength="12" placeholder="Please input the deposit amount" >
      <div class="coin">BRL</div>
    </div>
    <div class="revenue">revenue: {{revenue}}BRL</div>

    <van-button round color="#FA3061" block class="submit-btn"  :loading="loading" @click="handleSubmit" :disabled="!isAvailable(product)">Submit</van-button>
  </div>
</div>
</template>

<script>

export default {
  name: "index",
  data(){
    return {
      hasProduct:false,
      product:{},
      amount:"",
      loading:false
    }
  },
  computed:{
    revenue(){
      if (!this.product.id || !this.amount || this.amount <= 0){
        return "0.00"
      }
      const {interest_rate,hold_cycle} = this.product
      let n = interest_rate * hold_cycle * this.amount
      return n.toFixed(2)
    },
    // //提交按钮是否禁用
    // isDisable(){
    //   if (!this.hasProduct){
    //     return true
    //   }
    //   if (this.product.state !== 1){
    //     return true
    //   }
    //   if (!this.amount || this.amount <= 0) {
    //     return  true
    //   }
    //   return  false
    // }
  },
  mounted() {
    this.queryProducts()
  },

  methods:{
    // 判断是否可以进去详情页面
    isAvailable(item){
      //判断等级是否满足
      const myLv = this.$store.getters['user/userInfo'].lv_id
      const lvList = item.lv || []
      const lvFlag = lvList.some(el => el.LvId === myLv)
      return lvFlag
    },
    //查询理财产品列表
    async queryProducts() {
      const r = await this.$http.post('/v1/auth/finance/products')
      const productList = r.data || []
      const id = this.$route.params.id  * 1
      const p = productList.find(item => item.id === id )
      // console.log('p',p)
      if (p) {
        this.hasProduct = true
        this.product = p
      }
    },
    async handleSubmit() {
      const submitData = {
        id: this.product.id,
        amount: this.amount * 1,
        coin_type:1
      }

      if (!submitData.amount ||submitData.amount<=0 ){
        return
      }

      this.loading = true

      setTimeout(()=>{
        this.loading=false
      },1500)
      const r = await this.$http.post('/v1/auth/finance/buy', submitData)


      // console.log("r",r)
      this.$toast.success({
        message: 'Success',
        onClose:()=>{
          this.$router.push('/TransferOut')
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.product-page {
  min-height: 100vh;
  background: #fafafa;
  padding: 16px 16px 20px;
}

.product-main{

  .product-base-info{
    margin-bottom: 10px;
    display: flex;
    .product-img{
      width: 128px;
      height: 150px;
    }
    .product-details{
      flex: 1;
      padding-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      font-size: 13px;
      color: #333;
      font-weight: 700;


    }
  }

  .desc{
    .rich-text{
      font-size: 14px;
      ::v-deep img{
        max-width: 100%;
        margin: 5px 0;
      }
    }
  }

  .input-field{
    margin: 25px 0 0 0;
    background: #fff;
    padding: 19px 16px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .2);
    border-radius: 10px;
    display: flex;
    align-items: center;
    .lable{
      font-size: 15px;
      width: 75px;
    }
    input{
      flex: 1;
      font-size: 13px;
      border: none;
      text-align: right;
      //font-weight: 700;

    }
    .coin{
      color: #ffc14e;
      margin-left: 5px;
      font-size: 15px;
    }
  }
  .revenue{
    color: #88879a;
    font-size: 12px;
    text-align: right;
    margin-top: 10px;
  }

  .submit-btn{
    margin-top: 25px;
  }
}

</style>