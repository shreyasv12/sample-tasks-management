/** @format */

import * as React from 'react';
import * as _ from 'underscore';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { CustomToastContext } from '../../context/CustomToast';

import { validateJoiObjectSchema } from '../../validations';
import { loginCredsSchema } from '../../validations/login';
import { submitLoginCreds } from '../../services/login';
import { UserSessionContext } from '../../context/UserSession';
import { CircularProgress, useTheme } from '@mui/material';

interface LoginProps {}

const Login: React.FunctionComponent<LoginProps> = () => {
  const navigate = useNavigate();
  const appTheme = useTheme();

  const [username, setUsername] = React.useState<string | undefined>(undefined);
  const [password, setPassword] = React.useState<string | undefined>(undefined);
  const [isPasswordVisible, setIsPasswordVisible] = React.useState<boolean>(false);

  const [errors, setErrors] = React.useState<{ username?: string; password?: string }>({});

  const { handleAddAlerts } = React.useContext(CustomToastContext);
  const { handleUpdateUserSession } = React.useContext(UserSessionContext);

  const loginMutate = useMutation({
    mutationFn: async ({ username, password }: { username: string; password: string }) => {
      const res = await submitLoginCreds(username, password);
      handleUpdateUserSession(res);
      navigate('/login-success');
      return res;
    },
    onError: (error: any) => {
      console.log('.....error', error);
      const message = error?.response?.data?.errorMessage || 'Something went wrong. Please try again later';
      handleAddAlerts({ message, code: 'error', id: new Date().getTime() });
    },
  });

  const handleSubmit = async (event: any) => {
    event.stopPropagation();
    const errors = validateJoiObjectSchema(loginCredsSchema, { username, password }, { abortEarly: false });
    if (!_.isEmpty(errors)) {
      setErrors(errors);
      return;
    }
    setErrors({});

    await loginMutate.mutateAsync({ username: username!, password: password! });
  };

  return (
    <Container maxWidth='sm' sx={{ pt: '20vh' }}>
      <Paper elevation={10}>
        <form onSubmit={handleSubmit}>
          <Grid item xs={9} container alignItems='center' gap={5} sx={{ mx: 'auto', p: 5 }}>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Typography variant='h4' color={appTheme.palette.primary.main}>
                Login
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                placeholder='Please enter username'
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                error={!_.isEmpty(errors.username)}
                helperText={errors.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                placeholder='Please enter username'
                value={password}
                type={isPasswordVisible ? 'text' : 'password'}
                onChange={(event) => setPassword(event.target.value)}
                error={!_.isEmpty(errors.password)}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => setIsPasswordVisible((prev) => !prev)}>
                      {isPasswordVisible && <VisibilityIcon />}
                      {!isPasswordVisible && <VisibilityOffIcon />}
                    </IconButton>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Button type='submit' variant='contained'>
                {loginMutate.isPending && <CircularProgress sx={{ mr: 2 }} />}
                {loginMutate.isPending ? 'Submitting...' : 'Submit'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
