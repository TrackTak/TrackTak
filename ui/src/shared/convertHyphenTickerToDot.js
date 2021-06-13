const convertHyphenTickerToDot = (ticker) => {
  // Match last hyphen only
  const i = ticker.lastIndexOf("-");
  const newTicker = ticker.substr(0, i) + "." + ticker.substr(i + 1);

  return newTicker;
};

export default convertHyphenTickerToDot;
