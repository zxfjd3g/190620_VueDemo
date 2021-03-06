function Compile(el, vm) {
    // 保存vm
    this.$vm = vm;
    // 确定el元素并保存
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);

    // 如果el元素存在
    if (this.$el) {
        // 1. 将el元素中所有子节点转移到fragment对象, 并保存它
        this.$fragment = this.node2Fragment(this.$el);
        // 2. 编译fragment中的所有子节点
        this.init();
        // 3. 将编译好的fragment添加到el中
        this.$el.appendChild(this.$fragment); // 批量更新节点
    }
}

Compile.prototype = {
    node2Fragment: function(el) {
        var fragment = document.createDocumentFragment(),
            child;

        // 将原生节点拷贝到fragment
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }

        return fragment;
    },

    init: function() {
        this.compileElement(this.$fragment);
    },

    /* 
    编译指定节点容器的所有子节点
    */
    compileElement: function(el) {
        // 得到所有子节点
        var childNodes = el.childNodes,
            me = this;
        // 遍历每个子节点
        [].slice.call(childNodes).forEach(function(node) {
            // 得到节点的文本内容
            var text = node.textContent;
            // 用于匹配插值的正则
            var reg = /\{\{(.*)\}\}/;
            // 如果是元素节点
            if (me.isElementNode(node)) {
                // 编译元素节点的指令属性
                me.compile(node);
            // 如果是插值格式的文本节点
            } else if (me.isTextNode(node) && reg.test(text)) {
                // 编译带插值的文本节点
                me.compileText(node, RegExp.$1);
            }
            // 如果当前子节点还有子节点
            if (node.childNodes && node.childNodes.length) {
                // 通过递归调用实现所有层次节点的编译
                me.compileElement(node);
            }
        });
    },

    compile: function(node) {
        // 得到所有的属性节点
        var nodeAttrs = node.attributes,
            me = this;
        // 遍历每个属性节点
        [].slice.call(nodeAttrs).forEach(function(attr) {
            // 得到属性名   v-text / v-html / v-class
            var attrName = attr.name;
            // 如果是指令属性
            if (me.isDirective(attrName)) {
                // 得到属性值, 就是表达式  msg / myClass
                var exp = attr.value;
                // 得到指令名   text / html / class
                var dir = attrName.substring(2);
                // 如果是事件指令
                if (me.isEventDirective(dir)) {
                    // 处理事件指令
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                // 如果是普通指令
                } else {
                    // 调用编译工具对象的方法处理
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }
                // 移除指令属性
                node.removeAttribute(attrName);
            }
        });
    },

    /* 编译文本节点 */
    compileText: function(node, exp) {
        // 让编译工具对象去编译
        compileUtil.text(node, this.$vm, exp);
    },

    isDirective: function(attr) {
        return attr.indexOf('v-') == 0;
    },

    isEventDirective: function(dir) {
        return dir.indexOf('on') === 0;
    },

    isElementNode: function(node) {
        return node.nodeType == 1;
    },

    isTextNode: function(node) {
        return node.nodeType == 3;
    }
};

/* 
包含n个编译指令/插值的方法的工具对象
*/
var compileUtil = {
    /* v-text | {{}} */
    text: function(node, vm, exp) {
        this.bind(node, vm, exp, 'text');
    },

    /* v-html */
    html: function(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },

    /* v-model */
    model: function(node, vm, exp) {
        /* 
        1. 实现input的初始化显示
        2. 创建watcher, 用于在数据改变时, 节点自动更新
        */
        this.bind(node, vm, exp, 'model');

        var me = this,
            val = this._getVMVal(vm, exp);
        // 绑定input监听
        node.addEventListener('input', function(e) { // 当输入发生改变
            // 得到输入的最新值
            var newValue = e.target.value;
            // 将值保存到表达式对应的属性上  ===> 进入数据绑定的更新流程
            me._setVMVal(vm, exp, newValue);
            val = newValue;
        });
    },

    /* v-class */
    class: function(node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },

    /* 
    真正进行编译的方法
    */
    bind: function(node, vm, exp, dir) {
        // 根据指令名得到更新节点的函数    text | html | model | class
        var updaterFn = updater[dir + 'Updater'];
        // 调用更新节点的函数 ===> 实现界面的初始化显示
        updaterFn && updaterFn(node, this._getVMVal(vm, exp));

        // 创建表达式对应的watcher  ==> 用于将来数据更新时自动去更新对应的节点
        new Watcher(vm, exp, function(value, oldValue) {
            updaterFn && updaterFn(node, value, oldValue);
        });
    },

    // 事件处理
    eventHandler: function(node, vm, exp, dir) {
        // 得到事件名/类型
        var eventType = dir.split(':')[1],
        // 根据表达去method中得到回调函数
            fn = vm.$options.methods && vm.$options.methods[exp];

        if (eventType && fn) {
            // 给元素节点绑定指定事件名和回调函数的dom事件监听 (this被强制绑定为了vm)
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },

    _getVMVal: function(vm, exp) {
        var val = vm._data;
        exp = exp.split('.');
        exp.forEach(function(k) {
            val = val[k];
        });
        return val;
    },

    _setVMVal: function(vm, exp, value) {
        var val = vm._data;
        exp = exp.split('.');
        exp.forEach(function(k, i) {
            // 非最后一个key，更新val的值
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
};


/* 
包含n个更新真实dom节点的方法的工具对象
*/
var updater = {
    /* 更新节点的textCotent属性 */
    textUpdater: function(node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    },
    
    /* 更新节点的innerHTML属性 */
    htmlUpdater: function(node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },
    
    /* 更新节点的className属性 */
    classUpdater: function(node, value, oldValue) {
        var className = node.className;
        node.className = className ? className + ' ' + value : value
    },
    
    /* 更新节点的value属性 */
    modelUpdater: function(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};