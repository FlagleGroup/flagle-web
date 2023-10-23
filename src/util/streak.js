/**
 * Is b a's previous day?
 * @param {current} a '2023-10-02'
 * @param {previous} b '2023-10-01'
 */
export const isPreviousDayBefore = (a, b) => {
  if (!a || !b) {
    return false;
  }
  const d = new Date(a);
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10) === b;
};

export const getCurrentStreak = (dateResult) => {
  let i = dateResult.length - 1;
  let streak = 0;
  while (i >= 0) {
    if (dateResult[i].isWin && (i === dateResult.length - 1 || isPreviousDayBefore(dateResult[i + 1], dateResult[i]))) {
      streak++;
    } else {
      break;
    }
    i--;
  }
  return streak;
};
export const getMaxStreak = (dateResult) => {
  let i = dateResult.length - 1;
  let streak = 0;
  let max = 0;
  while (i >= 0) {
    if (dateResult[i].isWin) {
      if (isPreviousDayBefore(dateResult[i + 1], dateResult[i])) {
        streak ++;
      } else {
        streak = 1;
      }
      max = Math.max(max, streak);
    } else {
      streak = 0;
    }

    i--;
  }
  return streak;
};
