<?php
include('helpers.php');

// Получаем дату из POST-запроса
$date = $_POST['date'];

// Форматируем дату
$formatedDate = date("Y-m-d", strtotime($date));

// Выполняем запросы к базе данных
$sql_video = "SELECT d.dates, t.time_from, t.time_to, f.types, f.id, f.files, f.time_id FROM dates d INNER JOIN times t ON t.date_id = d.id LEFT JOIN files f ON f.time_id = t.id WHERE d.dates = '$formatedDate'";

$res_video = mysqli_query($con, $sql_video);
$video = mysqli_fetch_all($res_video, MYSQLI_ASSOC);

$sql_times = "SELECT t.id, t.date_id, t.time_from, t.time_to, d.dates FROM dates d INNER JOIN times t ON t.date_id = d.id WHERE d.dates = '$formatedDate' ORDER BY t.time_from;";

$res_times = mysqli_query($con, $sql_times);
$times = mysqli_fetch_all($res_times, MYSQLI_ASSOC);

// Готовим JSON-ответ
$response = [
  'success' => true,
  'times' => $times,
  'files' => $video
];

header('Content-Type: application/json');
echo json_encode($response);
exit;
?>
