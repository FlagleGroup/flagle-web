import './style.css'
import Box from '@mui/material/Box';

export const Flag = ({ answer }) => {
  return (
    <Box mt={2} sx={{textAlign: 'center'}}>
      <img
        className="Flag-img"
        src={`https://flagcdn.com/${answer?.toLowerCase()}.svg`}
        alt="guess it!" />
    </Box>
  );
}