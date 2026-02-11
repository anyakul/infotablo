<?php
session_start();

ob_start();

include('helpers.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

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

// Удаляем временные интервалы за вчерашний день и ранее
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

  // Удаляем оставшиеся даты (которые стали пустыми)
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
