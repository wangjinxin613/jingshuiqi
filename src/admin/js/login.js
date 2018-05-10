layui.config({
	base : "../publics/layui/lay/modules/"
}).use(['form','layer'],function(){
	var form = layui.form(),
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		$ = layui.jquery;
	$("input[name='userid']").focus();
	//登录按钮事件
	form.on('submit(login)', function(data){
		var param = data.field;
		$.post('login.php', param, function(data){
			if(data.status == 1){
				location.href = 'index.php';
			}else{
				layer.alert(data.msg, {icon: 2});
				$(".code img").click();
			}
		});
		return false;
	});
})
