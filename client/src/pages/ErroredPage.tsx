/** @format */

import React from 'react';
import { useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import WarningAmberIcon from '@mui/icons-material/WarningAmber';

interface ErroredProps {}

const ErroredPage: React.FunctionComponent<ErroredProps> = () => {
  const navigate = useNavigate();

  return (
    <Grid container flexDirection='column' gap={5} justifyContent='center' alignItems='center' mt={5}>
      <Typography variant='h1' color='primary'>
        <WarningAmberIcon color='error' fontSize='inherit' />
      </Typography>
      <Typography variant='h3' color='primary'>
        Unexcepted Error
      </Typography>
      <Typography variant='fontReg16' color='primary' textAlign='center' lineHeight='unset'>
        Sorry, Something went wrong
        <br />
        Please try again after sometime
      </Typography>

      <Button size='large' variant='contained' color='primary' onClick={() => navigate('/')}>
        Go Back
      </Button>
    </Grid>
  );
};

export default ErroredPage;
