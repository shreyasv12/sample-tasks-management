/** @format */

import React from 'react';

import { useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface Page404Props {}

const Page404: React.FunctionComponent<Page404Props> = () => {
  const navigate = useNavigate();

  return (
    <Grid container flexDirection='column' gap={5} justifyContent='center' alignItems='center' mt={5}>
      <Typography variant='h1' color='primary'>
        404
      </Typography>
      <Typography variant='h3' color='primary'>
        Page Not Found
      </Typography>
      <Typography variant='fontReg16' color='primary' textAlign='center' lineHeight='unset'>
        The Page you're trying to access has does not exist or was removed
        <br />
        Please navigate back to home page
      </Typography>

      <Button size='large' variant='contained' color='primary' onClick={() => navigate('/')}>
        Go Back
      </Button>
    </Grid>
  );
};

export default Page404;
