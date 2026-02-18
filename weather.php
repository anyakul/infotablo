<?php
include 'secret.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept');
$lat = $_GET['lat'];
$lon = $_GET['lon'];
$date = $_GET['date'];
$time = $_GET['time'];
$token = PROJECTEOL_TOKEN;

$url = "https://projecteol.ru/api/weather/?lat={$lat}&lon={$lon}&date={$date}T{$time}&token={$token}";

//$url = "https://api.gismeteo.net/v3/weather/current/?latitude={$lat}&longitude={$lon}&token={$token}";

$response = file_get_contents($url);

if (!$response) {
    die('Ошибка при чтении данных');
}

// Проверяем, что ответ валиден
if (json_decode($response) === null) {
    die('Недопустимый JSON');
}

header('Content-Type: application/json');
echo $response;
?>
