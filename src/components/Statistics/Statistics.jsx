import React, { useEffect, useState } from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { Distribution } from './Distribution';
import { readAll } from '../../util/db';
import { getCurrentStreak, getDateResultListFromDBResult, getDistributionData, getMaxStreak } from './util';

const DEFAULT_DISTRIBUTIONDATA = {
  '1': 0,
  '2': 0,
  '3': 0,
  '4': 0,
  '5': 0,
  '6': 0,
};

export const Statistics = ({ codeList, answer, open, onClose }) => {
  const [dataPlayed, setDataPlayed] = useState(0);
  const [dataWin, setDataWin] = useState(0);
  const [dataCurrentStreak, setDataCurrentStreak] = useState(0);
  const [dataMaxStreak, setDataMaxStreak] = useState(0);
  const [distributionData, setDistributionData] = useState(DEFAULT_DISTRIBUTIONDATA);

  useEffect(() => {
    readAll().then((res) => {
      const dateResult = getDateResultListFromDBResult(res);
      const dataPlayedRes = dateResult.filter((e) => e.isFinished).length;
      setDataPlayed(dataPlayedRes);
      setDataWin(dataPlayedRes && Math.round(dateResult.filter((e) => e.isWin).length / dataPlayedRes * 100));
      setDataCurrentStreak(getCurrentStreak(dateResult));
      setDataMaxStreak(getMaxStreak(dateResult));
      setDistributionData({
        ...DEFAULT_DISTRIBUTIONDATA,
        ...getDistributionData(dateResult),
      });
    });
  }, []);

  return (
    <Dialog open={open} fullWidth onClose={onClose}>
      <DialogTitle>
        Statistics
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid xs={3}>
            <Typography variant="h4">{dataPlayed}</Typography>
            <Typography variant="body2" display="block" gutterBottom>Played</Typography>
          </Grid>
          <Grid xs={3}>
            <Typography variant="h4">{dataWin}</Typography>
            <Typography variant="body2" display="block" gutterBottom>Win %</Typography>
          </Grid>

          <Grid xs={3}>
            <Typography variant="h4">{dataCurrentStreak}</Typography>
            <Typography variant="body2" display="block" gutterBottom>Current Streak</Typography>
          </Grid>
          <Grid xs={3}>
            <Typography variant="h4">{dataMaxStreak}</Typography>
            <Typography variant="body2" display="block" gutterBottom>Max Streak</Typography>
          </Grid>
        </Grid>
        <Distribution data={distributionData} curDistribution={answer === codeList[codeList.length - 1] ? codeList.length : 0}/>
      </DialogContent>
    </Dialog>
  );
};
