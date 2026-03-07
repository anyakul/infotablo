<?php
session_start();

ob_start();

include('helpers.php');

$required = ['date', 'file'];
$errors = [];
$data = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $startDate = date_create($_POST['date-from']);
  $endDate = date_create($_POST['date-to']);
  $endDate->modify('+1 day');
  $interval = DateInterval::createFromDateString('1 day');
  $period = new DatePeriod($startDate, $interval, $endDate);

  $allDates = [];

  foreach ($period as $dt) {
    $dayOfWeek = (int)$dt->format('w');
    if ($dayOfWeek !== 0 && $dayOfWeek !== 6) {
      $allDates[] = $dt->format('Y-m-d');
    }
  }

  foreach ($allDates as $date) {
    $date_id_sql = "SELECT id FROM dates WHERE dates = '$date'";
    $date_id_query = mysqli_query($con, $date_id_sql);
    $count = mysqli_num_rows($date_id_query);

    if ($count === 0) {
      $sql_dates = "INSERT INTO dates (dates) VALUES ('$date')";
      $stmt_dates = db_get_prepare_stmt($con, $sql_dates);
      $res_dates  = mysqli_stmt_execute($stmt_dates);
      $date_id = mysqli_insert_id($con);

      $sql_time_7 = "INSERT INTO times (date_id, time_from, time_to) VALUES ('$date_id', '7', '8')";
      $stmt_time_7 = db_get_prepare_stmt($con, $sql_time_7);
      $time_id_7_query = mysqli_stmt_execute($stmt_time_7);

      $sql_time_8 = "INSERT INTO times (date_id, time_from, time_to) VALUES ('$date_id', '8', '12')";
      $stmt_time_8 = db_get_prepare_stmt($con, $sql_time_8);
      $time_id_8_query = mysqli_stmt_execute($stmt_time_8);

      $sql_time_12 = "INSERT INTO times (date_id, time_from, time_to) VALUES ('$date_id', '12', '13')";
      $stmt_time_12 = db_get_prepare_stmt($con, $sql_time_12);
      $time_id_12_query = mysqli_stmt_execute($stmt_time_12);

      $sql_time_13 = "INSERT INTO times (date_id, time_from, time_to) VALUES ('$date_id', '13', '17')";
      $stmt_time_13 = db_get_prepare_stmt($con, $sql_time_13);
      $time_id_13_query = mysqli_stmt_execute($stmt_time_13);

      $sql_time_17 = "INSERT INTO times (date_id, time_from, time_to) VALUES ('$date_id', '17', '18')";
      $stmt_time_17 = db_get_prepare_stmt($con, $sql_time_17);
      $time_id_17_query = mysqli_stmt_execute($stmt_time_17);
    } else {
      $row = $date_id_query->fetch_assoc();
      $date_id = $row['id'];
    }

    $time_from_values = $_POST['time-from'];
    $time_to_values = $_POST['time-to'];

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
          $file_full_path = "uploads/" . $file_name;
          $thumbnail_name = pathinfo($file_name, PATHINFO_FILENAME) . '.jpg';
          $thumbnail_path = "uploads/" . $thumbnail_name;

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

          if ($file_name != '') {
            if (!file_exists($file_full_path)) {
              move_uploaded_file($file_tmp_name, "uploads/$file_name");

              if ($file_type === 'video') {
                system("C:/ffmpeg/bin/ffmpeg.exe -i uploads\\$file_name -ss 00:00:01 -vframes 1 -q:v 2 uploads\\$thumbnail_name 2>&1");
              } else {
                $thumbnail_path = "$file_name";
              }
            }
            $sql_files = "INSERT INTO files (time_id, files, types, thumbs) VALUES ('$time_id', '$file_name', '$file_type', '$thumbnail_name')";
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
        foreach ($deleteFiles as $fileName) {
          $sql_delete_files = "DELETE FROM files WHERE files = '$fileName' AND time_id = '$time_id'";
          $stmt_delete_files = db_get_prepare_stmt($con, $sql_delete_files);
          $res_file  = mysqli_stmt_execute($stmt_delete_files);
          $file_id_sql = "SELECT id FROM files WHERE files = '$fileName'";
          $file_id_query = mysqli_query($con, $file_id_sql);
          $count = mysqli_num_rows($file_id_query);

          if ($count === 0) {
            $thumbnail_name = pathinfo($fileName, PATHINFO_FILENAME) . '.jpg';
            $uploadDir = "uploads/";
            $fullPath = $uploadDir . $fileName;
            $thumbsPath = $uploadDir . $thumbnail_name;
            unlink($fullPath);
            unlink($thumbsPath);
          }
        }
      }
      $index = $index + 1;
    }
  }

  // Выполняем запросы к базе данных
  $sql_video = "SELECT d.dates, t.time_from, t.time_to, f.types, f.id, f.files, f.time_id, f.thumbs FROM dates d INNER JOIN times t ON t.date_id = d.id LEFT JOIN files f ON f.time_id = t.id WHERE d.dates = '$formatedDate'";

  $res_video = mysqli_query($con, $sql_video);
  $video = mysqli_fetch_all($res_video, MYSQLI_ASSOC);

  $sql_times = "SELECT t.id, t.date_id, t.time_from, t.time_to, d.dates FROM dates d INNER JOIN times t ON t.date_id = d.id WHERE d.dates = '$dates' ORDER BY t.time_from;";

  $res_times = mysqli_query($con, $sql_times);
  $times = mysqli_fetch_all($res_times, MYSQLI_ASSOC);

  $page_content = include_template('admin.php');
  print($page_content);

 // Готовим JSON-ответ
  $response = [
    'success' => true,
    'times' => $times,
    'files' => $video,
    'period' => $period,
    'allDates' => $allDates
  ];

  ob_end_clean();

  header('Content-Type: application/json');
  echo json_encode($response);
  exit;
} else {
  echo "Запрос не является POST.";
}
