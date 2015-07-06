/**
 *
 * JDB 基于jquery的双向绑定库
 * @create time : 2015-06-26
 * @author		: zack
 * @version		: 0.1.0
 * @License		: MIT
 *
 */

define(["jquery", "model", "binder", "directive"], function($, model, binder, directive) {
	var _ = {};

	function JDB() {
		var self = this;
		self._original = null;
		self._mock = null;
		self._filter = {}; //内部存储过滤器对象的字典key为过滤器名，过滤器不能重名
	};

	/**
	 * jdb绑定对象到页面视图
	 */
	JDB.prototype.bind = function(source) {
		var self = this;
		self._original = source;
		self._mock = model.wrap(source);
		self._scan();
		//self._updateView();
		return self._mock;
	};

	/**
	 * jdb注册显示过滤器
	 */
	JDB.prototype.filter = function(name, func) {
		var self = this;
		if (self._filter.hasOwnProperty(name)) {
			throw new Error("已经有相同过滤器名存在。");
		};
		if (!$.isFunction(func)) {
			throw new Error("过滤器必须为方法。");
		};
		self._filter[name] = func;
		return self; //support chain
	};

	//////////////////////////////////////////////////////
	///		扫描整个页面找出需要绑定的所有控件		  ///
	////////////////////////////////////////////////////
	JDB.prototype._scan = function() {
		var self = this;
		$("[jdb-model]").each(function() {
			var $dom = $(this);
			if ($dom.parent("[jdb-model]").length) {
				throw new Error("jdb 不允许jdb-model属性相互嵌套使用");
			}
			var dir = directive.pares($dom.attr('jdb-model'));
			var mock = binder.get(self._mock, dir.key);
			if ($.isArray(mock)) {
				// 移除原本自动生成的控件
				$('[jdb-mock="' + dir.key + '"]').remove();
				$.each(mock, function(index, item) {
					$mockDom = $dom.clone();
					$mockDom.attr("jdb-mock", dir.key)
					$mockDom.find("[jdb-item]").each(function() {
						var $mockItemDom = $(this);
						var path = dir.key + "[" + index + "]." + $mockItemDom.attr("jdb-item");
						$mockItemDom.attr("jdb-model", path);
						binder.get(self._mock, directive.pares(path).key).registerDom(this)

					});
					$mockDom.show();
					$dom.before($mockDom);
					self._eventBind($mockDom);
				})
				$dom.hide();
			} else {
				mock.registerDom(this);
				self._eventBind($dom);
			};
		});
	};

	JDB.prototype._eventBind = function($dom) {
		var self = this;
		$dom.on("keyup click", function() {
			var dir = directive.pares($dom.attr('jdb-model'));
			binder.bindObject(self._mock, dir.key, this);
		});
	};

	var jdb = new JDB();

	//注册内建过滤器
	jdb.filter("toUpperCase", function(value) {
			return value.toString().toUpperCase();
		})
		.filter("toLowerCase", function(value) {
			return value.toString().toLowerCase();
		});
	//注册绑定数据监控过滤器处理
	binder.addBindDomWatch(function(rawValue) {
		var dom = this;
		var dir = directive.pares($(dom).attr('jdb-model'));
		var value = rawValue
		if (dir.filter.length) {
			$.each(dir.filter,function(i,item){
				value = jdb._filter[item].call(dom,value);
			})
		} 
		return value;
	});
	return jdb;
});