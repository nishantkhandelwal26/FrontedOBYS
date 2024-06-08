function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  locoScroll.on("scroll", ScrollTrigger.update);

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

    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
function loadingAnimation() {
  var tl = gsap.timeline();
  tl.from(".line h1", {
    y: 150,
    stagger: 0.2,
    duration: 0.6,
    delay: 0.5,
  });
  tl.from("#line1-part1", {
    opacity: 0,
    onStart: function () {
      var h5Timer = document.querySelector("#line1-part1 h5");
      var counter = 0;
      var int1 = setInterval(function () {
        if (counter <= 100) {
          h5Timer.textContent = counter;
        } else clearInterval(int1);
        counter++;
      }, 30);
    },
  });
  tl.to(" .line h2", {
    animationName: "anime",
    opacity: 1,
  });
  tl.to("#loader", {
    opacity: 0,
    duration: 0.3,
    delay: 3.5,
  });
  tl.from("#page1", {
    y: 1600,
    delay: 0.2,
    opacity: 0,
    duration: 0.5,
    ease: Power4,
  });
  tl.to("#loader", {
    display: "none",
  });
  tl.from("nav", {
    opacity: 0,
  });
  tl.from("#hero1 h1, #hero2 h1, #hero3 h2, #hero4 h1", {
    y: 120,
    stagger: 0.2,
  });
  tl.from("#hero1, #page2", {
    opacity: 0,
  });
}
function cursorAnimation() {
  Shery.mouseFollower({
    skew: true,
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1,
  });
  Shery.makeMagnet("#nav-part2 h4");
  var videoContainer = document.querySelector("#video-container");
  var video = document.querySelector("#video-container video");
  videoContainer.addEventListener("mouseenter", function () {
    videoContainer.addEventListener("mousemove", function (dets) {
      gsap.to(".mouseFollower", {
        opacity: 0,
      });
      gsap.to("#video-cursor", {
        x: dets.x - 480,
        y: dets.y - 200,
      });
    });
  });

  videoContainer.addEventListener("mouseleave", function () {
    gsap.to(".mouseFollower", {
      opacity: 1,
    });
    gsap.to("#video-cursor", {
      top: "-10%",
      left: "80%",
    });
  });

  var flag = 0;
  videoContainer.addEventListener("click", function () {
    if (flag === 0) {
      video.play();
      video.style.opacity = 1;
      document.querySelector(
        "#video-cursor"
      ).innerHTML = `<i class="ri-pause-line"></i>`;

      gsap.to("#video-cursor", {
        scale: 0.5,
      });
      flag = 1;
    }
    else{
      video.pause();
      video.style.opacity = 0;
      document.querySelector(
        "#video-cursor"
      ).innerHTML = `<i class="ri-play-fill"></i>`;

      gsap.to("#video-cursor", {
        scale: 1,
      });
      flag= 0;
    }
  });
}
function sheryAnimation() {
  Shery.imageEffect(".img-div", {
    style: 5,
    config: {
      a: { value: 1.6, range: [0, 30] },
      b: { value: 0.92, range: [-1, 1] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 0.7272749932567818 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: true },
      infiniteGooey: { value: false },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: false },
      maskVal: { value: 1.37, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 0 },
      noise_speed: { value: 0.99, range: [0, 10] },
      metaball: { value: 0.4, range: [0, 2] },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0, range: [0, 0.1] },
      noise_height: { value: 0.4, range: [0, 2] },
      noise_scale: { value: 11.45, range: [0, 100] },
    },
    gooey: true,
  });
}

document.addEventListener("mousemove", function(dets){
  gsap.to("#flag", {
    x:dets.x,
    y:dets.y
  })
})

document.querySelector('#hero3').addEventListener("mouseenter", function(){
  gsap.to("#flag", {
    opacity: 1
  });
})
document.querySelector('#hero3').addEventListener("mouseleave", function(){
  gsap.to("#flag", {
    opacity: 0
  });
})


loadingAnimation();
cursorAnimation();
locomotiveAnimation();
sheryAnimation();
