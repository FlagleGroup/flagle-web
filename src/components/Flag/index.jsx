import './style.css'
import Box from '@mui/material/Box';

export const Flag = () => {
  const code = 'hk'
  return (
    <Box mt={2} sx={{textAlign: 'center'}}>
      <img
        className="Flag-img"
        src={`https://flagcdn.com/${code}.svg`}
        alt="guess it!" />
    </Box>
  );
}