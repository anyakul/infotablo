export const form = () => {

  const forms = document.querySelector('#admin-form');

  function calculateTimeUntilMidnight() {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    return tomorrow.getTime() - now.getTime();
  }

  function getFormattedDate() {
    const dates = new Date();
    const day = (dates.getDate() < 10) ? ('0' + (dates.getDate())) : (dates.getDate());
    const month = (dates.getMonth() < 10) ? ('0' + (dates.getMonth() + 1)) : (dates.getMonth() + 1);
    const year = dates.getFullYear();
    return `${year}-${month}-${day}`;
  }

  if (forms) {
    const calendarButton = forms.querySelector('#calendar-button');
    updatePage();

    function updatePage() {
      const calendarFrom = flatpickr("#calendar-from", {
        inline: true,
        disableMobile: true,
        minDate: new Date(),
        defaultDate: new Date(),
        locale: 'ru',
        disable: [
          function(date) {
            return date.getDay() === 0 || date.getDay() === 6;
          }
        ],
        onReady: function(selectedDates, dateStr, instance) {
          const today = new Date();
          const currentDay = today.getDay();
          if (currentDay === 0 || currentDay === 6) {
            today.setDate(today.getDate() + (currentDay === 0 ? 1 : 2));
            fetchFunc(today.toISOString().split('T')[0]);
          } else {
            fetchFunc();
          }
          instance.setDate(today);
        }
      });

      const calendarTo = flatpickr("#calendar-to", {
        inline: true,
        disableMobile: true,
        minDate: new Date(),
        defaultDate: new Date(),
        locale: 'ru',
        disable: [
          function(date) {
            return date.getDay() === 0 || date.getDay() === 6;
          }
        ],
        onReady: function(selectedDates, dateStr, instance) {
          const today = new Date();
          const currentDay = today.getDay();
          if (currentDay === 0 || currentDay === 6) {
            today.setDate(today.getDate() + (currentDay === 0 ? 1 : 2));
            document.getElementById('selectedDateTo').value = today.toISOString().split('T')[0];
          } else {
            document.getElementById('selectedDateTo').value = dateStr;
          }
          instance.setDate(today);
        }
      });

      calendarButton.addEventListener('click', function() {
        if (forms.classList.contains('calendars-period')) {
          forms.classList.remove('calendars-period');
          const today = new Date();
          const currentDay = today.getDay();
          if (currentDay === 0 || currentDay === 6) {
            today.setDate(today.getDate() + (currentDay === 0 ? 1 : 2));
            document.getElementById('selectedDateTo').value = today.toISOString().split('T')[0];
            fetchFunc(today.toISOString().split('T')[0]);
          } else {
            document.getElementById('selectedDateTo').value = getFormattedDate();
            fetchFunc();
          }
          calendarFrom.setDate(today);
          calendarTo.setDate(today);
          calendarButton.textContent = 'Добавить период';
        } else {
          forms.classList.add('calendars-period');
          document.getElementById('selectedDateTo').value = document.getElementById('selectedDateFrom').value;
          calendarButton.textContent = 'Скрыть второй календарь';
        }
      })

      calendarFrom.config.onChange.push(function(selectedDates, dateStr, instance) {
        fetchFunc(dateStr);

        if (instance.element.id === 'calendar-from') {
          if (forms.classList.contains('calendars-period')) {
            if (selectedDates[0] >= calendarTo.selectedDates[0]) {
              calendarTo.setDate(selectedDates[0], true, true);
            }
          } else {
            calendarTo.setDate(selectedDates[0], true, true);
            document.getElementById('selectedDateTo').value = document.getElementById('selectedDateFrom').value;
          }
        }
      });

      calendarTo.config.onChange.push(function(selectedDates, dateStr, instance) {
        document.getElementById('selectedDateTo').value = dateStr;
        if (instance.element.id === 'calendar-to') {
          if (selectedDates[0] < calendarFrom.selectedDates[0]) {
            calendarFrom.setDate(selectedDates[0], true, true);
          }
        }
      });

      document.querySelector('#gotoTodayFrom').addEventListener('click', function() {
        const today = new Date();
        const currentDay = today.getDay();
        if (currentDay === 0 || currentDay === 6) {
          today.setDate(today.getDate() + (currentDay === 0 ? 1 : 2));
          fetchFunc(today.toISOString().split('T')[0]);
        } else {
          fetchFunc();
        }
        calendarFrom.jumpToDate(today);
        calendarFrom.setDate(today);
        if (!forms.classList.contains('calendars-period')) {
          calendarTo.setDate(today);
          document.getElementById('selectedDateTo').value = document.getElementById('selectedDateFrom').value;
        }
      });

      document.querySelector('#gotoTodayTo').addEventListener('click', function() {
        const today = new Date();
        const currentDay = today.getDay();
        if (currentDay === 0 || currentDay === 6) {
          today.setDate(today.getDate() + (currentDay === 0 ? 1 : 2));
          fetchFunc(today.toISOString().split('T')[0]);
        } else {
          document.getElementById('selectedDateTo').value = getFormattedDate();
          fetchFunc();
        }
        calendarFrom.setDate(today);
        calendarTo.setDate(today);
        document.getElementById('selectedDateTo').value = document.getElementById('selectedDateFrom').value;
      });
      forms.addEventListener('submit', fetchEditFunc);
    }

    function fetchFunc(formattedDate) {
      if (!formattedDate) {
        formattedDate = getFormattedDate();
      }
      document.getElementById('selectedDateFrom').value = formattedDate;
      fetch(`data.php`, {
        method: 'POST',
        body: new URLSearchParams({
          date: formattedDate
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          processResponse(data);
          mainFunc();
          const msUntilMidnight = calculateTimeUntilMidnight();
          setTimeout(updatePage, msUntilMidnight);
          setInterval(updatePage, 24 * 60 * 60 * 1000);
          setTimeout(fetchFunc, msUntilMidnight);
          setInterval(fetchFunc, 24 * 60 * 60 * 1000);

        } else {
          console.error('Ошибка:', data.message);
        }
      })
      .catch(error => {
        console.error("There was an error:", error);
      });
    }

    function mainFunc() {
      const newItems = forms.querySelectorAll('.admin-item');

      for (let i = 0; i < newItems.length; i++) {
        let newInputs = newItems[i].querySelector('input[type="file"]');
        let newList = newItems[i].querySelector('.admin-new-file-list');

        newInputs.addEventListener('change', (e) => {
          const files = e.target.files;
          newList.textContent = '';

          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const li = document.createElement('li');
            li.innerHTML = `<p class="src">${file['name']}</p>`;
            newList.append(li);
          }
        })
      }
    }

    async function fetchEditFunc(event) {
      event.preventDefault();

      const formData = new FormData(this);

      // Убираем ненужный заголовок Content-Type
      const response = await fetch('edit.php', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        fetchFunc(document.getElementById('selectedDateFrom').value);
        mainFunc();
      } else {
        console.error('Ошибка:', data.message);
      }
    }

    function processResponse(response) {
      let times = response.times;
      let files = response.files;
      let curDate = document.getElementById('selectedDateFrom').getAttribute('value');
      const parsedDate = new Date(curDate);

      const formattedDate = parsedDate.toLocaleDateString('ru-RU', {
          month: 'long',
          day: 'numeric'
      });

      function getOutput(file, type, index, indexFile, time, thumbs) {
        return `<li class="admin-files-item" data-files="${type}">
  <span class="admin-item-image">
  <a data-fancybox="group" data-caption="${formattedDate} ${time}" data-audio="false" href="/uploads/${file}" data-thumb="/uploads/${thumbs}" title="Показать подробнее"></a>
  <img src="/uploads/${thumbs}" width="100" height="100">
  </span>
  <p>
  <input id="file-${index}-${indexFile}" class="admin-delete-file" type="checkbox" name="delete-files-${index}[]" value="${file}">
  <label for="file-${index}-${indexFile}">${file}</label>
  </p>
  </li>`
      }

      function getInputOutput(index) {
        return `<ul class="admin-new-file-list admin-new-file-list-${index}"></ul>
          <div class="admin-input-files">
          <label class="input-file" for="file-new-${index}">
            <input name="files-${index}[]" id="file-new-${index}" type="file" multiple accept="image/*, video/*">
            <span class="admin-file-btn">Выберите файлы</span>
          </label>
        </div>`
      }

      if (times && Array.isArray(times)) {
        const adminItem7 = forms.querySelector('.admin-item-7');
        const adminItem8 = forms.querySelector('.admin-item-8');
        const adminItem12 = forms.querySelector('.admin-item-12');
        const adminItem13 = forms.querySelector('.admin-item-13');
        const adminItem17 = forms.querySelector('.admin-item-17');
        const oldFiles7 = adminItem7.querySelector('.admin-old-files-list');
        const newFiles7 = adminItem7.querySelector('.admin-new-files');
        const oldFiles8 = adminItem8.querySelector('.admin-old-files-list');
        const newFiles8 = adminItem8.querySelector('.admin-new-files');
        const oldFiles12 = adminItem12.querySelector('.admin-old-files-list');
        const newFiles12 = adminItem12.querySelector('.admin-new-files');
        const oldFiles13 = adminItem13.querySelector('.admin-old-files-list');
        const newFiles13 = adminItem13.querySelector('.admin-new-files');
        const oldFiles17 = adminItem17.querySelector('.admin-old-files-list');
        const newFiles17 = adminItem17.querySelector('.admin-new-files');
        oldFiles7.innerHTML = ''
        newFiles7.innerHTML = getInputOutput(0);
        oldFiles8.innerHTML = ''
        newFiles8.innerHTML = getInputOutput(1);
        oldFiles12.innerHTML = ''
        newFiles12.innerHTML = getInputOutput(2);
        oldFiles13.innerHTML = ''
        newFiles13.innerHTML = getInputOutput(3);
        oldFiles17.innerHTML = ''
        newFiles17.innerHTML = getInputOutput(4);
        times.forEach((time) => {
          let index_file = 0;

          if (time.time_from == 7) {
            let output = '';
            files.forEach((file) => {
              if (file.time_id === time.id) {
                output += getOutput(file.files, file.types, '0', index_file, '07.00-08.00', file.thumbs);
                index_file++;
              }
            })
            oldFiles7.innerHTML = output;
          }

          if (time.time_from == 8) {
            let output = '';
            files.forEach((file) => {
              if (file.time_id === time.id) {
                output += getOutput(file.files, file.types, '1', index_file, '08.00-12.00', file.thumbs);
                index_file++;
              }
            })
            oldFiles8.innerHTML = output;
          }

          if (time.time_from == 12) {
            let output = '';
            files.forEach((file) => {
              if (file.time_id === time.id) {
                output += getOutput(file.files, file.types, '2', index_file, '12.00-13.00', file.thumbs);
                index_file++;
              }
            })
            oldFiles12.innerHTML = output;
          }

          if (time.time_from == 13) {
            let output = '';
            files.forEach((file) => {
              if (file.time_id === time.id) {
                output += getOutput(file.files, file.types, '3', index_file, '13.00-17.00', file.thumbs);
                index_file++;
              }
            })
            oldFiles13.innerHTML = output;
          }

          if (time.time_from == 17) {
            let output = '';
            files.forEach((file) => {
              if (file.time_id === time.id) {
                output += getOutput(file.files, file.types, '4', index_file, '17.00-18.00', file.thumbs);
                index_file++;
              }
            })
            oldFiles17.innerHTML = output;
          }
        });
      } else {
        console.error('Отсутствуют или некорректные данные о временных интервалах.', response.times);
      }
    }
  }
};
