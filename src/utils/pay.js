import appConfig from "@/config";
import {openUrl} from "@/utils/tools";


export function handlePay(orderInfo){
    const isApp = appConfig.isApp
    const {pay_url,entity,channelCode} = orderInfo

    if (!isApp){
        openUrl(pay_url)
        return
    }

    if (!entity){
        openUrl(pay_url)
        return
    }

    appPay(entity,channelCode)
}

//处理App支付
export function appPay(entity,channelCode) {
    let description = "recharge"
    let orderId = entity.data_order_id
    let amount = entity.amount + ""
    let email = entity.email
    let mobile = entity.phone
    let key = entity.data_key
    let currency = entity.datacurrency || 'INR'
    let ext = entity.ext
    window.android.pay(description, orderId, amount, email, mobile, key, currency,ext,channelCode)
}

//同步通知地址
export function payNotify(status) {
    router.replace({
        name: 'success',
        query: {
            status
        }
    })
}