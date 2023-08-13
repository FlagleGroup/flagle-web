import TextField from '@mui/material/TextField';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { countries } from '../../constant/countries';
import { getDistanceText } from '../../util/getDistanceText';
import { getCompassDirectionText } from '../../util/getCompassDirectionText';

export const Row = ({ code }) => {
  if (!code) {
    return (
      <ListItem>
        <div style={{ background: '#ddd', height: '21px', width: '100%' }}></div>
      </ListItem>
    )
  }
  const codeObj = countries.find(e => e.code === code.toUpperCase());
  const answerObj = countries.find(e => e.code === 'hk'.toUpperCase());
  const d = getDistanceText(answerObj, codeObj);
  const compassDirection = getCompassDirectionText(answerObj, codeObj);
  // debugger;
  return (
    <ListItem>
      <span>{codeObj.name}</span>
      <span>{d}</span>
      <span>{compassDirection}</span>
    </ListItem>
  )
}
