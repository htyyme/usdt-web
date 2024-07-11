import Vue from "vue"
import Vant from 'vant';
import { Locale } from 'vant';
import messages from "@/assets/lang/messages";
import store from '@/store'
import config from "@/config";

import {Lazyload} from "vant";

let lo = store.state.system.locale || config.locale

Locale.use(lo ,messages[lo] )



Vue.use(Vant);
Vue.use(Lazyload);