<?php
session_start();

ob_start();

include('helpers.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

  $files_sql = "
    SELECT f.files, f.thumbs FROM files f
    WHERE f.time_id IN (
      SELECT t.id
      FROM times t
      WHERE t.date_id IN (
        SELECT d.id
        FROM dates d
        WHERE d.dates < CURDATE()
      )
    )
  ";

  $res_files = mysqli_query($con, $files_sql);
  $files = mysqli_fetch_all($res_files, MYSQLI_ASSOC);

  foreach ($files as $file) {
    $fileName = $file['files'];
    $thumbsName = $file['thumbs'];
    $files_name_sql = "
      SELECT id FROM files f
      WHERE f.files = '$fileName' 
      AND f.time_id IN (
        SELECT t.id
        FROM times t
        WHERE t.date_id IN (
          SELECT d.id
          FROM dates d
          WHERE d.dates >= CURDATE()
        )
      )
    ";

    $files_name_query = mysqli_query($con, $files_name_sql);
    $count = mysqli_num_rows($files_name_query);

    if ($count === 0) {
      $uploadDir = "uploads/";
      $fullPath = $uploadDir . $fileName;
      $thumbsPath = $uploadDir . $thumbsName;
      unlink($fullPath);
      unlink($thumbsPath);
    }
  }

  // Удаляем связанные файлы
  $sqlDeleteFiles = "
      DELETE FROM files
      WHERE time_id IN (
        SELECT id
        FROM times
        WHERE date_id IN (
            SELECT id
            FROM dates
            WHERE dates < CURDATE()
        )
      )
  ";
  $stmt_DeleteFiles = db_get_prepare_stmt($con, $sqlDeleteFiles);
  $res_DeleteFiles = mysqli_stmt_execute($stmt_DeleteFiles);

  // Удаляем связанные файлы
  $sqlDeleteFiles = "
      DELETE FROM files
      WHERE time_id IN (
        SELECT id
        FROM times
        WHERE date_id IN (
            SELECT id
            FROM dates
            WHERE dates < CURDATE()
        )
      )
  ";
  $stmt_DeleteFiles = db_get_prepare_stmt($con, $sqlDeleteFiles);
  $res_DeleteFiles = mysqli_stmt_execute($stmt_DeleteFiles);

  $sqlDeleteTimes = "
      DELETE FROM times
      WHERE date_id IN (
        SELECT id
        FROM dates
        WHERE dates < CURDATE()
      )
  ";
  $stmt_DeleteTimes = db_get_prepare_stmt($con, $sqlDeleteTimes);
  $res_DeleteTimes = mysqli_stmt_execute($stmt_DeleteTimes);

  $sqlDeleteEmptyDates = "
      DELETE FROM dates
      WHERE id NOT IN (
        SELECT DISTINCT date_id
        FROM times
      ) AND dates < CURDATE()
  ";
  $stmt_DeleteEmptyDates = db_get_prepare_stmt($con, $sqlDeleteEmptyDates);
  $res_DeleteEmptyDates = mysqli_stmt_execute($stmt_DeleteEmptyDates);
  exit;
} else {
  echo "Запрос не является POST.";
}
?>
