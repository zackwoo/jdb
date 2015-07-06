/**
 *
 * 负责页面元素与对象间的双向绑定
 * @create time : 2015-07-01
 * @author		: zack
 * @version		: 0.0.1
 * @License		: MIT
 *
 */


define(["jquery"], function($) {
	function Binder() {
		var self = this;
		self._watchers = {
			"bindDomEvt": null //绑定视图事件
		};
	};

	Binder.prototype.addBindDomWatch = function(func) {
		var self = this;
		if (!$.isFunction(func)) {
			throw new Error("参数必须是function");
		};
		self._watchers["bindDomEvt"] = func;
	};

	Binder.prototype.get = function(mock, expression) {
		var props = expression.split(".");
		var target = mock;
		$.each(props, function(index, item) {
			if (target === undefined) return;
			var arrRegx = /(\w+)\[(\d+)\]/;
			if (arrRegx.test(item)) {
				var prop = arrRegx.exec(item)[1];
				var index = arrRegx.exec(item)[2];
				if (target[prop] !== undefined) {
					target = target[prop][index];
				} else {
					target = undefined;
				}
			} else {
				target = target[item];
			}
		});

		return target;

	};
	Binder.prototype.set = function(obj, expression, value) {
		var props = expression.split(".");
		var target = obj;
		$.each(props, function(index, item) {
			if (target === undefined) return;
			var arrRegx = /(\w+)\[(\d+)\]/;
			if (arrRegx.test(item)) {
				var prop = arrRegx.exec(item)[1];
				var index = arrRegx.exec(item)[2];
				if (target[prop] !== undefined) {
					target = target[prop][index];
				} else {
					target = undefined;
				}
			} else {
				target = target[item];
			}
		});
		return target.set(value);
	};
	Binder.prototype.bindDom = function(dom, rawValue) {
		var self = this;
		var $dom = $(dom);
		var value = rawValue;
		if ($.isFunction(self._watchers["bindDomEvt"])) {
			value = self._watchers["bindDomEvt"].call(dom, rawValue);
		};
		switch (dom.tagName) {
			case "INPUT":
				var type = $dom.attr('type');
				if (type.toLowerCase() === "radio" || type.toLowerCase() === "checkbox") {
					$dom.prop('checked', value == $dom.val());
				} else {
					$dom.val(value);
				};
				break;
			case "SELECT":
				$dom.val(value);
				break;
			default:
				$dom.html(value);
				break;
		};
	};
	Binder.prototype.bindObject = function(obj, expression, dom) {
		var self = this;
		var $dom = $(dom);
		switch (dom.tagName) {
			case "INPUT":
				var value = $dom.val();
				self.set(obj, expression, value);
				break;
			default:
				break;
		};
	};

	return new Binder();
});