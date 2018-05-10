layui.config({
	base : "../publics/layui/lay/modules/"
}).use(['form','element','layer','jquery'],function(){
	var form = layui.form(),
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		element = layui.element(),
		$ = layui.jquery;

	//添加顶级栏目
	form.on('submit(oxwindow)', function(data){
		var param = data.field;
		var index = parent.layer.getFrameIndex(window.name);
		$.post(data.form.action, param, function(data){
			if(data.status == 1){
				layer.msg(data.msg, {
					icon: 1,
					time: 1000
				}, function(){
					if(data.gourl != '-1')
					location.href = data.gourl;
				});
				parent.layer.close(index);
			}else{
				layer.alert(data.msg, {
					icon: 2
				});
			}
		});
		return false;
	});

})
