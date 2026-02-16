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

    const hours = String(currentTime.getHours()).padStart(2, '0');
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');

    clockElement.textContent = `${hours}:${minutes}`;
  }

  function updatedate() {
    const currentDate = new Date();
    info.querySelector('#current_date').textContent = formatDate(currentDate);
    info.querySelector('#weekday').textContent = formatWeekday(currentDate);
  }

  function calculateTimeUntilMinute() {
    const now = new Date();
    const secondsRemaining = 60 - now.getSeconds();
    const millisecondsRemaining = secondsRemaining * 1000;
    return millisecondsRemaining;
  }

  function calculateTimeUntilMidnight() {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    return tomorrow.getTime() - now.getTime();
  }

  if (info) {
    updateClock();
    updatedate();

    const msUntilMinute = calculateTimeUntilMinute();
    const msUntilMidnight = calculateTimeUntilMidnight();
    setTimeout(updateClock, msUntilMinute);
    setInterval(updateClock, 60000);
    setTimeout(updatedate, msUntilMidnight);
    setInterval(updatedate, 24 * 60 * 60 * 1000);
  }
}
