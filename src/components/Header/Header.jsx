import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

export const Header = ({ showStatisticModal }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Flagle
          </Typography>

          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="leaderboard"
            onClick={showStatisticModal}
          >
            <LeaderboardIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
