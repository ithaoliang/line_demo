/**
 * https://github.com/gengfire/vue-popup-plugin
 * @type {Object}
 */
export function Loading(Vue){
	let count = 0;
	let instance;
	let LoadingConstructor = Vue.extend(require('./loading.vue'));
	let loading = (isLoading=true) => {
	  if ( isLoading && count === 0 ) {  //loading
	    count ++;
	    if(!instance){
	      instance = new LoadingConstructor({
	        data: {
	          coverVisible: false,
	          visible : false
	        }
	      });
	      instance.vm = instance.$mount();
	      document.body.appendChild(instance.vm.$el);
	    }
	    instance.vm.visible = true;
	  }
	  else if ( !isLoading && count === 1 ) {  // remove
	    count = 0;
	    instance.vm.visible = false;
	  }
	};
	Vue.prototype.$loading = loading;
}

export function Tips(Vue){
    let instances = [];
    let count = 1;
    let TipsConstructor = Vue.extend(require('./tips.vue'));

    var tips = function(options) {
      options = options || {};
      if (typeof options === 'string') {
        options = {
          tips: options
        };
      }
      const userOnHide = options.onHide;
      const id = 'Tips-' + count++;

      options.onHide = function() {
        tips.hide(id, userOnHide);
      };

      const instance = new TipsConstructor({
        data: options
      });
      instance.id = id;
      instance.vm = instance.$mount();
      document.body.appendChild(instance.vm.$el);
      instance.vm.visible = true;
      instance.dom = instance.vm.$el;
      instances.push(instance);
    };

    tips.hide = function(id, onHide) {
      for (let i = 0, len = instances.length; i < len; i++) {
        if (id === instances[i].id) {
          if (typeof onHide === 'function') onHide(instances[i]);
          instances.splice(i, 1);
          break;
        }
      }
    };

    Vue.prototype.$tips = tips;
  }

  export function AlertBox(Vue){
    let instances = [];
    let count = 1;
    let AlertBoxConstructor = Vue.extend(require('./alertbox.vue'));
    //this.$alert('网络有问题,请稍候','标题',['取消', '确定'])
    let alertBox = (content, ...options) => {
      let title = '温馨提示', confirm = '确定', cancel=false, callback,isBackgroundTransparent = false;
      for (let v of options) {
        if (typeof v === 'function') {
          callback = v;
        } else if (typeof v === 'object') {
          confirm = v.pop();		//删除并返回数组的最后一个元素
          cancel = v[0];
        } else if(typeof v=== 'boolean'){
          isBackgroundTransparent = v
        } else {
          title = v;
        }
      }

      const id = 'AlertBox-' + count++;

      const instance = new AlertBoxConstructor({
        data: {
          content: content,
          title: title,
          confirm: confirm,
          cancel: cancel,
          isBackgroundTransparent,
          onHide: (index) => {
            if(callback) callback(index);
            alertBox.hide(id);
          }
        }
      });
      instance.id = id;
      instance.vm = instance.$mount();
      document.body.appendChild(instance.vm.$el);
      instance.vm.coverVisible = instances.length === 0 ? true : false;
      instance.vm.visible = true;
      instance.dom = instance.vm.$el;
      instances.push(instance);
    };

    alertBox.hide = function(id) {
      for (let i in instances) {
        if (id === instances[i].id) {
          instances.splice(i, 1);
          break;
        }
      }
    };
    Vue.prototype.$alert = alertBox;
  }