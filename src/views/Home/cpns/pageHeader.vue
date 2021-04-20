<template>
  <div class="pageHeader">
    <header>
      <div class="user">
        <span class="hi">hi</span>
        <span class="name">88888899999</span>
        <van-icon :name="require('@/assets/icon/message.png')" size="24" class="message"></van-icon>
      </div>

      <div class="assets">
        <i class="coin-icon">U</i>
        <div class="balance">
          <dl>
            <dt>935.67U</dt>
            <dd>Your Total Asets</dd>
          </dl>
          <dl>
            <dt>935.67U</dt>
            <dd>Virtual currency</dd>
          </dl>
        </div>

        <div class="bot-info">
          <dl>
            <dt>91.95</dt>
            <dd>Yesterday's earning</dd>
          </dl>
          <dl>
            <dt>91.95</dt>
            <dd>Cumulative income</dd>
          </dl>
          <dl>
            <dt>91.95</dt>
            <dd>Today's earning</dd>
          </dl>
        </div>

      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "pageHeader"
}
</script>

<style scoped lang="scss">
.pageHeader {
  height: 241px;

  header {
    height: 185px;
    background: #3CA1EB;
    opacity: 1;

    .user {
      padding: 24px 15px 0;
      color: #fff;
      position: relative;
      display: flex;
      align-items: center;

      .hi {
        font-size: 20px;
        text-transform: uppercase;
      }

      .name {
        font-size: 14px;
        padding-left: 10px;
      }

      .message {
        position: absolute;
        right: 16px;
      }
    }
  }

  .assets {
    margin: 18px 15px 0;
    height: 200px;
    border: 1px solid #FFFFFF;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%);
    border-radius: 20px;
    position: relative;
    overflow: hidden;
    .coin-icon{
      position: absolute;
      width: 33px;
      height: 33px;
      left: 0;
      top: 0;
      background: url(~assets/icon/jiaocha.png) no-repeat;
      background-size: cover;
      font-size: 14px;
      color: #fff;
      text-align: center;
    }
    &::after {
      content: "";
      position: absolute;
      height: 2px;
      width: 100vw;
      background-color: #f4f4f4;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }

    .balance {
      display: flex;
      color: #fff;
      padding: 30px 24px 0;
      justify-content: space-between;

      dt {
        font-size: 20px;
        text-align: center;
        padding-bottom: 13px;
      }

      dd {
        width: 125px;
        height: 22px;
        background: #FFC543;
        border-radius: 11px;
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .bot-info {
      display: flex;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      padding-bottom: 8px;

      dl {
        flex: 1;
        text-align: center;
        border-right: 2px solid #f4f4f4;

        padding-right: 3px;

        &:last-child {
          border-right: none;
        }

        dt {
          font-size: 20px;
          font-weight: 700;
          color: #9F58FE;
          padding-bottom: 6px;

        }

        dd {
          font-size: 12px;
          color: #1D6FDF;
        }
      }
    }
  }
}

</style>