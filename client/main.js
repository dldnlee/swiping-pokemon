import { getNode as $, insertLast, insertFirst, getPokemonData, getCardImageSource, getRandomNumber } from "./modules/index.js";
import "./data/pokemon_versions.json";

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
  for(let i=index-30;i<index; i++){
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
      perSlideRotate: 5
    },
    navigation:{
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
  }) 
}


// Running the Whole Process
async function addAll() {
  await addSlides('swsh4', getRandomNumber(31, 200));
  initializeSwiper();
}


addAll();


