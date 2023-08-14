import * as React from 'react';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { Row } from './Row';

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
    </React.Fragment>
  );
}
