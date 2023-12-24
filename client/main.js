import { getNode as $, insertLast, getCardImageSource, getRandomNumber, packData } from "./modules/index.js";
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
  await addSlides(version, getRandomNumber(21, max));
  initializeSwiper();
}

// Hide element function
function hideElement(node) {
  node.classList.add('hidden');
}

// Show element function
function showElement(node) {
  node.classList.remove('hidden');
}

// pickCard('swsh4', 200);
// console.log(await packData());

const packContainer = $('.pack-container');
const swiperContainer = $('.swiper-container');

const packInfo = await packData();
console.log(packInfo.sun_moon.max_cards);

function startEvent(version, max) { 
  hideElement(packContainer);
  pickCard(version, max);
  showElement(swiperContainer);
  console.log('test');
}

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





packContainer.addEventListener('click', handleCardPack);

