/**
 *
 * 负责指令的解析
 * @create time : 2015-07-03
 * @author		: zack
 * @version		: 0.0.1
 * @License		: MIT
 *
 */

 define(["jquery"], function($){ 	

 	function Directive(){};

 	/**
	 * 解析
 	 */
 	Directive.prototype.pares = function(directive) {
 		var key,filter;
 		var rex = /([\w,$,\.,\[,\]]+)\s+\|\s+([\w,$,\.,\[,\],\s]+)/;
		if (rex.test(directive)) {
			//带过滤器的表达式
			key= rex.exec(directive)[1];
			var filterStr = $.trim(rex.exec(directive)[2]);
			filter = filterStr.replace(/\s{2,}/g, " ").split(" ");
		}else{
			key= directive;
			filter=[];
		}
		return {
			key:key,
			filter:filter
		};
 	};
 	return new Directive();
 });