<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>Админка</title>
  <link rel="stylesheet" href="/deploy/css/style.min.css">
</head>

<body class="container">
  <div class="admin-content container">
    <a class="logout-link" href="logout.php">Выйти из админки</a>
    <form id="admin-form" method="post" action="" method="post" enctype="multipart/form-data">
      <div class="calendars">
        <div class="calendar calendar-before">
          <p>От даты</p>
          <div id="calendar-from"></div>
          <button id="gotoTodayFrom" type="button">Перейти к сегодня</button>
        </div>
        <div class="calendar calendar-to">
          <p>До даты</p>
          <div id="calendar-to"></div>
          <button id="gotoTodayTo" type="button">Перейти к сегодня</button>
        </div>
        <button id="calendar-button" type="button">Добавить период</button>
      </div>
      <table class="admin-table">
        <input id="selectedDateFrom" name="date-from" type="hidden">
        <input id="selectedDateTo" name="date-to" type="hidden">
        <thead>
          <tr>
            <th>Время с:</th>
            <th>Время до:</th>
            <th>Материалы для показа</th>
            <th>Загрузка файлов</th>
          </tr>
        </thead>
        <tbody>
          <tr class="admin-item admin-item-7">
            <td class="admin-time">
              <label class="visually-hidden" for="time-from-0">Время показа с:</label>
              <select class="visually-hidden admin-time-from" id="time-from-0" name="time-from[]">
                <option value="7" selected>07:00</option>
              </select>
              07:00
            </td>
            <td class="admin-time">
              <label class="visually-hidden" for="time-to-0">Время показа до:</label>
              <select class="visually-hidden" id="time-to-0" name="time-to[]">
                <option value="8" selected>08:00</option>
              </select>
              08:00
            </td>
            <td class="admin-old-files">
              <ul class="admin-old-files-list admin-old-files-0"></ul>
            </td>
            <td class="admin-new-files">
              <ul class="admin-new-file-list admin-new-file-list-0"></ul>
              <div class="admin-input-files">
                <label class="input-file" for="file-new-0">
                  <input name="files-0[]" id="file-new-0" type="file" multiple accept="image/*, video/*">
                  <span class="admin-file-btn">Выберите файлы</span>
                </label>
              </div>
            </td>
          </tr>
          <tr class="admin-item admin-item-8">
            <td class="admin-time">
              <label class="visually-hidden" for="time-from-1">Время показа с:</label>
              <select class="visually-hidden admin-time-from" id="time-from-1" name="time-from[]">
                <option value="8" selected>08:00</option>
              </select>
              08:00
            </td>
            <td class="admin-time">
              <label class="visually-hidden" for="time-to-1">Время показа до:</label>
              <select class="visually-hidden" id="time-to-1" name="time-to[]">
                <option value="12" selected>12:00</option>
              </select>
              12.00
            </td>
            <td class="admin-old-files">
              <ul class="admin-old-files-list admin-old-files-1"></ul>
            </td>
            <td class="admin-new-files">
              <ul class="admin-new-file-list admin-new-file-list-1"></ul>
              <div class="admin-input-files">
                <label class="input-file" for="file-new-1">
                  <input id="file-new-1" name="files-1[]" type="file" multiple accept="image/*, video/*">
                  <span class="admin-file-btn">Выберите файлы</span>
                </label>
              </div>
            </td>
          </tr>
          <tr class="admin-item admin-item-12">
            <td class="admin-time">
              <label class="visually-hidden" for="time-from-2">Время показа с:</label>
              <select class="visually-hidden admin-time-from" id="time-from-2" name="time-from[]">
                <option value="12" selected>12:00</option>
              </select>
              12:00
            </td>
            <td class="admin-time">
              <label class="visually-hidden" for="time-to-2">Время показа до:</label>
              <select class="visually-hidden" id="time-to-2" name="time-to[]">
                <option value="13" selected>13:00</option>
              </select>
              13:00
            </td>
            <td class="admin-old-files">
              <ul class="admin-old-files-list admin-old-files-2"></ul>
            </td>
            <td class="admin-new-files">
              <ul class="admin-new-file-list admin-new-file-list-2"></ul>
              <div class="admin-input-files">
                <label class="input-file" for="file-new-2">
                  <input id="file-new-2" name="files-2[]" type="file" multiple accept="image/*, video/*">
                  <span class="admin-file-btn">Выберите файлы</span>
                </label>
              </div>
            </td>
          </tr>
          <tr class="admin-item admin-item-13">
            <td class="admin-time">
              <label class="visually-hidden" for="time-from-3">Время показа с:</label>
              <select class="visually-hidden admin-time-from" id="time-from-3" name="time-from[]">
                <option value="13" selected>13:00</option>
              </select>
              13:00
            </td>
            <td class="admin-time">
              <label class="visually-hidden" for="time-to-3">Время показа до:</label>
              <select class="visually-hidden" id="time-to-3" name="time-to[]">
                <option value="17" selected>17:00</option>
              </select>
              17:00
            </td>
            <td class="admin-old-files">
              <ul class="admin-old-files-list admin-old-files-3"></ul>
            </td>
            <td class="admin-new-files">
              <ul class="admin-new-file-list admin-new-file-list-3"></ul>
              <div class="admin-input-files">
                <label class="input-file" for="file-new-3">
                  <input id="file-new-3" name="files-3[]" type="file" multiple accept="image/*, video/*">
                  <span class="admin-file-btn">Выберите файлы</span>
                </label>
              </div>
            </td>
          </tr>
          <tr class="admin-item admin-item-17">
            <td class="admin-time">
              <label class="visually-hidden" for="time-from-4">Время показа с:</label>
              <select class="visually-hidden admin-time-from" id="time-from-4" name="time-from[]">
                <option value="17" selected>17:00</option>
              </select>
              17:00
            </td>
            <td class="admin-time">
              <label class="visually-hidden" for="time-to-4">Время показа до:</label>
              <select class="visually-hidden" id="time-to-4" name="time-to[]">
                <option value="18" selected>18:00</option>
              </select>
              18:00
            </td>
            <td class="admin-old-files">
              <ul class="admin-old-files-list admin-old-files-4"></ul>
            </td>
            <td class="admin-new-files">
              <ul class="admin-new-file-list admin-new-file-list-4"></ul>
              <div class="admin-input-files">
                <label class="input-file" for="file-new-4">
                  <input id="file-new-4" name="files-4[]" type="file" multiple accept="image/*, video/*">
                  <span class="admin-file-btn">Выберите файлы</span>
                </label>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <button class="admin-submit-button" type="submit">Сохранить</button>
    </form>
  </div>
  <script src="/deploy/js/flatpickr.js"></script>
  <script src="/deploy/js/flatpickru.js"></script>
  <script src="/deploy/js/main.min.js"></script>
</body>

</html>
