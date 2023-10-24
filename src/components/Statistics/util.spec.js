import { getCurrentStreak } from "./util";

it('test', () => {
  expect(1 + 1).toBe(2);
});

describe('getCurrentStreak', () => {
  it('run case 1: length = 0', () => {
    expect(getCurrentStreak([])).toBe(0);
  });

  it('run case 2: length = 1', () => {
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

  it('run case 3: length = 1', () => {
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

  it('run case 4: length = 1', () => {
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

  it('run case 5: length = 2', () => {
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

  it('run case 6: length = 2', () => {
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

  it('run case 7: length = 2', () => {
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
});
