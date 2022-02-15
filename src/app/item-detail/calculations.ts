export const roundNumberTwoDecimals = number => {
  return Math.round(number * 100) / 100;
};


export const bytesToMbps = (bytes) => {
  return bytes * 8.0E-6;
};
