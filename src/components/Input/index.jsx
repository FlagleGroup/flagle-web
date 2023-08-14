import * as React from 'react';
import SendIcon from '@mui/icons-material/Send';
import InputBase from '@mui/material/InputBase';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';

import { countries } from '../../constant/countries';

export const Input = () => {
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
          <div ref={params.InputProps.ref}>
            <InputBase type="text" sx={{ p: '0 16px', height: '50px' }} fullWidth {...params.inputProps} />
          </div>
        )}
        sx={{ flexGrow: 1, m: '-4px 0' }}
      />
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        <SendIcon />
      </IconButton>
    </Paper>
  )
}