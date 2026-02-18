import * as slider from './slider.js';
export const player = () => {
  const player = document.querySelector('.player-blocks');
  const playerWrapper = document.querySelector('#player');

  function calculateTimeUntilMidnight() {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    return tomorrow.getTime() - now.getTime();
  }

  function calculateTimeUntilMinute() {
    const now = new Date();
    const secondsRemaining = 60 - now.getSeconds();
    const millisecondsRemaining = secondsRemaining * 1000;
    return millisecondsRemaining;
  }

  if (player) {
    const info = playerWrapper.querySelector('#info');

    function getdata() {
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const formattedDate = `${year}-${month}-${day}`;
      fetch(`data.php`, {
        method: 'POST',
        body: new URLSearchParams({
          date: formattedDate
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          let prevFiles = '';
          processResponse(data);
    
          playerFunc();
          const msUntilMidnight = calculateTimeUntilMidnight();
          const msUntilMinute = calculateTimeUntilMinute();
          setTimeout(getdata, msUntilMidnight);
          setInterval(getdata, 24 * 60 * 60 * 1000);
          setTimeout(fetchDeleteFunc, msUntilMidnight);
          setInterval(fetchDeleteFunc, 24 * 60 * 60 * 1000);
          setTimeout(playerFunc, msUntilMinute);
          setInterval(playerFunc, 60 * 1000);

          function playerFunc() {
            let date = new Date();
            let hour = date.getHours();
            const playerBlocks = document.querySelectorAll('.player-block');
            let files = [];

            for (let i = 0; i < playerBlocks.length; i++) {
              const playerText = playerBlocks[i].querySelector('.player-text');
              const playerList = playerBlocks[i].querySelector('.player-list');
              const playerItems = playerList.querySelectorAll('.player-item');
              const timeFrom = playerText.getAttribute('data-from');
              const timeTo = playerText.getAttribute('data-to');
              let type;

              if (playerItems.length > 0) {
                type = playerItems[0].getAttribute('data-type');
              } else {
                type = '';
              }

              let fileTime = {
                timeFrom: timeFrom,
                timeTo: timeTo,
                type: type,
                files: []
              };

              for (let j = 0; j < playerItems.length; j++) {
                if (playerItems[j].querySelector('.player-file-name')) {
                  fileTime.files.push(playerItems[j].querySelector('.player-file-name').textContent);
                }
              }

              if (fileTime.files) {
                files.push(fileTime);
              }
            }

            if (files.length > 0) {
              let filteredFiles = files.find(file => file.timeFrom <= hour && file.timeTo > hour);

              if (filteredFiles && filteredFiles.files.length > 0) {
                if (prevFiles === null || !areArraysEqual(prevFiles, filteredFiles.files)) {
                  player(filteredFiles.files, filteredFiles.type);
                  info.setAttribute('style', 'display: flex');
                  prevFiles = [...filteredFiles.files]; // Копируем массив
                }
              } else {
                let output = `
                  <div class="swiper-slide">
                    <video class="homevideo" autoplay src="" muted poster="">
                  </div>
                `;
                document.querySelector('.swiper-wrapper').innerHTML = output;
                const videoPlayer = document.querySelector('.homevideo');
                videoPlayer.poster = '';
                videoPlayer.src = '';
                info.setAttribute('style', 'display: none');
                prevFiles = '';
              }
            } else {
              let output = `
                <div class="swiper-slide">
                  <video class="homevideo" autoplay src="" muted poster="">
                </div>
              `;
              document.querySelector('.swiper-wrapper').innerHTML = output;
              const videoPlayer = document.querySelector('.homevideo');
              videoPlayer.poster = '';
              videoPlayer.src = '';
              info.setAttribute('style', 'display: none');
              prevFiles = '';
            }
          }

          function player(filesNow, type) {
            let video_count = 0;
            let output = '';

            if (filesNow.length == 1) {
              if (type === 'video') {
                output += `
                  <div class="swiper-slide">
                    <video class="homevideo" autoplay src="" muted poster="">
                  </div>
                `;
                document.querySelector('.swiper-wrapper').innerHTML = output;
                const videoPlayer = document.querySelector('.homevideo');
                videoPlayer.poster = '';
                videoPlayer.src = '/uploads/' + filesNow[video_count];
                videoPlayer.addEventListener("ended", function (){
                  videoPlayer.play();
                }, false);
                videoPlayer.play();
              } else {
                output += `
                  <div class="swiper-slide">
                    <video class="homevideo" autoplay src="" muted poster="">
                  </div>
                `;
                document.querySelector('.swiper-wrapper').innerHTML = output;
                const videoPlayer = document.querySelector('.homevideo');
                videoPlayer.poster = '/uploads/' + filesNow[video_count];
                videoPlayer.src = '';
              }
            }

            else if (filesNow.length >= 2) {
              if (type === 'video') {       
                output += `
                  <div class="swiper-slide">
                    <video class="homevideo" autoplay src="" muted poster="">
                  </div>
                `;
                document.querySelector('.swiper-wrapper').innerHTML = output;
                const videoPlayer = document.querySelector('.homevideo');
                videoPlayer.poster = '';
                videoPlayer.src = '/uploads/' + filesNow[video_count];
                videoPlayer.addEventListener("ended", function (){
                  video_count++;
                  if (video_count == filesNow.length) video_count = 0;
                  videoPlayer.src = '/uploads/' + filesNow[video_count];
                }, false);
                videoPlayer.play();
              } else {
                filesNow.forEach(file => {        
                  output += `
                    <div class="swiper-slide">
                      <video class="homevideo" autoplay src="" muted poster="/uploads/${file}">
                    </div>
                  `;
                });
                document.querySelector('.swiper-wrapper').innerHTML = output;
              }
            }
          }
          slider.slider();

          // Вспомогательная функция для сравнения массивов
          function areArraysEqual(arr1, arr2) {
            if (arr1.length !== arr2.length) return false;

            for (let i = 0; i < arr1.length; i++) {
              if (JSON.stringify(arr1[i]) !== JSON.stringify(arr2[i])) {
                return false;
              }
            }

            return true;
          }
        } else {
          console.error('Ошибка:', data.message);
        }
      })
      .catch(error => {
        console.error("There was an error:", error);
      });
    }

    getdata();

    function fetchDeleteFunc() {
      const response = fetch('deleteRecords.php', {
        method: 'POST',
      });
    }

    function processResponse(response) {
      document.querySelector('.player-blocks').innerHTML = '';
      let output = '';
      let times = response.times;
      let files = response.files;
      let index = 0;

      times.forEach(time => {
        const fromText = time.time_from === 0 ? 'Весь день' : `С ${time.time_from} до ${time.time_to}`;
        
        // Извлекаем видео для текущего временного интервала
        const relatedVideos = files.filter(item => item.time_id === time.id);

        output += `
            <div class="player-block">
                <p class="player-text" data-from="${time.time_from}" data-to="${time.time_to}">${fromText}</p>
                <ul class="player-list">
                    ${relatedVideos.map(videoItem => `
                        <li class="player-item" data-type="${videoItem.types}">
                            <span class="player-item-image">
                                ${videoItem.types === 'image' ? 
                                    `<video poster="/uploads/${videoItem.files}" width="100" height="100"></video>` :
                                    `<video src="/uploads/${videoItem.files}" width="100" height="100"></video>`
                                }
                            </span>
                            <span class="player-file-name">${videoItem.files}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
      });

      document.querySelector('.player-blocks').innerHTML = output;
    }
  }
}
