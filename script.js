const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});
// gsap.to(".svg-container svg", {
//   transform: "translateY(-100%)",
//   scrollTrigger: {
//     trigger: "#page1",
//     scroller: "#main",
//     markers: true,
//     start: "top 0",
//     end: "top -5%",
//     scrub: true,
//   },
// });
// gsap.to("#nav_second #links", {
//   transform: "translateY(-100%)",
//   opacity: 0,
//   scrollTrigger: {
//     trigger: "#page1",
//     scroller: "#main",
//     markers: true,
//     start: "top 0",
//     end: "top -5%",
//     scrub: true,
//   },
// });
function locomotiveScrollTriggerAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
function videoContainerAnimtion() {
  let vidCon = document.querySelector("#video_container");
  let playBtn = document.querySelector("#play");

  vidCon.addEventListener("mouseenter", function () {
    gsap.to(playBtn, {
      opacity: 1,
      scale: 1,
    });
  });
  vidCon.addEventListener("mouseleave", function () {
    gsap.to(playBtn, {
      opacity: 0,
      scale: 0,
    });
  });
  vidCon.addEventListener("mousemove", function (defs) {
    let playBtnWidth = playBtn.offsetWidth;
    let playBtnHeight = playBtn.offsetHeight;
    gsap.to(playBtn, {
      left: defs.clientX - playBtnWidth / 2,
      top: defs.clientY - playBtnHeight / 2,
      // left: defs.x - 70,
      // top: defs.y - 80,
    });
  });
}

function loadingAnimation() {
  gsap.from("#page1 h1", {
    y: 100,
    opacity: 0,
    delay: 0.5,
    duration: 0.8,
    stagger: 0.2,
  });
  gsap.from("#page1 #video_container", {
    scale: 0.8,
    opacity: 0,
    delay: 1.25,
    duration: 0.8,
  });
}
function onHoverProductAnimation() {
  let childElements = document.querySelectorAll(".child");

  childElements.forEach(function (element) {
    element.addEventListener("mouseenter", function () {
      gsap.to("#cursor", {
        transform: "translate(-50%, -50%) scale(1)",
      });
    });
    element.addEventListener("mouseleave", function () {
      gsap.to("#cursor", {
        transform: "translate(-50%, -50%) scale(0)",
      });
    });
  });
}

document.addEventListener("mousemove", function (event) {
  gsap.to("#cursor", {
    x: event.clientX,
    y: event.clientY,
  });
});



locomotiveScrollTriggerAnimation();
loadingAnimation();
videoContainerAnimtion();
onHoverProductAnimation();
