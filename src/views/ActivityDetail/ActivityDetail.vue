<template>
  <div class="promotionDetail">
    <navbar :title="$t('Promotion Detail')"></navbar>
    <div v-html="Html" class="content-wrapper"></div>
    <button class="button" v-if="is_draw" @click="recvAct">{{ $t('GET') }}</button>
    <button class="button Received" v-else >{{ $t('Received') }}</button>
  </div>
</template>

<script>
export default {
  name: "PromotionDetail",
  data() {
    return {
      Html: '',
      is_draw: '',
      id: 0,
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.getDetail(this.$route.query.id)
    } else {
      this.$router.go(-1)
    }
  },
  methods: {
    async getDetail(id) {
      let resp = await this.$http.post('/v1/auth/activity/queryActivityDetails', {activity_id: Number(id)})
      this.Html = resp.data.activity_details
      this.is_draw = resp.data.is_draw
      this.id = resp.data.id
    },
    async recvAct() {
      const resp = await this.$http.post('/v1/auth/activity/drawActivityAward', {activity_id: this.id})
      // console.log(resp)
      this.$dialog.alert({
        message:this.$t('actReceived',{num:resp.data})
      }).then(()=>{
        this.getDetail(this.id)
      })
    }
  }
}
</script>

<style lang="scss">
.promotionDetail {
  font-size: 14px;
  line-height: 1.5;
  padding: 10px 15px;


  .button {
    width: 70%;
    height: 50px;
    background: linear-gradient(to bottom,#53C8F4,#2378E1);
    box-shadow: 0 0.05333rem 0.08rem rgba(10, 83, 12, 0.32);
    border-radius: 1.6rem;
    border: none;
    font-size: 0.48rem;
    font-weight: 400;
    line-height: 0.4rem;
    color: #FFFFFF;

    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);

    &.Received{
      background: #ccc !important;
      box-shadow: unset;
    }
  }
}

.content-wrapper{
  img{
    max-width: 370px;
  }
}

</style>
