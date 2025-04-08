import React, { useEffect, useState } from 'react';
import { Typography, TextField, Button, Container, Grid, Paper, FormControlLabel, Checkbox } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Supplier } from '../../types/supplier.types';
import {  getUsers} from '../../services/user.service';
import { NavLink, useNavigate } from 'react-router-dom';
import { isValidID, isValidEmail, isValidPhoneNumber, isValidPassword } from '../../api/user/userApi';
import { useAppDispatch } from '../../redux/store';
interface FormData {
  id: string;
  name: string;
  company: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const SignIn: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [showPassword, setShowPassword] = useState(false);
  const [valid, setValid] = useState(true);
  const [validId, setValidId] = useState(true);
  const [validPhone, setValidPhone] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [isUserExist, setIsUserExist] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (!valid) {
      console.log('validation issues');
    }
  }, [valid]);

  useEffect(() => {
    if (isUserExist) {
      console.log('user is exist');
    }
  }, [isUserExist]);

  const CheckValidation = (params: FormData) => {
    const id = isValidID(params.id);
    setValidId(id);
    const phone = isValidPhoneNumber(params.phone);
    setValidPhone(phone);
    const password = isValidPassword(params.password, params.confirmPassword);
    setValidPassword(password);
    const isValid = id && phone && password;
    setValid(isValid);
    return isValid;
  };

  const CheckIsExist = async (params: FormData): Promise<boolean> => {
    try {
      const users = await getUsers();
      const userExists = users.some((user: Supplier) => user.supplierId === params.id);
      setIsUserExist(userExists);
      return userExists;
    } catch (error) {
      console.error('Error checking if user exists', error);
      return false;
    }
  };

  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
    const newU = {
      supplierId: data.id,
      supplierName: data.name,
      company: data.company,
      phone: data.phone,
      password: data.password,
      role: "user",
      products: []
    };

    if (await CheckValidation(data)) {
      const userExists = await CheckIsExist(data);
      if (!userExists) {
        try {
          navigate("/supplier/products", { state: newU });
        } catch (error) {
          console.log('cant add the user: ' + error);
        }
      };
    };
  };

  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: 20 }}>
        <Typography variant="h5" align="center" color={'#DBA979'} gutterBottom>
          הרשמה
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Id"
                variant="outlined"
                fullWidth
                required
                {...register("id")}
              />
              {!validId && (
                <Typography variant="body2" color="error">
                  ת"ז חייבת להכיל 9 ספרות
                </Typography>

              )}
              {isUserExist && (
                <Typography variant="body2" color="error">
                  משתמש כבר קיים
                </Typography>
              )}

            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                required
                {...register("name")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Company"
                variant="outlined"
                fullWidth
                required
                {...register("company")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone"
                variant="outlined"
                fullWidth
                required
                {...register("phone")}
              />
              {!validPhone && (
                <Typography variant="body2" color="error">
                  פלאפון לא תקין
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                required
                {...register("password")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                required
                {...register("confirmPassword")}
              />
              {!validPassword && (
                <Typography variant="body2" color="error">
                  הסיסמאות אינן תואמות
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={showPassword} onChange={() => setShowPassword(!showPassword)} name="showPassword" />}
                label="Show Password"
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth >
                שלח
              </Button>
            </Grid>
          </Grid>
        </form>
        <div style={{ textAlign: 'center' }}>
          <Typography component={NavLink} to="/login" color="primary" style={{ textAlign: 'center', color: '#DBA979' }}>
            רשומים כבר? להתחברות
          </Typography>
        </div>
      </Paper>
    </Container>
  );
};

export default SignIn;
