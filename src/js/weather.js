const weather = () => {
  const info = document.querySelector('#info');

  function formatDateNums(date) {
    const day = (date.getDate() < 10) ? ('0' + (date.getDate())) : (date.getDate());
    const month = (date.getMonth() + 1 < 10) ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
    const year = date.getFullYear();
    console.log(month);
    return `${year}-${month}-${day}`;
  }

  /*function updateWeather() {
    const lat = 53.507852;
    const lon = 49.420411;
    const date = new Date();
    const currentDate = formatDateNums(date);
    const time = date.getHours() + ':00';

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
  }*/

  function updateWeather() {
    const lat = 53.507852;
    const lon = 49.420411;
    const date = new Date();
    const currentDate = formatDateNums(date);
    const time = date.getHours();

    if (time >= 7 && time < 19) {

      fetch(`/weather.php?lat=${lat}&lon=${lon}&date=${currentDate}`)
        .then(response => response.json())
        .then(data => {
          info.querySelector('#temp').textContent = 't ' + Math.round(data.data.temperature.air.C) + '°C';
          info.querySelector('#pressure').textContent = Math.round(data.data.pressure.mm_hg_atm) + ' мм';
          info.querySelector('#humid').textContent = Math.round(data.data.humidity.percent) + '%';
          info.querySelector('#wind').textContent = Math.round(data.data.wind.speed.m_s) + ' м/c';
        })
        .catch(error => {
          console.error('Ошибка:', error);
        });
    }
  }

  function calculateTimeUntilHour() {
    const now = new Date();
    const nextHour = new Date(now.getTime() + (60 - now.getMinutes()) * 60 * 1000);
    nextHour.setSeconds(0, 0);
    return nextHour.getTime() - now.getTime();
  }

  if (info) {
    updateWeather();

    const msUntilHour = calculateTimeUntilHour();
    setTimeout(updateWeather, msUntilHour);
    setInterval(updateWeather, 60 * 60 * 1000);
  }
}

weather();
