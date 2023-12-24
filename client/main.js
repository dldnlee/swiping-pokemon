import { 
  getNode as $, 
  insertLast, 
  getCardImageSource, 
  getRandomNumber, 
  packData,
  hideElement,
  showElement,
  removeAllChildNodes,
} from "./modules/index.js";
// import "./data/pokemon_versions.json";

// Swiper Slide Template Creator
function createSwiperSlide(imageSource, alt) {
  return( /* html */ `
  <div class="swiper-slide">
    <img src=${imageSource} loading="lazy" alt=${alt}>
  </div>
  `
  )
}

// Add created slideds to swiper wrapper
async function addSlides(version, index){
  const swiperWrapper = $('.swiper-wrapper');
  let imageSrc;
  let slide;
  console.log('test');
  for(let i=index-20;i<index; i++){
    imageSrc = await getCardImageSource(version, i);
    slide = createSwiperSlide(imageSrc, 'pokemon-card')
    insertLast(swiperWrapper, slide);
  }
}

// Swiper Initialization
function initializeSwiper() {
  const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: true,  
    parallax: true,
    speed: 500,
    effect: 'cards',
    createElements: true,
    cardsEffect: {
      slideShadows: false,
      perSlideOffset: 5,
      perSlideRotate: 1
    },
    navigation:{
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
  }) 
}

// Running the Whole Process
async function pickCard(version, max) {
  showElement(loadingScreen);
  await addSlides(version, getRandomNumber(21, max));
  initializeSwiper();
  hideElement(loadingScreen);
}

// DOM Elements / Required Variables
const loadingScreen = $('.loader-container');
const packContainer = $('.pack-container');
const swiperContainer = $('.swiper-container');
const generatorContainer = $('.generator-container');
const packInfo = await packData();
const homeButton = $('.home-button');
const rollAgainButton = $('.roll-again-button');
const swiperWrapper = $('.swiper-wrapper')
let currentVersion; 
let currentMax;

// Process after clicking on the Card Pack
function startEvent(version, max) { 
  hideElement(packContainer);
  currentVersion = version;
  currentMax = max;
  pickCard(version, max);
  showElement(generatorContainer);
}

// Card Pack on Click function
function handleCardPack(e) {
  e.preventDefault();
  const target = e.target.closest('button');
  if(!target) return;
  let targetID = target.dataset.id;

  switch(targetID) {
    case '1':
      console.log('sun and moon');
      startEvent(packInfo.sun_moon.id, packInfo.sun_moon.max_cards);
      break;
    case '2':
      console.log('scarlet and violet');
      startEvent(packInfo.scarlet_violet.id, packInfo.scarlet_violet.max_cards);
      break;
    case '3':
      console.log('sword and shield');
      startEvent(packInfo.sword_shield.id, packInfo.sword_shield.max_cards);
      break;
    case '4':
      console.log('x and y');
      startEvent(packInfo.x_y.id, packInfo.x_y.max_cards);
      break;
  }
}

// Home button handling
function handleHomeButton() {
  location.reload();
}

// Roll again button handling
function handleRollAgain() {
  removeAllChildNodes(swiperWrapper);
  pickCard(currentVersion, currentMax);
}



// 아주 좋은 콜라보
gsap.from('.pack-container',{
  y:100,
  opacity: 0,
  stagger: 0.1,
  duration: 1
})

gsap.from('.border-container', {
  opacity: 0,
  duration: 2,
})

const muteButton = $('.mute-button');
const muteIcon = $('.mute-icon');
const audio = $('.pokemon-audio');
let muteToggle = false;

function handleMute() {
  muteToggle = !muteToggle;
  console.log(muteToggle);
  if(muteToggle) {
    muteIcon.src = "assets/icons/mute.png";
    audio.pause();
  } else {
    muteIcon.src = "assets/icons/volume.png";
    audio.play();
  }
}

function audioVolumeControl(amount) {
  audio.volume = amount;
}

audioVolumeControl(0.6);

muteButton.addEventListener('click', handleMute);
packContainer.addEventListener('click', handleCardPack);
homeButton.addEventListener('click', handleHomeButton);
rollAgainButton.addEventListener('click', handleRollAgain);