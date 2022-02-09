<template>
  <van-dialog v-model="show" title="Tips" show-cancel-button  @cancel="handleClose"  @confirm="handleConfirm" :before-close="handleBeforeClose">

    <van-form >
      <van-field
          :label="$t('Envelope key')"
          v-model="key"
          name="key"
          :placeholder="$t('Enter envelope key')"
          :rules="[{ required: true }]"
          required
          show-word-limit

      />
    </van-form>

  </van-dialog>
</template>

<script>
import vars from '@/assets/css/vars.scss'
export default {
  name: "enterEnvelopeKey",
  data() {
    return {
      show: false,
      key:""
    };
  },
  computed:{
    mainColor(){
      return vars.mainColor
    }
  },
  methods:{
    handleOpen(){
      this.show = true
    },
    handleClose(){
      this.show = false
      this.key = ""
    },
    handleConfirm(){
      if (!this.key){
        return this.$toast.fail(this.$t('Please enter envelope key'))
      }
      this.$router.push({
        name:'RedEnvelope',
        query:{
          key:this.key
        }
      })
    },
    handleBeforeClose(action,done){
      if (action=='confirm' && !this.key){
        done(false)
      }else{
        done()
      }
    }

  }
}
</script>

<style scoped>
/deep/ .van-cell__title.van-field__label {
  width: 6.3em;
}
</style>