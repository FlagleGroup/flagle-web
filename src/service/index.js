export const getInfo = async () => {
  return {
    data: {
      code: 'FR',
      endTime: new Date(new Date().toISOString().slice(0, 10)).getTime() + 24 * 3600 * 1000 -1,
    },
  };
};
