import { getDistance, convertDistance } from 'geolib';

export const getDistanceText = (a, b) => {
  const res = getDistance(a, b);

  return `${Math.round(convertDistance(res, 'km'))} km`
}