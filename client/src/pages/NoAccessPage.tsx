/** @format */

import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface NoAccessPageProps {}

const NoAccessPage: React.FunctionComponent<NoAccessPageProps> = () => {
  const navigate = useNavigate();

  return (
    <Grid container flexDirection='column' gap={5} justifyContent='center' alignItems='center' mt={5}>
      <Typography variant='h3' color='primary'>
        403
      </Typography>
      <Typography variant='h3' color='primary'>
        Access Denied
      </Typography>
      <Typography variant='fontReg16' color='primary' textAlign='center' lineHeight='unset'>
        The Page you're trying to access has restricted access.
        <br />
        Please refer to your system administrator
      </Typography>

      <Button size='large' variant='contained' color='primary' onClick={() => navigate('/organizations')}>
        Go Back
      </Button>
    </Grid>
  );
};

export default NoAccessPage;
