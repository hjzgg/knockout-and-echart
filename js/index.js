require(['jquery', 'knockout', 'director'],function ($,ko){
	window.addRouter = function(path, func) {
		var pos = path.indexOf('/:');
		var truePath = path;
		if (pos != -1)
			truePath = path.substring(0,pos);
		func = func || function() {
			var params = arguments;
			initPage('pages' + truePath, params);
		}
		var tmparray = truePath.split("/");
		if(tmparray[1] in router.routes && tmparray[2] in router.routes[tmparray[1]] && tmparray[3] in router.routes[tmparray[1]][tmparray[2]]){
			return;
		}else{
			router.on(path, func);
			if (pos != -1)
				router.on(truePath, func);
		}
	}

	window.router = Router();
	
	$(function(){
		addRouter("/pie/pie");
		addRouter("/pie2/pie");
		addRouter("/dashBoard/board");
	    window.router.init();
	});  

	function initPage(p, id) {
		var module = p;
		requirejs.undef(module);
		require([module], function(module) {
			ko.cleanNode($('#content')[0]);
			$('#content').html('');
			$('#content').html(module.template);
			if(module.model){
				ko.applyBindings(module.model, $('#content')[0]);
				module.init(id);
			}else{
				module.init(id, $('#content')[0]);
			}
		})
	}

});