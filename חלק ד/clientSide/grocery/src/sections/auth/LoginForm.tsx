import React, { useState } from 'react';
import {Typography, TextField, Button, Container, Grid,Paper, IconButton, InputAdornment} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { login } from '../../services/user.service';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { setUser } from '../../redux/auth/auth.slice';
import { setSession } from '../../auth/auth.utils';
import { PATHS } from '../../routes/paths';

interface FormData {
  id: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const authUser = await login(data.id, data.password);
      if (authUser) {
        dispatch(setUser(authUser.user));
        setSession(authUser);
        if(authUser.role==='user')
        {
          navigate(PATHS.suppliersOrders);
        }
        else
        {
          navigate(PATHS.managerOrders);
        }
      }
    } catch (err) {
      console.log('Login error:', err);
      setError('ת"ז או סיסמה שגויים');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: 20 }}>
        <Typography variant="h4" align="center" color={'#DBA979'} gutterBottom>
          התחברות
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="תעודת זהות"
                variant="outlined"
                fullWidth
                {...register("id", { required: "שדה חובה" })}
                error={!!errors.id}
                helperText={errors.id?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="סיסמה"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                {...register("password", { required: "שדה חובה" })}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            {error && (
              <Grid item xs={12}>
                <Typography variant="body2" color="error" align="center">
                  {error}
                </Typography>
              </Grid>
            )}

            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: '#AFD198' }}>
                התחבר
              </Button>
            </Grid>
          </Grid>
        </form>

        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <Typography component={NavLink} to="/signin" style={{ color: '#DBA979', textDecoration: 'none' }}>
            עדיין לא רשומים? הרשמה
          </Typography>
          <br />
        </div>
      </Paper>
    </Container>
  );
};

export default Login;
