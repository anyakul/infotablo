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

  function updatedate() {
    const currentDate = new Date();
    info.querySelector('#current_date').textContent = formatDate(currentDate);
    info.querySelector('#weekday').textContent = formatWeekday(currentDate);
  }

  function calculateTimeUntilMidnight() {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    return tomorrow.getTime() - now.getTime();
  }

  if (info) {
    updatedate();
    const msUntilMidnight = calculateTimeUntilMidnight();
    setTimeout(updatedate, msUntilMidnight);
    setInterval(updatedate, 24 * 60 * 60 * 1000);
  }
}
