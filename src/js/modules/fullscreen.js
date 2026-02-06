export const fullscreen = () => {
  function toggleFullscreen() {
    const element = document.querySelector('#player');

    if (!document.fullscreenElement) {
      element.requestFullscreen().catch(err => {
        console.error(`Ошибка: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }

  const playerFullscreen = document.querySelector('#player-fullscreen');

  if (playerFullscreen) {
    playerFullscreen.addEventListener('click', toggleFullscreen);
  }

  document.addEventListener('fullscreenchange', function() {
    if (!document.fullscreenElement) {
      document.body.classList.remove('fullscreen-mode');
    } else {
      document.body.classList.add('fullscreen-mode');
    }
  });
}
