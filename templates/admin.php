<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>videojs-playlist Demo</title>
  <link rel="stylesheet" href="/deploy/css/style.min.css">
</head>

<body class="container">
  <div class="admin-content container">
    <a class="logout-link" href="logout.php">Выйти из админки</a>
    <form id="admin-form" method="post" action="" method="post" enctype="multipart/form-data">
      <div class="calendar">
        <div id="calendar"></div>
        <button id="gotoToday" type="submit">Перейти к сегодня</button>
      </div>
      <table class="admin-table">
        <input id="selectedDate" name="date" type="hidden">
        <thead>
          <tr>
            <th>Время с:</th>
            <th>Время до:</th>
            <th>Старые файлы</th>
            <th>Новые файлы</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
      <button class="admin-submit-button" type="submit">Сохранить</button>
    </form>
  </div>
  <script src="/deploy/js/flatpicr.js"></script>
  <script src="/deploy/js/main.min.js"></script>
  <script src="https://npmcdn.com/flatpickr/dist/l10n/ru.js"></script>
</body>

</html>
