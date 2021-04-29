import Vue from "vue"
import Vant from 'vant';
import { Locale } from 'vant';
import messages from "@/assets/lang/messages";
import store from '@/store'
import config from "@/config";

let lo = store.state.system.locale || config.locale

Locale.use(lo ,messages[lo] )



Vue.use(Vant);