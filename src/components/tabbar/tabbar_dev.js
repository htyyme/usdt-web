import {getLangField} from "@/utils/tools";

export default [
    {
        name: 'Mall',
        title: getLangField('Mall'),
        icon: require('@/assets/tabbar/home.png'),
        activeIcon: require('@/assets/tabbar/home.blue.png'),
        url: '/Mall'
    },

    {
        name: 'MallSearch',
        title: getLangField('Search'),
        icon: require('@/assets/tabbar/order.png'),
        activeIcon: require('@/assets/tabbar/order.blue.png'),
        url: '/MallSearch'
    },

    {
        name: 'Me',
        title: getLangField('tabBarMe'),
        icon: require('@/assets/tabbar/me.png'),
        activeIcon: require('@/assets/tabbar/me.blue.png'),
        url: '/Me'
    },
]