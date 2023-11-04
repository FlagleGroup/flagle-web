export const getDateResultListFromDBResult = (dbResult) => {
  const dateResult = [];

  dbResult.forEach(({time, code, answer}) => {
    const date = new Date(time).toISOString().slice(0, 10);
    const lastResult = dateResult[dateResult.length - 1];
    if (lastResult && lastResult.date === date) {
      lastResult.codes ? lastResult.codes.push(code) : lastResult.codes = [code];
      if (lastResult.codes.length === 6 || code === answer) {
        lastResult.isFinished = true;
        if (code === answer) {
          lastResult.isWin = true;
        }
      }
    } else {
      dateResult.push({
        date,
        codes: [code],
        answer,
        isFinished: code === answer,
        isWin: code === answer,
      });
    }
  });

  return dateResult;
}

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
  return d.toISOString().slice(0, 10) === new Date(b).toISOString().slice(0, 10);
};

export const getCurrentStreak = (dateResult) => {
  let i = dateResult.length - 1;
  let streak = 0;
  while (i >= 0) {
    if (dateResult[i].isWin && (i === dateResult.length - 1 || isPreviousDayBefore(dateResult[i + 1]?.date, dateResult[i].date))) {
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
      if (isPreviousDayBefore(dateResult[i + 1]?.date, dateResult[i].date)) {
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

export const getDistributionData = (dateResult) => dateResult.filter(e => e.isWin).map(e => e.codes.length).reduce((a, l) => {
  a[l] = (a[l] || 0) + 1;
  return a;
}, {});
