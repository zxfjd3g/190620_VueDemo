function Observer(data) {
    // 保存data
    this.data = data;
    // 开始实现劫持
    this.walk(data);
}

Observer.prototype = {
    walk: function(data) {
        var me = this;
        // 遍历data中每个属性
        Object.keys(data).forEach(function(key) {
            // 重新定义响应式属性
            me.defineReactive(data, key, data[key])
        });
    },

    defineReactive: function(data, key, val) {
        // 创建一个对应的dep对象(订阅器)
        var dep = new Dep();
        // 通过隐式递归来实现对所有层次属性的劫持/监视
        var childObj = observe(val);

        // 对当前属性实现监视/劫持(定义对应的setter)
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            // 返回属性值
            get: function() {
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            },

            // 当data中的属性发生变化时自动调用  ==> 更新界面(相关的节点)
            set: function(newVal) {
                // 保存新的值
                val = newVal;
                // 如果新的值是对象, 对象中的所有也要劫持
                childObj = observe(newVal);
                // 通过订阅器通知所有相关的订阅者 ==> 更新相应节点
                dep.notify();
            }
        });
    }
};

/* 对value对象中属性进行劫持 */
function observe(value, vm) {
    // 如果value不是直接结束
    if (!value || typeof value !== 'object') {
        return;
    }
    // 创建Observer对象
    return new Observer(value);
};


var uid = 0;

function Dep() {
    this.id = uid++;
    this.subs = [];
}

Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);
    },

    depend: function() {
        Dep.target.addDep(this);
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};

Dep.target = null;