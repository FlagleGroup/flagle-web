import { getCurrentStreak, getDateResultListFromDBResult, getMaxStreak, isPreviousDayBefore } from "./util";

describe('getDateResultListFromDBResult', () => {
  it('run getDateResultListFromDBResult case 1', () => {
    expect(getDateResultListFromDBResult([]).length).toBe(0);
  });

  it('run getDateResultListFromDBResult case 2', () => {
    expect(getDateResultListFromDBResult([{
      time: '2021-05-05T20:18:07.534Z',
      code: 'US',
      answer: 'US',
    }])).toMatchObject([{
      date: '2021-05-05',
      codes: ['US'],
      answer: 'US',
      isFinished: true,
      isWin: true,
    }]);
  });

  it('run getDateResultListFromDBResult case 3', () => {
    expect(getDateResultListFromDBResult([{
      time: '2021-05-05T20:18:07.534Z',
      code: 'US',
      answer: 'BR',
    }])).toMatchObject([{
      date: '2021-05-05',
      codes: ['US'],
      answer: 'BR',
      isFinished: false,
      isWin: false,
    }]);
  });

  it('run getDateResultListFromDBResult case 4', () => {
    expect(getDateResultListFromDBResult([{
      time: '2021-05-05T20:18:07.534Z',
      code: 'US',
      answer: 'BR',
    }, {
      time: '2021-05-05T20:19:07.534Z',
      code: 'BR',
      answer: 'BR',
    }])).toMatchObject([{
      date: '2021-05-05',
      codes: ['US', 'BR'],
      answer: 'BR',
      isFinished: true,
      isWin: true,
    }]);
  });

  it('run getDateResultListFromDBResult case 5', () => {
    expect(getDateResultListFromDBResult([{
      time: '2021-05-05T20:18:07.534Z',
      code: 'US',
      answer: 'BR',
    }, {
      time: '2021-05-05T20:19:07.534Z',
      code: 'FR',
      answer: 'BR',
    }, {
      time: '2021-05-05T20:19:07.534Z',
      code: 'GR',
      answer: 'BR',
    }, {
      time: '2021-05-05T20:20:07.534Z',
      code: 'SA',
      answer: 'BR',
    }, {
      time: '2021-05-05T20:21:07.534Z',
      code: 'ZA',
      answer: 'BR',
    }, {
      time: '2021-05-05T20:22:07.534Z',
      code: 'TH',
      answer: 'BR',
    }])).toMatchObject([{
      date: '2021-05-05',
      codes: ['US', 'FR', 'GR', 'SA', 'ZA', 'TH'],
      answer: 'BR',
      isFinished: true,
      isWin: false,
    }]);
  });

  it('run getDateResultListFromDBResult case 6', () => {
    expect(getDateResultListFromDBResult([{
      time: '2021-05-04T20:18:07.534Z',
      code: 'FR',
      answer: 'BR',
    }, {
      time: '2021-05-05T20:18:07.534Z',
      code: 'US',
      answer: 'US',
    }])).toMatchObject([{
      date: '2021-05-04',
      codes: ['FR'],
      answer: 'BR',
      isFinished: false,
      isWin: false,
    }, {
      date: '2021-05-05',
      codes: ['US'],
      answer: 'US',
      isFinished: true,
      isWin: true,
    }]);
  });
});

describe('isPreviousDayBefore', () => {
  it('should return false when there is undefined parameter(s)', () => {
    expect(isPreviousDayBefore('', '2021-02-18')).toBe(false);
    expect(isPreviousDayBefore(undefined, '2021-02-18')).toBe(false);
    expect(isPreviousDayBefore('2021-02-18', '')).toBe(false);
    expect(isPreviousDayBefore('', undefined)).toBe(false);
  });

  it('should return false when the date is not correct', () => {
    expect(isPreviousDayBefore('2021-02-16', '2021-02-17')).toBe(false);
  });

  it('should throw invalid date error when the first data is invalid', () => {
    expect(() => isPreviousDayBefore('2021-02-18', 'abc')).toThrow(/invalid/ig);
    expect(() => isPreviousDayBefore('a', '2021-02-18')).toThrow(/invalid/ig);
    expect(() => isPreviousDayBefore('a', 'b')).toThrow(/invalid/ig);
    expect(() => isPreviousDayBefore('2021-13-01', '2021-12-31')).toThrow(/invalid/ig);
  });

  it('should return true when the date is correct', () => {
    expect(isPreviousDayBefore('2021-02-18', '2021-02-17')).toBe(true);
    expect(isPreviousDayBefore('2021-01-01', '2020-12-31')).toBe(true);
    expect(isPreviousDayBefore('2020-03-01', '2020-02-29')).toBe(true);
    expect(isPreviousDayBefore('2021-03-01', '2021-02-28')).toBe(true);
    expect(isPreviousDayBefore('2000-03-01', '2000-02-29')).toBe(true);
    expect(isPreviousDayBefore('2100-03-01', '2100-02-28')).toBe(true);
  });

  it('should be careful when date is on the edge: > 31 will throw error', () => {
    expect(isPreviousDayBefore('2021-04-31', '2021-04-30')).toBe(true);
    expect(() => isPreviousDayBefore('2021-04-32', '2021-04-31')).toThrow(/invalid/ig);
    expect(isPreviousDayBefore('2021-02-29', '2021-02-28')).toBe(true);
    expect(isPreviousDayBefore('2021-02-31', '2021-02-30')).toBe(true);
    expect(() => isPreviousDayBefore('2021-02-32', '2021-02-31')).toThrow(/invalid/ig);
  });
});

describe('getCurrentStreak', () => {
  it('run getCurrentStreak case 1: length = 0', () => {
    expect(getCurrentStreak([])).toBe(0);
  });

  it('run getCurrentStreak case 2: length = 1', () => {
    expect(getCurrentStreak([
      {
        date: '2023-10-10',
        codes: ['FR'],
        answer: 'FR',
        isFinished: true,
        isWin: true,
      },
    ])).toBe(1);
  });

  it('run getCurrentStreak case 3: length = 1', () => {
    expect(getCurrentStreak([
      {
        date: '2023-10-10',
        codes: ['US', 'GB'],
        answer: 'FR',
        isFinished: false,
        isWin: false,
      },
    ])).toBe(0);
  });

  it('run getCurrentStreak case 4: length = 1', () => {
    expect(getCurrentStreak([
      {
        date: '2023-10-10',
        codes: ['GB', 'NZ', 'AU', 'NL', 'DE', 'RU'],
        answer: 'FR',
        isFinished: true,
        isWin: false,
      },
    ])).toBe(0);
  });

  it('run getCurrentStreak case 5: length = 2', () => {
    expect(getCurrentStreak([
      {
        date: '2023-10-09',
        codes: ['FR'],
        answer: 'FR',
        isFinished: true,
        isWin: true,
      },
      {
        date: '2023-10-10',
        codes: ['NL'],
        answer: 'NL',
        isFinished: true,
        isWin: true,
      },
    ])).toBe(2);
  });

  it('run getCurrentStreak case 6: length = 2', () => {
    expect(getCurrentStreak([
      {
        date: '2023-10-08',
        codes: ['FR'],
        answer: 'FR',
        isFinished: true,
        isWin: true,
      },
      {
        date: '2023-10-10',
        codes: ['NL'],
        answer: 'NL',
        isFinished: true,
        isWin: true,
      },
    ])).toBe(1);
  });

  it('run getCurrentStreak case 7: length = 2', () => {
    expect(getCurrentStreak([
      {
        date: '2023-10-09',
        codes: ['GB'],
        answer: 'FR',
        isFinished: true,
        isWin: false,
      },
      {
        date: '2023-10-10',
        codes: ['NL'],
        answer: 'NL',
        isFinished: true,
        isWin: true,
      },
    ])).toBe(1);
  });

  it('run getCurrentStreak case 8: length = 3', () => {
    expect(getCurrentStreak([
      {
        date: '2023-10-09',
        codes: ['GB'],
        answer: 'FR',
        isFinished: true,
        isWin: false,
      },
      {
        date: '2023-10-10',
        codes: ['NL'],
        answer: 'NL',
        isFinished: true,
        isWin: true,
      },
      {
        date: '2023-10-11',
        codes: ['US'],
        answer: 'US',
        isFinished: true,
        isWin: true,
      },
    ])).toBe(2);
  });

  it('run getCurrentStreak case 9: length = 3', () => {
    expect(getCurrentStreak([
      {
        date: '2023-10-08',
        codes: ['GB'],
        answer: 'GB',
        isFinished: true,
        isWin: true,
      },
      {
        date: '2023-10-10',
        codes: ['NL'],
        answer: 'NL',
        isFinished: true,
        isWin: true,
      },
      {
        date: '2023-10-11',
        codes: ['US'],
        answer: 'US',
        isFinished: true,
        isWin: true,
      },
    ])).toBe(2);
  });

  it('run getCurrentStreak case 10: length = 4', () => {
    expect(getCurrentStreak([
      {
        date: '2023-10-08',
        codes: ['BR'],
        answer: 'BR',
        isFinished: true,
        isWin: true,
      },
      {
        date: '2023-10-09',
        codes: ['GB'],
        answer: 'FR',
        isFinished: true,
        isWin: false,
      },
      {
        date: '2023-10-10',
        codes: ['NL'],
        answer: 'NL',
        isFinished: true,
        isWin: true,
      },
      {
        date: '2023-10-11',
        codes: ['US'],
        answer: 'US',
        isFinished: true,
        isWin: true,
      },
    ])).toBe(2);
  });
});

describe('getMaxStreak', () => {

  it('run getMaxStreak case 1: length = 5', () => {
    expect(getMaxStreak([
      {
        date: '2023-10-07',
        codes: ['SA'],
        answer: 'SA',
        isFinished: true,
        isWin: true,
      },
      {
        date: '2023-10-08',
        codes: ['BR'],
        answer: 'BR',
        isFinished: true,
        isWin: true,
      },
      {
        date: '2023-10-09',
        codes: ['GB'],
        answer: 'GB',
        isFinished: true,
        isWin: true,
      },
      {
        date: '2023-10-11',
        codes: ['NL'],
        answer: 'NL',
        isFinished: true,
        isWin: true,
      },
      {
        date: '2023-10-12',
        codes: ['US'],
        answer: 'US',
        isFinished: true,
        isWin: true,
      },
    ])).toBe(3);
  });
});
