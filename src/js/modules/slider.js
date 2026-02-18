import Swiper, { Autoplay, EffectFade } from 'swiper';

export function slider() {
  Swiper.use([Autoplay, EffectFade]);
  const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    slidesPerView: 1,
    initialSlide: 0,
    autoplay: {
      delay: 10000,
      stopOnLastSlide: false,
      enabled: false,
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    speed: 1000
  })

  if (swiper.slides.length > 1) {
    swiper.init();
    swiper.params.autoplay.enabled = true;
    swiper.autoplay.start();
  } else {
    swiper.destroy();
  }
}
