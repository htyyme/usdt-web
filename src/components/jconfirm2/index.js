import Vue from 'vue'
import jconfirm from './jconfirm'

const ConfirmBox = Vue.extend(jconfirm)

jconfirm.install = (content,title,options) => {

    //如果只传入了两个参数 则第二个参数不是title 是options
    if (typeof title === 'object') {
        options = title;
        title = '';
    } else if (title === undefined) {
        title = '';
    }

    options = Object.assign({
        title: title,
        content: content,
    }, options);

    let instance = new ConfirmBox({
        data: options
    }).$mount();

    document.body.appendChild(instance.$el);

    return instance.handleOpen()




}

export default jconfirm