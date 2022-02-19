import {getLangField} from "@/utils/tools";
import config from "../../config.js";


const tabbarList =  [
    {
        name: 'Home',
        title: getLangField('tabBarHome'),
        icon: require('@/assets/tabbar/home.png'),
        activeIcon: require('@/assets/tabbar/home.blue.png'),
        url: '/Home'
    },
    {
        name: 'Order',
        title: getLangField('tabBarOrder'),
        icon: require('@/assets/tabbar/order.png'),
        activeIcon: require('@/assets/tabbar/order.blue.png'),
        url: '/Order'
    },


    // {
    //     name: 'Usdt',
    //     title: getLangField('USDT'),
    //     icon: require('@/assets/tabbar/transhall.png'),
    //     activeIcon: require('@/assets/tabbar/transhall-active.png'),
    //     url: '/Usdt'
    // },

    {
        name: 'Team',
        title: getLangField('tabBarTeam'),
        icon: require('@/assets/tabbar/team.png'),
        activeIcon: require('@/assets/tabbar/team.blue.png'),
        url: '/Team'
    },
    {
        name: 'Me',
        title: getLangField('tabBarMe'),
        icon: require('@/assets/tabbar/me.png'),
        activeIcon: require('@/assets/tabbar/me.blue.png'),
        url: '/Me'
    },
]

//交易所
const exchangeTabbar = {
    name: 'Usdt',
    title: getLangField('USDT'),
    icon: require('@/assets/tabbar/transhall.png'),
    activeIcon: require('@/assets/tabbar/transhall-active.png'),
    url: '/Usdt'
}

if (config.openExchange){
    tabbarList.splice(2,0,exchangeTabbar)
}

export default tabbarList
