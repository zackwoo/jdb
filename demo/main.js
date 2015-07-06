requirejs.config({
	//By default load any module IDs from js/lib
	baseUrl: './',
	//except, if the module ID starts with "app",
	//load it from the js/app directory. paths
	//config is relative to the baseUrl, and
	//never includes a ".js" extension since
	//the paths config could be for a directory.
	paths: {
		jquery: 'bower_components/jquery/dist/jquery',
		jdb:'../source/jdb',
		model:'../source/model',
		directive:'../source/directive',
		binder:'../source/binder'
	}
});
require(['data','jdb'], function(data,jdb) {
	var mockObj = jdb.bind(data);

	$("#btnAge").click(function(){
		$.each(mockObj.list,function(index,item){
			item.age.set(20)
		})
		console.log(jdb._mock.currentUser.name.get());
	});
});

