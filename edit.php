<?php
session_start();

ob_start();

include('helpers.php');

$required = ['date', 'file'];
$errors = [];
$data = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $dates = $_POST['date'];
  $date_id_sql = "SELECT id FROM dates WHERE dates = '$dates'";
  $date_id_query = mysqli_query($con, $date_id_sql);
  $time_from_values = $_POST['time-from'];
  $time_to_values = $_POST['time-to'];
  $index = 0;
  $row = $date_id_query->fetch_assoc();
  $date_id = $row['id'];

  foreach ($time_from_values as $index => $time_from) {
    $time_to = $time_to_values[$index];
    $time_id_sql = "SELECT t.id FROM times t INNER JOIN dates d ON t.date_id = d.id WHERE t.date_id = '$date_id' AND t.time_from = '$time_from'";
    $time_id_query = mysqli_query($con, $time_id_sql);
    $row = $time_id_query->fetch_assoc();
    $time_id = $row['id'];
    $files = $_FILES["files-" . $index];

    if (isset($files)) {
      $files = $files;
    } else {
      echo "Файл не отправлен.";
    }

    if (isset($files['tmp_name'])) {
      foreach ($files['tmp_name'] as $file_key => $file_tmp_name) {
        $file_name = $files['name'][$file_key];
        $extension = strtolower(pathinfo($files['name'][$file_key], PATHINFO_EXTENSION));

        switch ($extension) {
          case 'jpg':
          case 'jpeg':
          case 'png':
          case 'svg':
          case 'webp':
            $file_type = 'image';
            break;
          default:
            $file_type = 'video';
            break;
        }

        move_uploaded_file($file_tmp_name, "uploads/$file_name");

        if ($file_name != '') {
          $sql_files = "INSERT INTO files (time_id, files, types) VALUES ($time_id, '$file_name', '$file_type')";
          $stmt_files = $con->prepare($sql_files);
          $stmt_files = db_get_prepare_stmt($con, $sql_files);
          $res_file  = mysqli_stmt_execute($stmt_files);
        }
      }
    }

    if ($files['error'] === UPLOAD_ERR_OK) {
      $fileName = basename($files['name']);
      $uploadDir = "uploads/";
      $fullPath = $uploadDir . $fileName;

      if (move_uploaded_file($files['tmp_name'], $fullPath)) {
        echo "Файл успешно загружен.\n";
        exit;
      } else {
        echo "Ошибка при сохранении файла.";
      }
    }
    $deleteFiles = $_POST['delete-files-' . $index];

    if (!empty($deleteFiles)) {
      foreach ($deleteFiles as $fileId) {
        $sql_delete_files = "DELETE FROM files WHERE id = '$fileId'";
        $stmt_delete_files = db_get_prepare_stmt($con, $sql_delete_files);
        $res_file  = mysqli_stmt_execute($stmt_delete_files);
      }
    }
    $index = $index + 1;
  }

  // Выполняем запросы к базе данных
  $sql_video = "SELECT d.dates, t.time_from, t.time_to, f.types, f.id, f.files, f.time_id FROM dates d INNER JOIN times t ON t.date_id = d.id LEFT JOIN files f ON f.time_id = t.id WHERE d.dates = '$dates'";

  $res_video = mysqli_query($con, $sql_video);
  $video = mysqli_fetch_all($res_video, MYSQLI_ASSOC);

  $sql_times = "SELECT t.id, t.date_id, t.time_from, t.time_to, d.dates FROM dates d INNER JOIN times t ON t.date_id = d.id WHERE d.dates = '$dates' ORDER BY t.time_from;";

  $res_times = mysqli_query($con, $sql_times);
  $times = mysqli_fetch_all($res_times, MYSQLI_ASSOC);

  // Готовим JSON-ответ
  $response = [
    'success' => true,
    'times' => $times,
    'files' => $video
  ];

  ob_end_clean();

  header('Content-Type: application/json');
  echo json_encode($response);
  exit;
} else {
  echo "Запрос не является POST.";
}
?>
