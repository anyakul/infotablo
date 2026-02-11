export const info = () => {
  const info = document.querySelector('#info');

  function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric'};
    return date.toLocaleDateString('ru-RU', options);
  }

  function formatDateNums(date) {
    const day = (date.getDate() < 10) ? ('0' + (date.getDate())) : (date.getDate());
    const month = (date.getMonth() < 10) ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  function formatWeekday(date) {
    const options = { weekday: 'long'};
    return date.toLocaleDateString('ru-RU', options);
  }

  function updateClock() {
    const clockElement = info.querySelector('#time');
    const currentTime = new Date();

    // Форматируем время в виде чч:мм
    const hours = String(currentTime.getHours()).padStart(2, '0');
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');

    clockElement.textContent = `${hours}:${minutes}`;
  }

  function updatedate() {
    const currentDate = new Date();
    info.querySelector('#current_date').textContent = formatDate(currentDate);
    info.querySelector('#weekday').textContent = formatWeekday(currentDate);
  }

  function updateWeather() {
    const lat = 53.507852;
    const lon = 49.420411;
    const date = new Date();
    const currentDate = formatDateNums(date);
    const time = date.getHours() + ':00';
    console.log(currentDate);
    console.log(time);

    fetch(`/weather.php?lat=${lat}&lon=${lon}&date=${currentDate}&time=${time}`)
      .then(response => response.json())
      .then(data => {
        info.querySelector('#temp').textContent = 't ' + Math.round(data[0].temp_100_cel) + '°C';
        info.querySelector('#pressure').textContent = Math.round(data[0].pres_surf / 133.322) + ' мм';
        info.querySelector('#humid').textContent = Math.round(data[0].vlaga_2) + '%';
        info.querySelector('#wind').textContent = Math.round(data[0].wind_speed_10) + ' м/c';
      })
      .catch(error => {
        console.error('Ошибка:', error);
      });
  }

  function calculateTimeUntilMinute() {
    const now = new Date();
    const secondsRemaining = 60 - now.getSeconds();
    const millisecondsRemaining = secondsRemaining * 1000;
    return millisecondsRemaining;
  }

  function calculateTimeUntilHour() {
    const now = new Date();
    const nextHour = new Date(now.getTime() + (60 - now.getMinutes()) * 60 * 1000);
    nextHour.setSeconds(0, 0);
    return nextHour.getTime() - now.getTime();
  }

  function calculateTimeUntilMidnight() {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    return tomorrow.getTime() - now.getTime();
  }

  if (info) {
    updateClock();
    updatedate();
    updateWeather();

    const msUntilMinute = calculateTimeUntilMinute();
    const msUntilHour = calculateTimeUntilHour();
    const msUntilMidnight = calculateTimeUntilMidnight();
    setTimeout(setInterval(updateClock, 60000), msUntilMinute);
    setTimeout(setInterval(updateWeather, 60 * 60 * 1000), msUntilHour);
    setTimeout(setInterval(updatedate, 24 * 60 * 60 * 1000), msUntilMidnight);
  }
}
