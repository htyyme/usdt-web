<template>
  <div class="Team">
    <div class="header">
      <div class="pagetitle">My team</div>

    </div>

    <div class="counter">
      <section>
        <div class="num">233</div>
        <div class="dt tsdt">
          <van-icon :name="require('@/assets/icon/teamsize.png')" size="20" class="tsicon"></van-icon>
          <span class="ts">Team size</span>
        </div>
      </section>
      <section>
        <div class="num">233</div>
        <div class="dt">
          <van-icon :name="require('@/assets/icon/withdraw.png')" size="20"></van-icon>
          <span>Total rebate</span>
        </div>
      </section>
    </div>

    <div class="teambg">
      <span>Income list</span>
      <router-link to="/">go</router-link>
    </div>

    <div class="lst">
      <div class="item" v-for="item in 3" :key="item">
        <van-button  class="details">details</van-button>

        <dl>
          <dt>Bonus</dt>
          <dd>
            <van-icon :name="require('@/assets/icon/withdraw.png')" size="22"></van-icon>
            <span>+20</span>
          </dd>
        </dl>
        <dl>
          <dt>Number of people</dt>
          <dd>
            <van-icon :name="require('@/assets/icon/teamsize.png')" size="22"></van-icon>
            <span>123</span>
          </dd>
        </dl>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "Team"
}
</script>

<style scoped lang="scss">
.Team{
  min-height: calc(100vh - 49px);
  background-color: #f4f4f4;
  padding-bottom: 25px;
  .header{
    height: 140px;
    background: #09A1ED;
    border-radius: 0px 0px 13px 13px;
    .pagetitle{
      padding-top: 12px;
      font-size: 18px;
      color: #fff;
      text-align: center;
    }

  }

  .counter{
    width: 306px;
    height: 96px;
    background: #FFFFFF;
    border-radius: 13px;
    margin: -65px auto 0;
    display: flex;
    section{
      flex: 1;
      .num{
        text-align: center;
        color: #F97D1D;
        font-size: 20px;
        font-weight: 700;
        padding-top: 12px;
      }
      .dt{
        font-size: 12px;
        text-align: center;
        font-weight: 700;
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        //&.tsdt{
        //  position: relative;
        //  top: 5px;
        //}
        .tsicon{
          position: relative;
          right: -7px;
        }
        .ts{
          //font-size: 18px;
        }
        .van-icon{
          padding-right: 5px;

        }
        span{
          width: 50%;
        }
      }
    }
  }

  .teambg{
    width: 327px;
    height: 68px;
    background: url(~assets/img/teambg.png) no-repeat;
    background-size: cover;
    margin: 13px auto 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 23px;
    span{
      font-size: 21px;
      color: #fff;
    }
    a{
      width: 47px;
      height: 47px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #2071DF;
      font-size: 21px;
      background-color: #fff;
      font-weight: 700;
    }
  }

  .lst{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 24px;
    .item{
      width: 153px;
      height: 207px;
      background: #FFFFFF;
      box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.16);
      border-radius: 13px;
      margin-top: 13px;
      position: relative;
      .details{
        position: absolute;
        right: 0;
        top: 0;
        height: 36px;
        background: linear-gradient(180deg, rgba(94, 217, 248, 0.99) 0%, rgba(29, 111, 223, 0.99) 100%);
        border-radius: 28px;
        color: #fff;
        text-transform: capitalize;
      }
      padding: 61px 0 0 14px;
      dl{
        margin-bottom: 10px;
        dt{
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 5px;
        }
        dd{
          display: flex;
          align-items: center;
          span{
            padding-left: 10px;
            font-size: 23px;
            font-weight: bold;
            color: #F97D1D;
          }
        }
      }
    }
  }
}

</style>