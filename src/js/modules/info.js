export const info = () => {
  const info = document.querySelector('#info');

  function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric'};
    return date.toLocaleDateString('ru-RU', options);
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

  /*function updateWeather() {
    const currentDate = new Date();
    const lat = 55.75; // Координаты Москвы
    const lon = 37.62;
    const token = 'YOUR_TOKEN_HERE';

    fetch(`https://api.gismeteo.ru/v2/current/?lat=${lat}&lon=${lon}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data); // Обрабатываем ответ
      })
      .catch(error => {
        console.error('Ошибка:', error);
      });
    info.querySelector('#temp').textContent = formatDate(currentDate);
    info.querySelector('#pressure').textContent = formatWeekday(currentDate);
    info.querySelector('#humid').textContent = formatWeekday(currentDate);
    info.querySelector('#pressure').textContent = formatWeekday(currentDate);
  }*/

  if (info) {
    updateClock();
    updatedate();

    function calculateTimeUntilMinute() {
      const now = new Date();
      const secondsRemaining = 60 - now.getSeconds();
      const millisecondsRemaining = secondsRemaining * 1000;
      return millisecondsRemaining;
    }

    const msUntilMinute = calculateTimeUntilMinute();
    setTimeout(updatedate, msUntilMinute);
    setInterval(updateClock, 60000); // 60000 мс = 1 минута
    //setTimeout(updateWeather, msUntilMinute);
    //setInterval(updateWeather, 60 * 60 * 1000); // 60000 мс = 1 минута

    function calculateTimeUntilMidnight() {
      const now = new Date();
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
      return tomorrow.getTime() - now.getTime();
    }

    const msUntilMidnight = calculateTimeUntilMidnight();
    setTimeout(updatedate, msUntilMidnight);
    setInterval(updatedate, 24 * 60 * 60 * 1000);
  }
}
