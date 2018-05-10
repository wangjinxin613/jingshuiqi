<html>
<head>
<title>DedeCMS提示信息</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
>
<meta name="renderer" content="webkit">
<meta http-equiv="Cache-Control" content="no-siteapp" /></head>
<body>
<script type="text/javascript" src="layui/layui.js"></script><script>
			layui.config({
				base : "js/"
			}).use(["element","layer","jquery"],function(){
				var layer = parent.layer === undefined ? layui.layer : parent.layer,
					element = layui.element(),
					$ = layui.jquery;
				$(function(){
					layer.msg("验证码不正确!");
				});
			})
    </script></body>
</html>
