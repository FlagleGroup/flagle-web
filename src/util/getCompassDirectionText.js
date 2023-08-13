import { getCompassDirection, getRhumbLineBearing } from 'geolib';

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
  const res = getCompassDirection(a, b, (a, b) => Math.round(getRhumbLineBearing(a, b) / 45) * 45);
  return arrows[res];
}