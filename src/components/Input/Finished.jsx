export const Finished = ({ isSucceed }) => {

  return (
    <div style={{
      height: 44,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    }}>
      <span>
        {isSucceed ? '🥳 Success! 🥳' : '😞 Failed... 😞'}
      </span>
    </div>
  );
};
