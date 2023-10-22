const PERIMETER = 40075; // earth's perimeter is 40075 km
// const BASE_LOG = Math.pow(PERIMETER / 2, 0.1);

export const getAccuracyString = (distance) => {
  // accuracy should be in [0 ~ 10]
  // FIXME: should use a better way to get accuracy
  // const accuracy = 10 - Math.round(Math.log(distance) / Math.log(BASE_LOG));
  const accuracyDistance = Math.round(10 * (distance / PERIMETER));
  const accuracy = 10 - (+distance === 0 ? 0 : Math.max(1, accuracyDistance));
  const greenLength = Math.floor(accuracy / 2);
  const yellowLength = accuracy - greenLength * 2;
  return [
    ...new Array(greenLength).fill('🟩'),
    ...new Array(yellowLength).fill('🟨'),
    ...new Array(5 - greenLength - yellowLength).fill('⬜'), // can't use string.padEnd here, due to emoji's length is unpredictable
  ];
};
