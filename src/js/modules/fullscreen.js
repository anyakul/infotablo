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

  const playerFullscreen = document.querySelector('#player');

  const playerFullscreenBtn = document.querySelector('#player-fullscreen');

  if (playerFullscreen) {
    playerFullscreen.addEventListener('click', toggleFullscreen);
  }

  playerFullscreen.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.body.classList.remove('fullscreen-mode');
    } else {
      document.body.classList.add('fullscreen-mode');
    }
  });

  if (playerFullscreenBtn) {
    playerFullscreen.addEventListener('click', toggleFullscreen);
  }

  playerFullscreen.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.body.classList.remove('fullscreen-mode');
    } else {
      document.body.classList.add('fullscreen-mode');
    }
  });
}
