import { getNode as $, insertLast, insertFirst } from "./modules/index.js";

// Extracting Pokemon Data
async function getPokemonData(card_number) {
  const stringCardNumber = card_number.toString()
  const response = await fetch(`https://api.pokemontcg.io/v2/cards/swsh4-${stringCardNumber}`);
  
  return response.json();
}

// Extracting Image Source from Pokemon Data
async function getCardImageSource(card_number) {
  const data = await getPokemonData(card_number);
  return data.data.images.small;
}

// Swiper Slide Template Creator
function createSwiperSlide(imageSource, alt) {
  return( /* html */ `
  <div class="swiper-slide">
    <img src=${imageSource} loading="lazy" alt=${alt}>
  </div>
  `
  )
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
      perSlideRotate: 5
    },
    navigation:{
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
  }) 
}

// Get a random number between specified values
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// Running the Whole Process
async function addAll(index) {
  const swiperWrapper = $('.swiper-wrapper');
  let imageSrc;
  let slide;
  for(let i=index-30;i<index; i++){
    imageSrc = await getCardImageSource(i);
    slide = createSwiperSlide(imageSrc, 'pokemon-card')
    insertLast(swiperWrapper, slide);
    
  }
  initializeSwiper();
}


addAll(getRandomNumber(31, 200));


