import store from '@/store'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import dayjs from "dayjs"
import appConfig from "@/config";
import messages from "@/assets/lang/messages";
import {getLangField} from "@/utils/tools";


/**
 * 时间格式化
 * @param date
 * @param format
 * @returns {string}
 * 'YYYY-MM-DD HH:mm:ss'
 */
export function dateFormat(date, format = 'MM-DD hh:mm A') {
    dayjs.extend(utc)
    dayjs.extend(timezone)

    if (!date) return ''
    if (String(date).length === 10) {
        date *= 1000
    }
    return dayjs(date).tz(appConfig.timezone).format(format)
}

/**
 * 金额格式化
 * @param val 金额
 * @param precision 精度
 */
export function moneyFormat(val, precision = 2,cointype='coin') {
    let coin = ''
    if (cointype=='coin'){
        coin = getLangField('coin')
    }else{
        coin = 'U'
    }

    if (typeof val === 'string') {
        return val + coin
    }
    val = val || 0

    if (cointype == 'usdt') {
        precision = 5
    } else {
        precision = 2
    }

    // return  Number(val.toFixed(precision)) + coin

    //符号在金额前面
    return coin + Number(val.toFixed(precision))
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousand(num) {
    return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * 百分比格式化
 * @param num 小数
 * @param precision 精度
 */
export function rateFormat(num,precision = 2){
    let n = (num * 100).toFixed(precision)
    return n + '%'
}

/**
 * 银行卡号
 * @param val
 * @returns {string}
 */
export function cardNoFormat(val) {
    if (!val) {
        return ''
    }
    let str = val.substring(val.length - 4)
    return '**** ' + str
}


export function traTypeFormat(opType) {
    let locale = appConfig.locale
    let lang = messages[locale]
    switch (opType) {
        case 1:
            return lang['Consumption']
        case 2:
            return lang['Recharge']
        case 3:
            return lang['Withdraw']
        case 4:
            return lang['Activity Award']
        case 5:
            return lang['Winning']
        case 6:
            return lang['Rebate']
        case 7:
            return lang['Manual recharge']
        case 8:
            return lang['Manually proposed']
        case 9:
            return lang['Red envelope expenditure']
        case 10:
            return lang['Red envelope income']
        case 11:
            return lang['Financial income']
        case 12:
            return lang['Top-up benefits']
        case 13:
            return lang['Handling fee']
        case 14:
            return lang['Bet']
        case 15:
            return lang['Cancel bet return']
        case 16:
            return lang['Financial redemption']
        case 17:
            return lang['Crowdfunding revenue']
        case 18:
            return lang['Grab order']
        case 19:
            return lang['Usdt transaction']
        case 20:
            return lang['Mining machine income']
        default:
            return ''
    }
}