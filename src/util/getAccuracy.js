const BASE_LOG = Math.pow(40075 / 2, 0.1); // earth's perimeter is 40075 km

export const getAccuracyString = (distance) => {
  // FIXME: should use a better way to get accuracy
  const accuracy = 10 - Math.round(Math.log(distance) / Math.log(BASE_LOG)); // [0 ~ 10]
  const greenLength = Math.floor(accuracy / 2);
  const yellowLength = accuracy - greenLength * 2;
  return [
    ...new Array(greenLength).fill('🟩'),
    ...new Array(yellowLength).fill('🟨'),
    ...new Array(5 - greenLength - yellowLength).fill('⬜'), // can't use string.padEnd here, due to emoji's length is unpredictable
  ];
};
