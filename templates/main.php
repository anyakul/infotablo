<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>videojs-playlist Demo</title>
  <link rel="stylesheet" href="/deploy/css/style.min.css">
</head>

<body class="container">
  <div id="player">
    <div class="swiper">
      <div class="swiper-wrapper"></div>
    </div>
    <div class="info" id="info">
      <div class="info-column">
        <p class="info-item">Компания АДОР основана в 2002 году</p>
      </div>
      <div class="info-column">
        <p class="info-item" id="weekday">Среда</p>
        <p class="info-item" id="current_date">14 мая 2025</p>
        <p class="info-item" id="time">15.30</p>
      </div>
    </div>
  </div>
  <button id="player-fullscreen" type="button">На весь экран</button>
  <h2 class="player-header">Сегодня:</h2>
  <div class="player-blocks"></div>
  <script src="/deploy/js/flatpicr.js"></script>
  <script src="/deploy/js/main.min.js"></script>
</body>

</html>
