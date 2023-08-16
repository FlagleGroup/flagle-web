import * as React from 'react';
import SendIcon from '@mui/icons-material/Send';
import InputBase from '@mui/material/InputBase';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';

import { countries } from '../../constant/countries';

export const Input = ({ curCounties, setCurCountries }) => {
  return (
    <Paper
      elevation={2}
      component="form"
      sx={{ mt: '20px', display: 'flex', alignItems: 'center' }}
    >
      <Autocomplete
        popupIcon={null}
        id="combo-box-demo"
        options={countries.map(e => ({ code: e.code, label: e.name }))}
        openOnFocus={false}
        renderInput={(params) => (
          <InputBase
            ref={params.InputProps.ref}
            type="text"
            sx={{ p: '0 16px', height: '50px' }}
            fullWidth
            inputProps={params.inputProps}
          />
        )}
        sx={{ flexGrow: 1, m: '-4px 0' }}
      />
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        <SendIcon />
      </IconButton>
    </Paper>
  )
};
