import { getNode as $, insertLast, getCardImageSource, getRandomNumber } from "./modules/index.js";
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

function createCardPack() {
  return( /* html */ `
    <button>
      <img src=""/>
    </button>
  
  
  `

  )


}
// Running the Whole Process
async function pickCard(version, max) {
  await addSlides(version, getRandomNumber(21, max));
  initializeSwiper();
}

function hideElement(node) {
  node.classList.add('.hidden');
}

// const swiperContainer = $('.swiper-container');

// pickCard('swsh4', 200);
// console.log(await packData());


async function packData() {
  const response = await fetch('./data/pokemon_versions.json');
  const data = await response.json();
  return data;
}


const packContainer = $('.pack-container');

function handleCardPack(e) {
  e.preventDefault();
  const target = e.target.closest('button');
  if(!target) return;

  let targetID = target.dataset.id;

  switch(targetID) {
    case '1':
      console.log('sun and moon');
      break;
    case '2':
      console.log('scarlet and violet');
      break;
    case '3':
      console.log('sword and shield');
      break;
    case '4':
      console.log('x and y');
      break;
  }
}

packContainer.addEventListener('click', handleCardPack);

