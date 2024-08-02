/** @format */

import * as React from 'react';

import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

interface CustomLoadingProps {}

const CustomLoading: React.FunctionComponent<CustomLoadingProps> = () => {
  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', margin: '-25px 0 0 -25px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '0.8em' }}>
        <CircularProgress />
        <Typography>Loading...</Typography>
      </div>
    </div>
  );
};

export default CustomLoading;
