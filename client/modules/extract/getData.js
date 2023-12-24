


// Extracting Pokemon Data
export async function getPokemonData(card_version, card_number) {
  const stringCardNumber = card_number.toString()
  // const response = await fetch(`https://api.pokemontcg.io/v2/cards/swsh4-${stringCardNumber}`);
  const response = await fetch(`https://api.pokemontcg.io/v2/cards/${card_version}-${stringCardNumber}`);
  return response.json();
}

// Extracting Image Source from Pokemon Data
export async function getCardImageSource(card_version, card_number) {
  const data = await getPokemonData(card_version,card_number);
  return data.data.images.small;
}

// Get a random number between specified values
export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


