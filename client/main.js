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
    <img src=${imageSource} alt=${alt}>
  </div>
  `
  )
}

// Swiper Initialization
function initializeSwiper() {
  const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: false,  
    parallax: true,
    speed: 1000,
    effect: 'cards',
    createElements: true,
    navigation:{
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    // delay: 1000,
  }) 
}



// Running the Whole Process
async function addAll() {
  const swiperWrapper = $('.swiper-wrapper');
  let imageSrc;
  let slide;
  for(let i=50;i<100; i++){
    imageSrc = await getCardImageSource(i);
    slide = createSwiperSlide(imageSrc, 'hello')
    insertLast(swiperWrapper, slide);
    
  }
  initializeSwiper();
}



addAll();


