<template>
  <div class="address-page">
    <navbar :title="$t('Shipping address')"/>

    <JForm>

      <!--名字-->
      <JFormItem
          :label="$t('Receiver')"
          :placeholder="$t('Please enter the consignees name')"
          v-model.trim="formdata.name"
      />

      <!--电话-->
      <JFormItem
          :label="$t('Mobile')"
          :placeholder="$t('Please enter the consignees phone number')"
          v-model.trim="formdata.phone"
      />
      <!--地址-->
      <JFormItem
          :label="$t('Shipping address')"
          :placeholder="$t('Please enter shipping address')"
          v-model.trim="formdata.address"
      />

    </JForm>

    <div style="padding: 0 20px;">
      <van-button block class="j-btn submit-btn"  v-no-more-click @click="handleSubmit">
        {{ $t('Submit') }}
      </van-button>
    </div>


  </div>
</template>

<script>
export default {
  name: "addresss",
  data() {
    return {
      formdata: {
        name: "",
        address: "",
        phone: "",

      }
    }
  },
  mounted() {
    this.getAddress()
  },
  methods: {
    async getAddress() {
      // const res = await this.$http.post("/v1/auth/user/getAddress/detail")
      const res = await this.$http.post("/v1/auth/getUserAddress")
      if (res.code === 200) {
        // const {
        //   name,
        //   address,
        //   mobile,
        //   complement,
        // } = res.data
        // this.formdata.name = name
        // this.formdata.address = address
        // this.formdata.mobile = mobile
        // this.formdata.complement = complement

        this.formdata = res.data
      }
    },
    async handleSubmit() {
      // const {
      //   name,
      //   address,
      //   mobile,
      //   complement
      // } = this.formdata
      //
      // if (!name){
      //   return this.$toast(this.$t("Please enter the consignees name"))
      // }
      // if (!complement){
      //   return this.$toast(this.$t("Please enter shipping address"))
      // }
      // if(!mobile){
      //   return this.$toast(this.$t("Please enter the consignees phone number"))
      // }

      // const res = await this.$http.post("/v1/auth/user/renew/address",this.formdata)
      const res = await this.$http.post("/v1/auth/addOrUpdateAddress",this.formdata)
      if(res.code ===200){
        this.$toast({
          message:this.$t('success'),
          onClose:()=>{
            this.$router.back()
          }
        })

      }
    }
  }
}
</script>

<style scoped lang="scss">
.address-page {
  padding: 20px 0;
  //background: rgba(100,100,100,.2);

  ::v-deep  .JFormItem {
    .label {
      span {
        position: relative;
        top: 2px;
      }
    }
  }

  .submit-btn{
    background: #00ba5a;
    color: #fff;
    border-radius: 5px;
  }
}

</style>
