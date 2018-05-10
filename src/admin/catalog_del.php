<?php
/**
 * 删除栏目
 *
 * @version        $Id: catalog_del.php 1 14:31 2010年7月12日Z tianya $
 * @package        DedeCMS.Administrator
 * @copyright      Copyright (c) 2007 - 2010, DesDev, Inc.
 * @license        http://help.dedecms.com/usersguide/license.html
 * @link           http://www.dedecms.com
 */
require_once(dirname(__FILE__).'/config.php');

//检查权限许可
CheckPurview('t_Del,t_AccDel');
require_once(DEDEINC.'/typeunit.class.admin.php');
require_once(DEDEINC.'/oxwindow2.class.php');
$id = trim(preg_replace("#[^0-9]#", '', $id));

//检查栏目操作许可
CheckCatalog($id,"你无权删除本栏目！",'','',1,0);
$dsql->SetQuery("SELECT typename,typedir FROM #@__arctype WHERE id=".$id);
$row = $dsql->GetOne();
if(empty($dopost)) $dopost='';
if($dopost=='ok')
{
	$delfile = $row['typedir'];
    $ut = new TypeUnit();
    $ut->DelType($id,$delfile);
    UpDateCatCache();
    layerMsg("成功删除一个栏目！","catalog_main.php",1);
    exit();
}

$wintitle = "删除栏目确认";
$wecome_info = "删除栏目确认";
$win = new OxWindow();
$win->Init('catalog_del.php','js/blank.js','POST');
$win->AddHidden('id',$id);
$win->AddHidden('dopost','ok');
$win->AddTitle("你确定要删除栏目： [{$row['typename']}] 吗？");
$win->AddItem('栏目文件目录：',"<p class=\"form-control-static\">{$row['typedir']}</p>");
$win->AddItem('是否删除文件：',"<div class=\"radio radio-primary radio-inline\"><input type=\"radio\" name=\"delfile\" id=\"delfile1\" value=\"no\" checked='1'><label for=\"delfile1\">否</label></div><div class=\"radio radio-primary radio-inline\"><input type=\"radio\" name=\"delfile\" id=\"delfile2\" value=\"yes\"><label for=\"delfile2\">是</label></div>");
$winform = $win->GetWindow('ok');
$win->Display();