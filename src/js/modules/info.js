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

  // Показываем текущее время при загрузке страницы

  if (info) {
    updateClock();
    updatedate();
    setInterval(updateClock, 60000); // 60000 мс = 1 минута

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
