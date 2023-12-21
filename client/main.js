import { getNode as $, insertLast, insertFirst } from "./modules/index.js";


const image = $('.image-card');

const swiper = new Swiper('.swiper', {
  loop: true,
  autoplay:false,
  parallax: true,
  speed: 1000,
  delay: 1000,
}) 




async function getPokemonData(card_number) {
  const stringCardNumber = card_number.toString()
  const response = await fetch(`https://api.pokemontcg.io/v2/cards/swsh4-${stringCardNumber}`);
  
  return response.json();
}

async function setCardImage(imageDom, card_number) {
  const data = await getPokemonData(card_number);
  const dataImageSource = data.data.images.small;
  imageDom.src = dataImageSource;

  createSwiperSlide(dataImageSource, 'hello');
}

async function getCardImageSource(card_number) {
  const data = await getPokemonData(card_number);
  return await data.data.images.small;
}

function createSwiperSlide(imageSource, alt) {
  return( /* html */ `
  <div class="swiper-slide">
    newone
    <img src=${imageSource} alt=${alt}>
  </div>
  `
  )
}

const imageSrc1 = await getCardImageSource(130);
const imageSrc2 = await getCardImageSource(132);
const imageSrc3 = await getCardImageSource(133);
const imageSrc4 = await getCardImageSource(134);
const swiperWrapper = $('.swiper-wrapper');
// let imageSource = await getCardImageSource(140);

console.log(typeof await getCardImageSource(130));

function addNewPokemonCard(imageSource, alt) {

  const slide = createSwiperSlide(imageSource, alt)
  insertLast(swiperWrapper, slide);
}

addNewPokemonCard(imageSrc1, 'hello');
addNewPokemonCard(imageSrc2, 'hello');
addNewPokemonCard(imageSrc3, 'hello');
addNewPokemonCard(imageSrc4, 'hello');


async function text() {
  addNewPokemonCard(await getCardImageSource(141), 'hello');
  addNewPokemonCard(await getCardImageSource(145), 'hello');
  addNewPokemonCard(await getCardImageSource(147), 'hello');
}



// setTimeout(text, 4000);

// createSwiperSlide()
// setCardImage();

// async function getImageSource(){
//   return new Promise((resolve, reject) => {

//   })
// }
// getPokemonData('150');

