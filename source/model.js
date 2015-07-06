/**
 *
 * 封装对象，对每个属性提供get,set方法
 * @create time : 2015-07-01
 * @author		: zack
 * @version		: 0.0.1
 * @License		: MIT
 *
 */


define(["jquery","binder"], function($,binder) {
	var modelModule = {
		wrap: function(source) {
			var mock = {};
			_wrapObj(mock, source);
			return mock;
		}
	};

	/**
	 * 创建obj的复制品 
	 */
	function Model(raw, property) {
		var self = this;
		self._raw = raw;
		self._property = property;
		self._bindDoms = [];//绑定的元素
		self.get = function() {
			return self._raw[self._property];
		};
		self.set = function(value) {
			self._raw.valueOf()[self._property] = value;
			$.each(self._bindDoms,function(i,dom){
				binder.bindDom(dom,value);
			});
		};
		//注册绑定控件
		self.registerDom=function(dom){
			self._bindDoms.push(dom);
			binder.bindDom(dom,self.get());
		};
	};

	var _wrapObj = function(mock, raw) {
		$.each(raw, function(key) {
			mock[key] = _wrapProp(raw, key);
		});
	}
	var _wrapProp = function(raw, property) {
		var value = raw[property];
		if ($.isFunction(value)) {
			return value;
		} else if ($.isArray(value)) {
			var tmp = [];
			for (var i = 0; i < value.length; i++) {
				tmp.push(_wrapProp(value, i));
			}
			return tmp;
		} else if (typeof value == "string" || typeof value == "number" || typeof value == "boolean" || (typeof value == "object" && value instanceof Date)) {
			return new Model(raw, property);
		} else if (typeof value == "object") {
			var mock = new Model(raw, property);
			_wrapObj(mock, value);
			return mock;
		} else {
			throw new Error(property + "不支持的对象类型" + typeof value);
		}
	}
	
	return modelModule;
});