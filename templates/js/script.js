/* ==================================================
ELEMENTS
================================================== */

const audio =
document.getElementById(
'audio'
);

const musicButton =
document.getElementById(
'musicButton'
);

const heartsContainer =
document.getElementById(
'hearts'
);

const wishButton =
document.getElementById(
'wishButton'
);

const wishText =
document.getElementById(
'wishText'
);

const progressFill =
document.getElementById(
'progressFill'
);

const progressLabel =
document.getElementById(
'progressLabel'
);

const cinematicOverlay =
document.getElementById(
'cinematicOverlay'
);

const sections =
document.querySelectorAll(
'.story-section'
);

const fadeElements =
document.querySelectorAll(
'.fade'
);

const parallaxElements =
document.querySelectorAll(
'.parallax'
);

const progressDots =
document.querySelectorAll(
'.progress-dot'
);

/* ==================================================
SECTION NAMES
================================================== */

const sectionNames = {

opening:
'Opening',

birthday:
'Happy Birthday',

beginning:
'Awal Cerita',

'knowing-you':
'Mengenalmu',

smile:
'Senyummu',

'little-things':
'Hal Kecil',

memory:
'Kenangan',

gallery:
'Cerita Kita',

'thank-you':
'Terima Kasih',

tired:
'Untukmu',

admire:
'Yang Aku Kagumi',

'admire-video':
'Video Spesial',

hope:
'Harapanku',

future:
'Masa Depan',

letter:
'Surat Untukmu',

final:
'The End?'

};

/* ==================================================
FADE OBSERVER
================================================== */

const fadeObserver =
new IntersectionObserver(


(entries) => {

  entries.forEach(
    (entry) => {

      if (
        entry.isIntersecting
      ) {

        entry.target.classList.add(
          'show'
        );

      }

    }
  );

},

{

  threshold:
    .15,

  rootMargin:
    '0px 0px -80px 0px'

}


);

fadeElements.forEach(
(element) => {


fadeObserver.observe(
  element
);


}
);

/* ==================================================
SECTION OBSERVER
================================================== */

const sectionObserver =
new IntersectionObserver(


(entries) => {

  entries.forEach(
    (entry) => {

      if (
        entry.isIntersecting
      ) {

        activateSection(
          entry.target
        );

      }

    }
  );

},

{

  threshold:
    .55

}


);

sections.forEach(
(section) => {


sectionObserver.observe(
  section
);


}
);

/* ==================================================
ACTIVATE SECTION
================================================== */

function activateSection(
section
) {

const sectionId =
section.id;

const sectionName =
sectionNames[
sectionId
] ||
sectionId;

sections.forEach(
(item) => {


  item.classList.remove(
    'active-section'
  );

}


);

section.classList.add(
'active-section'
);

progressDots.forEach(
(dot) => {


  dot.classList.remove(
    'active'
  );


  if (
    dot.dataset.section ===
    sectionId
  ) {

    dot.classList.add(
      'active'
    );

  }

}


);

if (
progressLabel
) {


progressLabel.textContent =
  sectionName;


}

cinematicTransition(
section
);

}

/* ==================================================
CINEMATIC TRANSITION
================================================== */

function cinematicTransition(
section
) {

if (
!cinematicOverlay
) {


return;


}

cinematicOverlay.classList.add(
'active'
);

setTimeout(
() => {


  cinematicOverlay.classList.remove(
    'active'
  );

},
600


);

}

/* ==================================================
SCROLL PROGRESS
================================================== */

function updateScrollProgress() {

const scrollTop =
window.scrollY;

const documentHeight =
document.documentElement
.scrollHeight -
window.innerHeight;

if (
documentHeight <= 0
) {


return;


}

const progress =
(
scrollTop /
documentHeight
) *
100;

if (
progressFill
) {


progressFill.style.height =
  `${progress}%`;


}

}

window.addEventListener(
'scroll',
updateScrollProgress,
{
passive:
true
}
);

let scrollTarget =
window.scrollY;
let scrollPosition =
window.scrollY;
let scrollSmoothing =
false;

function updateSmoothScroll() {
  const delta =
    scrollTarget -
    scrollPosition;

  if (
    Math.abs(delta) <
    0.5
  ) {
    scrollPosition =
      scrollTarget;
    window.scrollTo(
      0,
      scrollPosition
    );
    scrollSmoothing =
      false;
    return;
  }

  scrollPosition +=
    delta *
    0.18;

  window.scrollTo(
    0,
    scrollPosition
  );

  requestAnimationFrame(
    updateSmoothScroll
  );
}

function onWheelSmooth(
  event
) {
  if (
    event.ctrlKey ||
    event.deltaY ===
      0
  ) {
    return;
  }

  event.preventDefault();

  const maxScroll =
    document.documentElement
      .scrollHeight -
    window.innerHeight;

  scrollTarget = Math.min(
    Math.max(
      0,
      scrollTarget +
        event.deltaY
    ),
    maxScroll
  );

  if (!scrollSmoothing) {
    scrollSmoothing =
      true;
    requestAnimationFrame(
      updateSmoothScroll
    );
  }
}

window.addEventListener(
  'wheel',
  onWheelSmooth,
  {
    passive:
      false
  }
);

window.addEventListener(
  'scroll',
  () => {
    if (!scrollSmoothing) {
      scrollTarget =
        window.scrollY;
      scrollPosition =
        window.scrollY;
    }
  },
  {
    passive:
      true
  }
);

/* ==================================================
PARALLAX
================================================== */

let parallaxTicking =
false;

function updateParallax() {

parallaxElements.forEach(
(element) => {


  const rect =
    element.getBoundingClientRect();


  const windowHeight =
    window.innerHeight;


  const center =
    rect.top +
    rect.height /
    2;


  const distance =
    center -
    windowHeight /
    2;


  const movement =
    distance *
    -0.035;


  element.style.transform =
    `translateY(${movement}px)`;

}


);

parallaxTicking =
false;

}

function requestParallax() {

if (
!parallaxTicking
) {


window.requestAnimationFrame(
  updateParallax
);

parallaxTicking =
  true;


}

}

window.addEventListener(
'scroll',
requestParallax,
{
passive:
true
}
);

/* ==================================================
PROGRESS DOT NAVIGATION
================================================== */

progressDots.forEach(
(dot) => {


dot.addEventListener(
  'click',
  () => {

    const targetId =
      dot.dataset.section;


    const target =
      document.getElementById(
        targetId
      );


    if (
      target
    ) {

      target.scrollIntoView(
        {

          behavior:
            'smooth',

          block:
            'start'

        }
      );

    }

  }
);


}
);

/* ==================================================
MUSIC UI
================================================== */

function updateMusicUI() {

if (
!audio ||
!musicButton
) {


return;


}

if (
audio.paused
) {


musicButton.textContent =
  '🎵';

musicButton.classList.remove(
  'playing'
);


} else {


musicButton.textContent =
  '⏸️';

musicButton.classList.add(
  'playing'
);


}

}

/* ==================================================
PLAY MUSIC
================================================== */

function playMusic(
  options = {}
) {

  if (
    !audio
  ) {

    return;

  }

  if (
    options.silentAutoPlay
  ) {

    audio.muted = true;

  }

  const promise =
    audio.play();

  if (
    promise !== undefined
  ) {

    promise
      .then(
        () => {

          if (
            options.silentAutoPlay
          ) {

            audio.muted = false;

          }

          updateMusicUI();

        }
      )
      .catch(
        () => {

          console.log(
            'Autoplay diblokir browser.'
          );

          if (
            options.silentAutoPlay
          ) {

            audio.muted = false;

          }

          updateMusicUI();

        }
      );

  }

}

/* ==================================================
MUSIC BUTTON
================================================== */

if (
musicButton
) {

musicButton.addEventListener(
'click',
() => {


  if (
    audio.paused
  ) {

    playMusic();

  } else {

    audio.pause();

    updateMusicUI();

  }

}


);

}

/* ==================================================
AUTOPLAY
================================================== */

function attemptAutoPlay() {

  if (
    !audio
  ) {

    return;

  }

  if (
    audio.paused
  ) {

    playMusic(
      {
        silentAutoPlay:
          true
      }
    );

  }

}

window.addEventListener(
  'load',
  () => {

    const envelopeIntro =
      document.getElementById(
        'envelopeIntro'
      );

    const envelopeOpenButton =
      document.getElementById(
        'envelopeOpenButton'
      );

    const hideEnvelope = () => {

      if (
        envelopeIntro
      ) {

        envelopeIntro.classList.add(
          'hidden'
        );

        setTimeout(
          () => {

            envelopeIntro.remove();

          },
          400
        );

      }

    };

    if (
      envelopeIntro
    ) {

      const flap =
        envelopeIntro.querySelector(
          '.envelope-flap'
        );

      const flapLeft =
        envelopeIntro.querySelector(
          '.envelope-flap-left'
        );

      const flapRight =
        envelopeIntro.querySelector(
          '.envelope-flap-right'
        );

      const openEnvelopeAnimation =
        () => {

          const card =
            envelopeIntro.querySelector(
              '.envelope-card'
            );

          if (
            card
          ) {

            card.classList.add(
              'opening'
            );

          }

          if (
            flapLeft
          ) {

            flapLeft.style.transform =
              'translateX(-34px) rotateY(-80deg)';

          }

          if (
            flapRight
          ) {

            flapRight.style.transform =
              'translateX(34px) rotateY(80deg)';

          }

          if (
            flap
          ) {

            flap.style.transform =
              'rotateX(-10deg)';

          }

          setTimeout(
            () => {

              envelopeIntro.style.opacity =
                '0';

              hideEnvelope();

              attemptAutoPlay();

            },
            650
          );

        };

      envelopeOpenButton?.addEventListener(
        'click',
        () => {

          envelopeOpenButton.classList.remove(
            'is-bouncing'
          );

          void envelopeOpenButton.offsetWidth;

          envelopeOpenButton.classList.add(
            'is-bouncing'
          );

          setTimeout(
            () => {

              envelopeOpenButton.classList.remove(
                'is-bouncing'
              );

            },
            280
          );

          openEnvelopeAnimation();

        }
      );

    }

    if (
      !envelopeIntro
    ) {

      setTimeout(
        () => {

          attemptAutoPlay();

        },
        500
      );

    }

  }
);

window.addEventListener(
  'focus',
  () => {

    attemptAutoPlay();

  }
);

window.addEventListener(
  'pageshow',
  () => {

    attemptAutoPlay();

  }
);

document.addEventListener(
  'visibilitychange',
  () => {

    if (
      document.visibilityState ===
      'visible'
    ) {

      attemptAutoPlay();

    }

  }
);

/* ==================================================
AUTOPLAY FALLBACK
================================================== */

let interactionStarted =
false;

function firstInteraction() {

if (
interactionStarted
) {


return;


}

interactionStarted =
true;

if (
audio &&
audio.paused
) {


playMusic();


}

document.removeEventListener(
'click',
firstInteraction
);

document.removeEventListener(
'touchstart',
firstInteraction
);

document.removeEventListener(
'keydown',
firstInteraction
);

}

document.addEventListener(
'click',
firstInteraction
);

document.addEventListener(
'touchstart',
firstInteraction,
{
passive:
true
}
);

document.addEventListener(
'keydown',
firstInteraction
);

/* ==================================================
AUDIO EVENTS
================================================== */

if (
audio
) {

audio.addEventListener(
'play',
updateMusicUI
);

audio.addEventListener(
'pause',
updateMusicUI
);

}

/* ==================================================
FLOATING HEART
================================================== */

function createHeart() {

if (
!heartsContainer
) {


return;


}

const heart =
document.createElement(
'span'
);

const symbols = [


'♡',

'♥',

'💗',

'💖',

'✦',

'✨'


];

heart.className =
'heart';

heart.textContent =
symbols[
Math.floor(
Math.random() *
symbols.length
)
];

heart.style.left =
Math.random() *
100 +
'%';

heart.style.fontSize =
(
14 +
Math.random() *
25
) +
'px';

heart.style.animationDuration =
(
5 +
Math.random() *
5
) +
's';

heartsContainer.appendChild(
heart
);

setTimeout(
() => {


  heart.remove();

},
11000


);

}

/* ==================================================
CONTINUOUS HEARTS
================================================== */

setInterval(
() => {


if (
  document.visibilityState ===
  'visible'
) {

  createHeart();

}


},
1800
);

/* ==================================================
INITIAL HEARTS
================================================== */

window.addEventListener(
'load',
() => {


for (
  let i = 0;
  i < 12;
  i++
) {

  setTimeout(
    () => {

      createHeart();

    },
    i *
    250
  );

}


}
);

/* ==================================================
WISH BUTTON
================================================== */

if (
wishButton
) {

wishButton.addEventListener(
'click',
() => {

  wishButton.classList.remove(
    'is-popping'
  );

  void wishButton.offsetWidth;

  wishButton.classList.add(
    'is-popping'
  );

  clearTimeout(
    wishButton.popTimer
  );

  wishButton.popTimer = setTimeout(
    () => {
      wishButton.classList.remove(
        'is-popping'
      );
    },
    350
  );


  const wishes = [

    'Semoga semua impianmu perlahan menjadi nyata. ♡',

    'Semoga hari-harimu selalu dipenuhi kebahagiaan. ✨',

    'Semoga kamu selalu menemukan alasan untuk tersenyum. 💗',

    'Semoga langkahmu selalu dipertemukan dengan hal-hal baik. 🌷',

    'Semoga tahun ini menjadi salah satu tahun terbaik dalam hidupmu. ♡'

  ];


  const randomWish =
    wishes[
      Math.floor(
        Math.random() *
        wishes.length
      )
    ];


  if (
    wishText
  ) {

    wishText.style.opacity =
      '0';


    setTimeout(
      () => {

        wishText.textContent =
          randomWish;


        wishText.style.transition =
          'opacity .8s ease';


        wishText.style.opacity =
          '1';

      },
      200
    );

  }


  for (
    let i = 0;
    i < 30;
    i++
  ) {

    setTimeout(
      () => {

        createHeart();

      },
      i *
      80
    );

  }

}


);

}

/* ==================================================
INITIALIZE
================================================== */

window.addEventListener(
'load',
() => {


updateScrollProgress();

updateParallax();

updateMusicUI();


const firstSection =
  document.getElementById(
    'opening'
  );


if (
  firstSection
) {

  activateSection(
    firstSection
  );

}


}
);

/* ==================================================
SWIPE GALLERIES
================================================== */

const swipeGalleries = document.querySelectorAll('.swipe-gallery');

swipeGalleries.forEach((gallery) => {
  const track = gallery.querySelector('.swipe-track');
  const slides = gallery.querySelectorAll('.swipe-slide');
  const prev = gallery.querySelector('.swipe-prev');
  const next = gallery.querySelector('.swipe-next');
  const dots = gallery.querySelectorAll('.swipe-dot');

  let index = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  function updateGallery() {
    if (!track || slides.length === 0) return;

    index = Math.min(Math.max(index, 0), slides.length - 1);
    track.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex === index);
    });
  }

  prev?.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    updateGallery();
  });

  next?.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    updateGallery();
  });

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener('click', () => {
      index = dotIndex;
      updateGallery();
    });
  });

  gallery.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
  }, { passive: true });

  gallery.addEventListener('touchend', (event) => {
    touchEndX = event.changedTouches[0].clientX;
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) > 50) {
      if (swipeDistance < 0) {
        index = (index + 1) % slides.length;
      } else {
        index = (index - 1 + slides.length) % slides.length;
      }
      updateGallery();
    }
  }, { passive: true });

  updateGallery();
});

/* ==================================================
RESIZE
================================================== */

window.addEventListener(
'resize',
() => {


updateScrollProgress();

updateParallax();


}
);
