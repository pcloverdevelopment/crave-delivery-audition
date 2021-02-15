import fetch from 'node-fetch';

const USELESS_FACT_URI = 'https://uselessfacts.jsph.pl/random.json?language=en';

// didn't handle if unsuccessful response
const getUselessFact = async () => {
  const response = await fetch(USELESS_FACT_URI);
  const body = await response.json();

  return body.text;
};

export default getUselessFact;