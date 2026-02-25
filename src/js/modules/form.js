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
    fetchFunc();
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
        ]
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
        ]
      });

      calendarFrom.config.onChange.push(function(selectedDates, dateStr, instance) {
        fetchFunc(dateStr);
        if (instance.element.id === 'calendar-from') {
          if (selectedDates[0] >= calendarTo.selectedDates[0]) {
            calendarTo.setDate(selectedDates[0], true, true);
          }
        }
      });

      calendarTo.config.onChange.push(function(selectedDates, dateStr, instance) {
        document.getElementById('selectedDateTo').value = dateStr;
        console.log(dateStr === getFormattedDate());
        console.log(dateStr);
        if (instance.element.id === 'calendar-to') {
          if (selectedDates[0] < calendarFrom.selectedDates[0]) {
            calendarFrom.setDate(selectedDates[0], true, true);
          } 
          if (dateStr === getFormattedDate()) {
            calendarFrom.setDate(new Date());
          }
        }
      });
      document.getElementById('selectedDateTo').value = getFormattedDate();

      document.querySelector('#gotoTodayFrom').addEventListener('click', function() {
        calendarFrom.jumpToDate(new Date());
        calendarFrom.setDate(new Date());
        fetchFunc();
      });

      document.querySelector('#gotoTodayTo').addEventListener('click', function() {
        const dates = new Date();
        document.getElementById('selectedDateTo').value = getFormattedDate();
        calendarTo.jumpToDate(dates);
        calendarTo.setDate(dates);
        calendarFrom.jumpToDate(dates);
        calendarFrom.setDate(dates);
        fetchFunc();
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
      let output7 = '';
      let output8 = '';
      let output12 = '';
      let output13 = '';
      let output17 = '';
      let outputinput7 = '';
      let outputinput8 = '';
      let outputinput12 = '';
      let outputinput13 = '';
      let outputinput17 = '';
      let times = response.times;
      let files = response.files;
      if (times && Array.isArray(times)) {
        times.forEach((time) => {
          let index_file = 0;

          if (time.time_from == 7) {
            files.forEach((file) => {
              if (file.time_id === time.id) {
                output7 += `<li class="admin-files-item">
  <span class="admin-item-image">
  ${file.types === 'image' ?
  `<video poster="/uploads/${file.files}" width="200" height="200"></video>` :
  `<video src="/uploads/${file.files}" width="200" height="200"></video>`
  }
  </span>
  <p>
  <input id="file-0-${index_file}" class="admin-delete-file" type="checkbox" name="delete-files-0[]" value="${file.files}">
  <label for="file-0-${index_file}">${file.files}</label>
  </p>
                </li>`;
                index_file++;
              }
            })
          }

          if (time.time_from == 8) {
            files.forEach((file) => {
              if (file.time_id === time.id) {
                output8 += `<li class="admin-files-item">
  <span class="admin-item-image">
  ${file.types === 'image' ?
  `<video poster="/uploads/${file.files}" width="200" height="200"></video>` :
  `<video src="/uploads/${file.files}" width="200" height="200"></video>`
  }
  </span>
  <p>
  <input id="file-1-${index_file}" class="admin-delete-file" type="checkbox" name="delete-files-1[]" value="${file.files}">
  <label for="file-1-${index_file}">${file.files}</label>
  </p>
                </li>`;
                index_file++;
              }
            })
          }

          if (time.time_from == 12) {
            files.forEach((file) => {
              if (file.time_id === time.id) {
                output12 += `<li class="admin-files-item">
  <span class="admin-item-image">
  ${file.types === 'image' ?
  `<video poster="/uploads/${file.files}" width="200" height="200"></video>` :
  `<video src="/uploads/${file.files}" width="200" height="200"></video>`
  }
  </span>
  <p>
  <input id="file-2-${index_file}" class="admin-delete-file" type="checkbox" name="delete-files-2[]" value="${file.files}">
  <label for="file-2-${index_file}">${file.files}</label>
  </p>
                </li>`;
                index_file++;
              }
            })
          }

          if (time.time_from == 13) {
            files.forEach((file) => {
              if (file.time_id === time.id) {
                output13 += `<li class="admin-files-item">
  <span class="admin-item-image">
  ${file.types === 'image' ?
  `<video poster="/uploads/${file.files}" width="200" height="200"></video>` :
  `<video src="/uploads/${file.files}" width="200" height="200"></video>`
  }
  </span>
  <p>
  <input id="file-3-${index_file}" class="admin-delete-file" type="checkbox" name="delete-files-3[]" value="${file.files}">
  <label for="file-3-${index_file}">${file.files}</label>
  </p>
                </li>`;
              }
            })
            index_file++;
          }

          if (time.time_from == 17) {
            files.forEach((file) => {
              if (file.time_id === time.id) {
                output17 += `<li class="admin-files-item">
  <span class="admin-item-image">
  ${file.types === 'image' ?
  `<video poster="/uploads/${file.files}" width="200" height="200"></video>` :
  `<video src="/uploads/${file.files}" width="200" height="200"></video>`
  }
  </span>
  <p>
  <input id="file-4-${index_file}" class="admin-delete-file" type="checkbox" name="delete-files-4[]" value="${file.files}">
  <label for="file-4-${index_file}">${file.files}</label>
  </p>
                </li>`;
                index_file++;
              }
            })
          }
        });

        outputinput7 += `<ul class="admin-new-file-list admin-new-file-list-0"></ul>
          <div class="admin-input-files">
          <label class="input-file" for="file-new-0">
            <input name="files-0[]" id="file-new-0" type="file" multiple accept="image/*, video/*">
            <span class="admin-file-btn">Выберите файлы</span>
          </label>
        </div>`;

        outputinput8 += `<ul class="admin-new-file-list admin-new-file-list-1"></ul>
          <div class="admin-input-files">
          <label class="input-file" for="file-new-1">
            <input name="files-1[]" id="file-new-1" type="file" multiple accept="image/*, video/*">
            <span class="admin-file-btn">Выберите файлы</span>
          </label>
        </div>`;

        outputinput12 += `<ul class="admin-new-file-list admin-new-file-list-2"></ul>
          <div class="admin-input-files">
            <label class="input-file" for="file-new-2">
              <input name="files-2[]" id="file-new-2" type="file" multiple accept="image/*, video/*">
              <span class="admin-file-btn">Выберите файлы</span>
            </label>
          </div>
        </div>`;

        outputinput13 += `<ul class="admin-new-file-list admin-new-file-list-3"></ul>
          <div class="admin-input-files">
          <label class="input-file" for="file-new-3">
            <input name="files-3[]" id="file-new-3" type="file" multiple accept="image/*, video/*">
            <span class="admin-file-btn">Выберите файлы</span>
          </label>
        </div>`;

        outputinput17 += `<ul class="admin-new-file-list admin-new-file-list-4"></ul>
          <div class="admin-input-files">
          <label class="input-file" for="file-new-4">
            <input name="files-4[]" id="file-new-4" type="file" multiple accept="image/*, video/*">
            <span class="admin-file-btn">Выберите файлы</span>
          </label>
        </div>`;

        forms.querySelector('.admin-item-7 .admin-old-files-list').innerHTML = output7;
        forms.querySelector('.admin-item-8 .admin-old-files-list').innerHTML = output8;
        forms.querySelector('.admin-item-12 .admin-old-files-list').innerHTML = output12;
        forms.querySelector('.admin-item-13 .admin-old-files-list').innerHTML = output13;
        forms.querySelector('.admin-item-17 .admin-old-files-list').innerHTML = output17;

        forms.querySelector('.admin-item-7 .admin-new-files').innerHTML = outputinput7;
        forms.querySelector('.admin-item-8 .admin-new-files').innerHTML = outputinput8;
        forms.querySelector('.admin-item-12 .admin-new-files').innerHTML = outputinput12;
        forms.querySelector('.admin-item-13 .admin-new-files').innerHTML = outputinput13;
        forms.querySelector('.admin-item-17 .admin-new-files').innerHTML = outputinput17;
      } else {
        console.error('Отсутствуют или некорректные данные о временных интервалах.', response.times);
      }
    }
  }
};
