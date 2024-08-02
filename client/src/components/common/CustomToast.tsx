/** @format */

import * as React from 'react';
import * as _ from 'underscore';

import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';

import { CustomToastAlertType } from '../../types/custom-toast';
import { CustomToastContext } from '../../context/CustomToast';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

interface CustomToastProps {}

const CustomToast: React.FC<CustomToastProps> = (props) => {
  const { alerts, handleCleartAlerts } = React.useContext(CustomToastContext);

  const _renderAlertMessage = (alerts: CustomToastAlertType, index: number) => {
    const handleClickClearToast = () => {
      handleCleartAlerts(alerts);
    };

    if (!alerts.noTimeout) {
      setTimeout(handleClickClearToast, alerts.timeout || 1000 * 10);
    }

    let content = alerts.message;

    if (alerts.html) {
      content = alerts.html;
    }

    return (
      <Grid key={index} item xs={12}>
        <Alert
          variant='outlined'
          severity={alerts.code as AlertColor}
          sx={{ width: '100%', bgcolor: 'white', display: 'flex', alignItems: 'center', maxWidth: '35rem' }}
          onClose={handleClickClearToast}>
          {content}
        </Alert>
      </Grid>
    );
  };

  let uniqTosat = alerts;

  if (alerts.length > 0) {
    uniqTosat = _.uniq(uniqTosat, (item) => item.message);
  }

  uniqTosat = uniqTosat.slice(0, 3);

  return (
    <Snackbar open={uniqTosat.length > 0}>
      <Grid container spacing={2} sx={{ flexDirection: 'column' }}>
        {uniqTosat.map(_renderAlertMessage)}
      </Grid>
    </Snackbar>
  );
};

export default CustomToast;
