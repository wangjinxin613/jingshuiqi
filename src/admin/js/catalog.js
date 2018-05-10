layui.config({
	base : "../publics/layui/lay/modules/"
}).use(['form','element','layer','jquery'],function(){
	var form = layui.form(),
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		element = layui.element(),
		$ = layui.jquery;
	/*
	$("input[name^='sortrank']").on("blur",function(){
		var param = {'cid':$(this).attr('name').match(/[0-9]+/),'sortrank':$(this).val()}
		$.post('catalog_do.php?dopost=upRank', param, function(data){
			if(data.status == 1){
				layer.msg(data.msg, {
					icon: 1,
					time: 1000
				}, function(){
					location.href = data.gourl;
				});
			}else{
				layer.alert(data.msg, {
					icon: 2
				});
			}
		});

		return false;
	})
	*/
	
	//修改栏目排序
	form.on('submit(upRankAll)', function(data){
		var param = data.field;
		$.post('catalog_do.php?dopost=upRankAll', param, function(data){
			if(data.status == 1){
				layer.msg(data.msg, {
					icon: 1,
					time: 1000
				}, function(){
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
	//添加栏目
	//改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
	/*
	$(window).one("resize",function(){
		$(".catalogAddAll").click(function(){
			var index = layui.layer.open({
				fix: false, //不固定
				maxmin: true,
				shadeClose: true,
				title : "增加顶级栏目",
				type : 2,
				content : "catalog_add.php?listtype=all",
				end: function () {
					location.reload();
				}
			})			
			layui.layer.full(index);
		})
	}).resize();
	*/
	//栏目交叉
	form.on('radio(cross)', function(data){
		if(data.value == 2) $('#crossid').show();
		else $('#crossid').hide();
		form.render('radio');
	})
	//文件保存目录
	form.on('checkbox(upinyin)', function(data){
		var upinyin = document.getElementById('upinyin');
		var tpobj = document.getElementById('typedir');
		if(upinyin.checked) tpobj.style.display = "none";
		else tpobj.style.display = "block";
	})
	//内容模型
	form.on('select(channeltype)', function(data){
		var sevvalue = channelArray[data.value];
		var tobj = document.getElementById('smclass');
		var tempindex = document.getElementsByName('tempindex');
		var templist = document.getElementsByName('templist');
		var temparticle = document.getElementsByName('temparticle');
		var dfstyle = document.getElementsByName('dfstyle');
		var dfstyleValue = dfstyle[0].value;
		tempindex[0].value = dfstyleValue+"/index_"+sevvalue+".htm";
		templist[0].value = dfstyleValue+"/list_"+sevvalue+".htm";
		temparticle[0].value = dfstyleValue+"/article_"+sevvalue+".htm";
		if(data.value < 0)
		{
			if(Nav()=='IE') tobj.style.display = "block";
			else tobj.style.display = "block";
		}
		else
		{
			tobj.style.display = "none";
		}
		form.render('select');
	})
	//添加顶级栏目
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
	//删除栏目
	$("body").on("click",".catalog_del",function(){
		var _this = $(this);
		layer.confirm('确定删除？',{icon:3, title:'提示信息'},function(index){
			$.post('catalog_del.php?dopost=ok', {'id':_this.attr("data-id")}, function(data){
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
	//更新栏目缓存
	$(".upcatcache").on("click",function(){
		$.post('catalog_do.php?dopost=upcatcache', function(data){
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
	})
	//批量增加栏目 栏目选择
	form.on('select(reid)', function(data){
		if(data.value != 0)
		{
			$("#addQuickRel").show();
			$("#pathtype").show();
			$("#addQuick").hide();
			$("#savetype").val('rel');
		} else {
			$("#addQuickRel").hide();
			$("#addQuick").show();
			$("#pathtype").hide();
			$("#savetype").val('');
		}
		form.render('select');
	})
$(document).ready(function(){
    //删除按钮事件
    $(".layui-btn-danger").click(function() {
        $(this).parents(".repeat").remove();
    });
    //添加按钮事件
    $("#add").click(function(){
		//var id = $("#addQuick tr").prevAll("tr").length + 2;
		var id = parseInt($("#addQuick tr:last-child").find(".rank input").attr("value")) + 1;
        $("#addQuick tr:eq(1)").clone(true).addClass("repeat")
			.find(".rank input")
                .attr("value",function(){return id})
				.end()
            .find(".pubinputs")
                .attr("name",function(){return this.name+id})
				.attr("id",function(){return this.id+id})
                .end()
            .appendTo($("#addQuick"));
    });
	//添加按钮事件
    $("#addrel").click(function(){
		//var id = $("#addQuickRel tr").prevAll("tr").length + 2;
		var id = parseInt($("#addQuickRel tr:last-child").find(".rank input").attr("value")) + 1;
        $("#addQuickRel tr:eq(1)").clone(true).addClass("repeat")
			.find(".rank input")
                .attr("value",function(){return id})
				.end()
            .find(".pubinputs")
                .attr("name",function(){return this.name+id})
				.attr("id",function(){return this.id+id})
                .end()
            .appendTo($("#addQuickRel"));
    });
});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})
