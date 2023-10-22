import React from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { Distribution } from './Distribution';

export const Statistics = () => {
  const distributionData = {
    '1': 11,
    '2': 0,
    '3': 1,
    '4': 0,
    '5': 0,
    '6': 0,
  };

  return (
    <Dialog open fullWidth>
      <DialogTitle>
        Statistics
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid xs={3}>
            <Typography variant="h4">3</Typography>
            <Typography variant="body2" display="block" gutterBottom>Played</Typography>
          </Grid>
          <Grid xs={3}>
            <Typography variant="h4">33</Typography>
            <Typography variant="body2" display="block" gutterBottom>Win %</Typography>
          </Grid>

          <Grid xs={3}>
            <Typography variant="h4">3</Typography>
            <Typography variant="body2" display="block" gutterBottom>Current Streak</Typography>
          </Grid>
          <Grid xs={3}>
            <Typography variant="h4">4</Typography>
            <Typography variant="body2" display="block" gutterBottom>Max Streak</Typography>
          </Grid>
        </Grid>
        <Distribution data={distributionData} />
      </DialogContent>
    </Dialog>
  );
}