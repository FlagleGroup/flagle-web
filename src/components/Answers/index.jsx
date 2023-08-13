import * as React from 'react';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
import Input from '@mui/material/Input';
import Autocomplete from '@mui/material/Autocomplete';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { Row } from './Row';
import { countries } from '../../constant/countries';

export function Answers() {
  return (
    <React.Fragment>
      <Paper elevation={2} sx={{ mt: '20px' }}>
        <List disablePadding>
          <Row code={'ca'} />
          <Divider />
          <Row code={'mo'} />
          <Divider />
          <Row code={'cn'} />
          <Divider />
          <Row code={'tw'} />
          <Divider />
          <Row />
          <Divider />
          <Row />
        </List>
      </Paper>
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
              <InputBase type="text" sx={{ p: '0 16px', height: '50px'}} fullWidth {...params.inputProps} />
            </div>
          )}
          sx={{ flexGrow: 1, m: '-4px 0'}}
        />
        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
          <SendIcon />
        </IconButton>
      </Paper>
    </React.Fragment>
  );
}
