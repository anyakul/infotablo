export const form = () => {

  const forms = document.querySelector('#admin-form');

  if (forms) {
    const date = new Date();
    const day = (date.getDate() < 10) ? ('0' + (date.getDate())) : (getDate());
    const month = (date.getMonth() < 10) ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
    const year = date.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;
    forms.querySelector('#selectedDate').value = formattedDate;

    fetchFunc(formattedDate);

    const calendar = flatpickr("#calendar", {
      inline: true,
      disableMobile: true,
      minDate: new Date(),
      defaultDate: new Date(),
      locale: {
        firstDayOfWeek: 1, // Понедельник — первый день недели
      },
    });

    calendar.config.onChange.push(function(selectedDates, dateStr, instance) {
      document.getElementById('selectedDate').value = dateStr;
      fetchFunc(dateStr);
    });

    document.querySelector('#gotoToday').addEventListener('click', function() {
      calendar.jumpToDate(new Date());
      fetchFunc(formattedDate);
    });

    function fetchFunc(dates) {
      fetch(`data.php`, {
        method: 'POST',
        body: new URLSearchParams({
          date: dates
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          processResponse(data);
          mainFunc();

          forms.addEventListener('submit', fetchEditFunc);
        } else {
          console.error('Ошибка:', data.message);
        }
      })
      .catch(error => {
        console.error("There was an error:", error);
      });
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
        fetchFunc(document.getElementById('selectedDate').value);
        mainFunc();
      } else {
        console.error('Ошибка:', data.message);
      }
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

    function processResponse(response) {
      let output = '';
      let times = response.times;
      let files = response.files;
      let index = 0;
      if (times && Array.isArray(times)) {
        times.forEach((time) => {
          let index_file = 0;
          let innerFilesHtml = '';

          files.forEach((file) => {
            if (file.time_id === time.id) {
              innerFilesHtml += `<li class="admin-files-item">
<span class="admin-item-image">
${file.types === 'image' ?
`<video poster="/uploads/${file.files}" width="200" height="200"></video>` :
`<video src="/uploads/${file.files}" width="200" height="200"></video>`
}
</span>
<p>
<input id="file-${index}-${index_file}" class="admin-delete-file" type="checkbox" name="delete-files-${index}[]" value="${file.id}">
<label for="file-${index}-${index_file}">${file.files}</label>
</p>
              </li>`;
              index_file++;
            }
          })

          output += `<tr class="admin-item">
<td class="admin-time">
<label class="visually-hidden" for="time-from-${index}">Время показа с:</label>
<select name="time-from[]" class="visually-hidden admin-time-from" id="time-from-${index}">
<option value="07:00" ${time.time_from == 7 ? 'selected' : ''}>07:00</option>
<option value="08:00" ${time.time_from == 8 ? 'selected' : ''}>08:00</option>
<option value="09:00" ${time.time_from == 9 ? 'selected' : ''}>09:00</option>
<option value="10:00" ${time.time_from == 10 ? 'selected' : ''}>10:00</option>
<option value="11:00" ${time.time_from == 11 ? 'selected' : ''}>11:00</option>
<option value="12:00" ${time.time_from == 12 ? 'selected' : ''}>12:00</option>
<option value="13:00" ${time.time_from == 13 ? 'selected' : ''}>13:00</option>
<option value="14:00" ${time.time_from == 14 ? 'selected' : ''}>14:00</option>
<option value="15:00" ${time.time_from == 15 ? 'selected' : ''}>15:00</option>
<option value="16:00" ${time.time_from == 16 ? 'selected' : ''}>16:00</option>
<option value="17:00" ${time.time_from == 17 ? 'selected' : ''}>17:00</option>
</select>
${time.time_from <= 9 ? '0' + time.time_from : time.time_from}:00
</td>
<td class="admin-time">
<label for="time-to-${index}" class="visually-hidden">Время показа до:</label>
<select name="time-to[]" id="time-to-${index}" class="visually-hidden">
<option value="08:00" ${time.time_to == 8 ? 'selected' : ''}>08:00</option>
<option value="09:00" ${time.time_to == 9 ? 'selected' : ''}>09:00</option>
<option value="10:00" ${time.time_to == 10 ? 'selected' : ''}>10:00</option>
<option value="11:00" ${time.time_to == 11 ? 'selected' : ''}>11:00</option>
<option value="12:00" ${time.time_to == 12 ? 'selected' : ''}>12:00</option>
<option value="13:00" ${time.time_to == 13 ? 'selected' : ''}>13:00</option>
<option value="14:00" ${time.time_to == 14 ? 'selected' : ''}>14:00</option>
<option value="15:00" ${time.time_to == 15 ? 'selected' : ''}>15:00</option>
<option value="16:00" ${time.time_to == 16 ? 'selected' : ''}>16:00</option>
<option value="17:00" ${time.time_to == 17 ? 'selected' : ''}>17:00</option>
<option value="18:00" ${time.time_to == 18 ? 'selected' : ''}>18:00</option>
</select>
${time.time_to <= 9 ? '0' + time.time_to : time.time_to}:00
</td>
<td class="admin-old-files">
<ul class="admin-old-files-list admin-old-files-${index}">
${innerFilesHtml}
</ul>
</td>
<td class="admin-new-files">
<ul class="admin-new-file-list admin-new-file-list-${index}"></ul>
<div class="admin-input-files">
<label class="input-file" for="file-new-${index}">
<input type="file" name="files-${index}[]" id="file-new-${index}" multiple accept="image/*, video/*">
<span class="admin-file-btn">Выберите файлы</span>
</label>
</div>
</td>
          </tr>`;
          index++;
        });

        document.querySelector('.admin-table tbody').innerHTML = output;
      } else {
        console.error('Отсутствуют или некорректные данные о временных интервалах.', response.times);
      }
    }
  }
};
