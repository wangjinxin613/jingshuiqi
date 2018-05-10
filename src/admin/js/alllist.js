layui.config({
	base : "../publics/layui/lay/modules/"
}).use(['form','element','layer','jquery','laydate'],function(){
	var form = layui.form(),
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		element = layui.element(),
		laydate = layui.laydate,
		$ = layui.jquery;

	//跳转属性
	form.on('checkbox(redirecturl)', function(data){
		var jumpTest = document.getElementById('flagsj');
		var jtr = document.getElementById('redirecturltr');
		var jf = document.getElementById('redirecturl');
		if(jumpTest.checked) jtr.style.display = "block";
		else{
			jf.value = '';
			jtr.style.display = "none";
		}
	})
	// 内容回收站
	$("body").on("click",".recyback",function(){
		var _this = $(this);
		var qstr=getCheckboxItem();
		var aid = _this.attr("data-id");
		if(aid==0) aid = getOneItem();
		layer.confirm('确定还原？',{icon:3, title:'提示信息'},function(index){
			$.post("archives_do.php?aid="+aid+"&dopost=return&qstr="+qstr, function(data){
				if(data.status == 1){
					layer.msg(data.msg, {
						icon: 1,
						time: 1000
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
		});
	})
	$("body").on("click",".recydel",function(){
		var _this = $(this);
		var qstr=getCheckboxItem();
		var aid = _this.attr("data-id");
		if(aid==0) aid = getOneItem();
		layer.confirm('确定删除？',{icon:3, title:'提示信息'},function(index){
			$.post("archives_do.php?qstr="+qstr+"&aid="+aid+"&dopost=del&recycle=1", function(data){
				if(data.status == 1){
					layer.msg(data.msg, {
						icon: 1,
						time: 1000
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
		});
	})

	//获得选中文件的文件名
	function getCheckboxItem()
	{
		var allSel="";
		if(document.form2.arcID.value) return document.form2.arcID.value;
		for(i=0;i<document.form2.arcID.length;i++)
		{
			if(document.form2.arcID[i].checked)
			{
				if(allSel=="")
					allSel=document.form2.arcID[i].value;
				else
					allSel=allSel+"`"+document.form2.arcID[i].value;
			}
		}
		return allSel;
	}
	//获得选中其中一个的id
	function getOneItem()
	{
		var allSel="";
		if(document.form2.arcID.value) return document.form2.arcID.value;
		for(i=0;i<document.form2.arcID.length;i++)
		{
			if(document.form2.arcID[i].checked)
			{
					allSel = document.form2.arcID[i].value;
					break;
			}
		}
		return allSel;
	}
	form.on('submit(submit)', function(data){
		var param = data.field;
		//var index = parent.layer.getFrameIndex(window.name);
		$.post(data.form.action, param, function(data){
			if(data.status == 1){
				layer.msg(data.msg, {
					icon: 1,
					time: data.time
				}, function(){
					if(data.gourl != '-1')
					location.href = data.gourl;
				});
				//parent.layer.close(index);
			}else{
				layer.alert(data.msg, {
					icon: 2
				});
			}
		});
		return false;
	});
})
