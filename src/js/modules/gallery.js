import { Fancybox } from "@fancyapps/ui";

export function gallery() {
  Fancybox.bind("[data-fancybox]", {
    // Настройки
    loop: true,
    gutter : 10,
    keyboard: true,
    arrows: true,
    infobar: true,
    smallBtn: true,
    toolbar: false,
    protect: true,
    modal: true,
    idleTime: 3,
    animationEffect: "zoom-in-out",
    animationDuration: 600,
    transitionEffect: "rotate",
    transitionDuration: 400,
  });
}
