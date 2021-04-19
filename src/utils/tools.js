
/*
* 生成一个随机数
* */
export function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

//验证手机号格式
export function checkMobile(mobile){
    return /^[0-9]{9,12}$/.test(mobile)
}

//验证邮箱格式
export function checkEmail(email){
    let extArr = [
        '@gmail.com',
        '@yahoo.com',
        '@msn.com',
        '@hotmail.com',
        '@aol.com',
        '@ask.com',
        '@live.com',
        '@0355.net',
        '@yeah.net',
        '@googlemail.com',
        '@126.com',
        '@sina.com',
        '@sohu.com'
    ]
    let valid = false
    for (let i = 0; i < extArr.length; i++) {
        let index = email.indexOf(extArr[i])
        if (index !== -1){
            valid = true
            break
        }
    }
    return valid
}

//验证银行卡格式
export function checkBankcardNo(cardNo){
    return /^[0-9]{10,25}$/.test(cardNo)
}

//打开一个链接
export function openUrl(url){
    if (!url) return
    console.log('url',url)
    /*
    * TODO
    * */

}