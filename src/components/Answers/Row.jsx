import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Unstable_Grid2';
import { countries } from '../../constant/countries';
import { getDistanceText } from '../../util/getDistanceText';
import { getCompassDirectionText } from '../../util/getCompassDirectionText';
import { getAccuracyString } from '../../util/getAccuracy';

export const Row = ({ code, answer }) => {
  if (!code) {
    return (
      <ListItem>
        <div style={{ background: '#ddd', height: '21px', width: '100%' }}></div>
      </ListItem>
    )
  }
  const codeObj = countries.find(e => e.code === code);
  const answerObj = countries.find(e => e.code === answer);
  const d = getDistanceText(codeObj, answerObj);
  const compassDirection = getCompassDirectionText(codeObj, answerObj);
  const s = getAccuracyString(d);
  // debugger;
  return (
    <ListItem>
      <Grid container spacing={0} sx={{ flexGrow: 1 }}>
        <Grid xs={4} sx={{ flexGrow: 1 }}>{codeObj.name}</Grid>
        <Grid xs={4} sx={{ flexGrow: 1 }}>{s}</Grid>
        <Grid textAlign="right" xs={3} sx={{ flexGrow: 1 }}>{d} km</Grid>
        <Grid textAlign="right" xs={1} sx={{ flexGrow: 1 }}>{compassDirection}</Grid>
      </Grid>
    </ListItem>
  )
};
