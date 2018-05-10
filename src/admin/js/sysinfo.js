layui.config({
	base : "../publics/layui/lay/modules/"
}).use(['form','element','layer','jquery'],function(){
	var form = layui.form(),
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		element = layui.element(),
		$ = layui.jquery;

	var cfg = {
		path: "js/zeroclipboard.swf",
		copy: function(){
		return $(this).text();
		},
		beforeCopy:function(){
			$(this).css("color","orange");
		},
		afterCopy:function(){
			layer.msg('复制成功', {icon: 1,time: 1000});
		}
	};
    $(".zerocopy").mouseover(function(){
		$(this).css("color","blue");
		if(!$(this).data('init')){$(this).zclip(cfg);$(this).data('init',true)}
	})
	$(".zerocopy").mouseout(function(){
        $(this).css("color","");
    })
	form.on('submit(submit)', function(data){
		var param = data.field;
		$.post(data.form.action, param, function(data){
			if(data.status == 1){
				layer.msg(data.msg, {
					icon: 1,
					time: data.time
				}, function(){
					if(data.gourl != '-1')
					location.href = data.gourl;
				});
			}else{
				layer.alert(data.msg, {
					icon: 2
				});
			}
		});
		return false;
	});
	//删除变量
	$("body").on("click",".sys_del",function(){
		var _this = $(this);
		layer.confirm('确定删除？',{icon:3, title:'提示信息'},function(index){
			$.post('sys_info.php?dopost=del', {'aid':_this.attr("data-id")}, function(data){
				if(data.status == 1){
					layer.msg(data.msg, {
						icon: 1,
						time: 1000
					}, function(){
						if(data.gourl != '-1')
						location.href = data.gourl;
					});
					layer.close(index);
				}else{
					layer.alert(data.msg, {
						icon: 2
					});
				}
			});
		});
	})
})
