<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>Главная</title>
  <link rel="stylesheet" href="/deploy/css/style.min.css">
</head>

<body class="container">
  <div id="player">
    <div class="swiper">
      <div class="swiper-wrapper"></div>
    </div>
    <div class="info" id="info">
      <div class="info-column">
        <div class="info-column">
          <p class="info-item">
            <img src="/deploy/img/погода.svg" width="20" height="20" alt="погода">
            <span class="info-item-span" id="temp">t +23°C</span>
          </p>
          <p class="info-item">
            <img src="/deploy/img/давление.svg" width="20" height="20" alt="давление">
            <span class="info-item-span" id="pressure">730 мм</span>
          </p>
          <p class="info-item">
            <img src="/deploy/img/влага.svg" width="20" height="20" alt="Влага">
            <span class="info-item-span" id="humid">38%</span>
          </p>
          <p class="info-item">
            <img src="/deploy/img/ветер.svg" width="20" height="20" alt="Ветер">
            <span class="info-item-span" id="wind">2 м/c</span>
          </p>
        </div>
        <!--<p class="info-item">Компания АДОР основана в 2002 году</p>-->
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
  <script src="/deploy/js/flatpickr.js"></script>
  <script src="/deploy/js/flatpickru.js"></script>
  <script src="/deploy/js/main.min.js"></script>
</body>

</html>
