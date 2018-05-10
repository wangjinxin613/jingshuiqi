<?php
if(!isset($GLOBALS['_vars'])) $GLOBALS['_vars'] = array(); 
$fields = array();
?><!DOCTYPE html>
<html>
<head>
<meta charset="<?php echo $cfg_soft_lang; ?>">
<title><?php echo $cfg_softname; ?></title>
<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="format-detection" content="telephone=no">
<link rel="stylesheet" href="../publics/layui/css/layui.css" media="all" />
<link rel="stylesheet" href="../publics/iconfont/iconfont.css" media="all" />
<link rel="stylesheet" href="css/admin.css" media="all" />
<script language="javascript">

function selAll()
{
	for(i=0;i<document.form2.arcID.length;i++)
	{
		if(!document.form2.arcID[i].checked)
		{
			document.form2.arcID[i].checked=true;
		}
	}
}
function noSelAll()
{
	for(i=0;i<document.form2.arcID.length;i++)
	{
		if(document.form2.arcID[i].checked)
		{
			document.form2.arcID[i].checked=false;
		}
	}
}
</script>
</head>
<body class="childrenBody">
<div class="x-nav">
	<span class="layui-breadcrumb">
	  <a href="index_body.php">首页</a>
	  <a><cite>文档回收站</cite></a>
	</span>
	<a class="layui-btn layui-btn-small refresh" href="javascript:location.replace(location.href);" title="刷新"><i class="iconfont icon-refresh" style="line-height:30px"></i></a>
</div>
<div class="layui-form layui-mt-10 news_list">
<form name="form2">
	<table class="layui-table">
		<colgroup>
			<col width="60">
			<col width="5%">
			<col>
			<col width="8%">
			<col width="8%">
			<col width="6%">
			<col width="15%">
		</colgroup>
		<thead>
			<tr>
				<th>选择</th>
				<th>ID</th>
				<th style="text-align:left;">文章标题</th>
				<th>更新时间</th>
				<th>所属栏目</th>
				<th>点击</th>
				<th>操作</th>
			</tr> 
		</thead>
		<tbody class="news_content">
			<?php
$atts = array();
$atts['tagname'] = 'datalist';
$blockValue = $this->refObj->GetArcList($atts,$this->refObj,$fields); 
if(is_array($blockValue)){
foreach( $blockValue as $key=>$fields )
{
?>
			<tr>
				<td><input type="checkbox" name="arcID" id="arcID" value="<?php echo $fields['id']; ?>" lay-ignore></td>
				<td><?php echo $fields['id']; ?></td>
				<td align="left"><a href='archives_do.php?aid=<?php echo $fields['id']; ?>&dopost=editArchives'><?php echo $fields['title']; ?></a></td>
				<td><?php echo GetDateMk($fields['senddate']); ?></td>
				<td><?php echo $fields['typename']; ?></td>
				<td><?php echo $fields['click']; ?></td>
				<td>
				<a class="layui-btn layui-btn-mini recyback" data-id="<?php echo $fields['id']; ?>">还原</a>
				<a class="layui-btn layui-btn-mini layui-btn-danger recydel" data-id="<?php echo $fields['id']; ?>">删除</a>
				</td>
			</tr>
			<?php
}
}?>
<tr>
<td align="left" colspan="10" style="padding-left:0;">
	&nbsp;
<a href="javascript:selAll()" class="layui-btn layui-btn-small">全选</a>
<a href="javascript:noSelAll()" class="layui-btn layui-btn-small">取消</a>
<a class="layui-btn layui-btn-small recyback">&nbsp;还原&nbsp;</a>
<a class="layui-btn layui-btn-small layui-btn-danger recydel" data-id="0">&nbsp;删除&nbsp;</a>
</td>
</tr>
		</tbody>
	</table>
</form>
	<div id="page">
		<div class="layui-box layui-laypage layui-laypage-default">
			<?php
$atts = array();
$atts['tagname'] = 'pagelist';
$atts['listsize'] = '3';
 echo $this->refObj->GetPageList($atts,$this->refObj,$fields); 
?>

		</div>
	</div>
</div>
<script type="text/javascript" src="../publics/layui/layui.js"></script>
<script type="text/javascript" src="js/alllist.js"></script>
</body>
</html>