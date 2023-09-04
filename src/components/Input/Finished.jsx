export const Finished = ({ isSucceed }) => {

  return (
    <div>
      {isSucceed ? 'Success!' : 'Failed...'}
    </div>
  );
};
