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
 */
export function dateFormat(date, format = 'YYYY-MM-DD HH:mm:ss') {
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
export function moneyFormat(val, precision = 2) {
    let coin = getLangField('coin')
    if (typeof val === 'string') {
        return coin + val
    }
    val = val || 0
    return coin + val.toFixed(precision)
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

