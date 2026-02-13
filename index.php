<?php
session_start();

include('helpers.php');

$page_content = include_template('main.php');
print($page_content);
$url='http://informer.gismeteo.ru/xml/27612_1.xml';
$content=file_get_contents($url);
$xml = simplexml_load_string($content);
$tod_array=array('ночь', 'утро','день','вечер');
$rumb_array=array('C', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ');
$text='';
if($xml){
$text.='<div class=«block-head red»><h3><a href="#">Прогноз погоды</a></h3></div><div class=«iTable»><table width=«100%»>';
foreach($xml->REPORT->TOWN->FORECAST as $value){
$tod=(int)$value->attributes()->tod;
$text.='<tr><td>'.$tod_array[$tod].'</td><td>'.(int)$value->TEMPERATURE->attributes()->min.' — '.(int)$value->TEMPERATURE->attributes()->max.' ° C</td><td>'.(int)$value->WIND->attributes()->min.' — '.(int)$value->WIND->attributes()->max.' м\с '.$rumb_array[(int)$value->WIND->attributes()->direction].'</td></tr>';
}
$text.='</table></div>';
}else{
$text.='<b>Информация не доступна</b>';
}