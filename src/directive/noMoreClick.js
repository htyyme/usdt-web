export default  (Vue) => {
    Vue.directive('noMoreClick',{
        inserted(el, binding) {
            el.addEventListener('click', e => {
                el.classList.add('van-button--disabled')
                el.disabled = true
                setTimeout(() => {
                    el.disabled = false
                    el.classList.remove('van-button--disabled')
                }, 3500)
            })
        }
    })
}