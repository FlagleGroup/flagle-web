import * as React from 'react';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { Row } from './Row';

export function Guess({ countries, answer }) {
  const list = new Array(6).fill(1).reduce((a, e, i) => [...a, <Row key={i} code={countries[i]} answer={answer}/>, <Divider key={i + 10}/>], []);
  list.pop();
  return (
    <React.Fragment>
      <Paper elevation={4} sx={{ mt: '20px' }}>
        <List disablePadding>
          {list}
        </List>
      </Paper>
    </React.Fragment>
  );
};
