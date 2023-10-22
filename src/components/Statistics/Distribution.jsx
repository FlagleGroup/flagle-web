import React from 'react';
import Typography from '@mui/material/Typography';

const styles = {
  row: {
    position: 'relative',
    padding: '0 16px',
    height: '20px',
    paddingBottom: '4px',
    lineHeight: '20px',
  },
  axis: {
    width: '16px',
    position: 'absolute',
    left: 0,
  },
  bar: {
    height: '20px',
    background: '#999',
    position: 'relative',
  },
  label: {
    height: '20px',
    background: '#999', // TODO: color and background
    color: '#fff',
    position: 'absolute',
    right: '-16px',
    padding: '0 3px',
    minWidth: '16px',
    boxSizing: 'border-box',
  },
  label0: {
    height: '20px',
    width: '16px',
    background: '#999',
    color: '#fff',
    position: 'absolute',
    left: 0,
    textAlign: 'center',
  },
  curLabel: {
    background: '#1976d2',
  }
}

export const Distribution = ({ data, curDistribution }) => {
  const max = Math.max(...Object.values(data));
  if (max === 0) {

    return null;
  }

  const percentage = Object.entries(data).map(([k, v]) => ([k, `${v / max * 100}%`]));
  console.log('pe', percentage)

  return (
    <>
      <Typography variant="h6" gutterBottom>Guess Distribution</Typography>
      <div>
        {
          percentage.map(([k, v]) => (
            <div style={styles.row}>
              <Typography variant="body2" display="block" style={styles.axis}>{k}</Typography>
              <div style={{
                ...styles.bar,
                width: v,
                ...(curDistribution === +k ? styles.curLabel : {}),
              }}>
                <div style={{
                  ...(data[k] === 0 ? styles.label0 : styles.label),
                  ...(curDistribution === +k ? styles.curLabel : {}),
                }}>
                  <Typography variant="body2" display="block">{data[k]}</Typography>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
};
