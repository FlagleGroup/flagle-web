export const getInfo = async () => {
  return {
    data: {
      answer: 'FR',
      endTime: new Date(new Date().toISOString().slice(0, 10)).getTime() + 24 * 3600 * 1000 -1,
    },
  };
};
