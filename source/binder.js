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
	function Binder() {};

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
	Binder.prototype.bindDom = function(dom, value) {
		var $dom = $(dom);
		switch (dom.tagName) {
			case "INPUT":
				$dom.val(value);
				break;
			default:
				$dom.html(value);
				break;
		};
	};
	Binder.prototype.bindObject = function(obj,expression,dom) {
		var self = this;
		var $dom = $(dom);
		console.log($dom.val());
		switch (dom.tagName) {
			case "INPUT":
				var value = $dom.val();
				self.set(obj,expression,value);
				break;
			default:
				break;
		};
	};

	return new Binder();
});