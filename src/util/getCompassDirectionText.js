import { getCompassDirection, getRhumbLineBearing, getDistance } from 'geolib';

const arrows = {
  N: "⬆️",
  NNE: "↗️",
  NE: "↗️",
  ENE: "↗️",
  E: "➡️",
  ESE: "↘️",
  SE: "↘️",
  SSE: "↘️",
  S: "⬇️",
  SSW: "↙️",
  SW: "↙️",
  WSW: "↙️",
  W: "⬅️",
  WNW: "↖️",
  NW: "↖️",
  NNW: "↖️",
};

export const getCompassDirectionText = (a, b) => {
  if (getDistance(a, b) === 0) return '🎉';
  const res = getCompassDirection(a, b, (a, b) => Math.round(getRhumbLineBearing(a, b) / 45) * 45);
  return arrows[res];
}