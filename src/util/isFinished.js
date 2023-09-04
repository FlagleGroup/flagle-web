export const isSucceed = (countries, code) => {
  return !!code && !!countries.length && countries[countries.length -1] === code;
}

export const isFinished = (countries, code) => {
  return countries.length >= 6 || isSucceed(countries, code);
};
