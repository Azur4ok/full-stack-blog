import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { fetchAuth } from './../../redux/thunks/index';
import styles from './Login.module.scss';
import { selectIsAuth } from './../../redux/slices/auth';

export const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  if (isAuth) {
    return <Navigate to="/" />;
  }

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));
    console.log(data);
    if (!data.payload) {
      return alert('invalid email or password')
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    } 
  };

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type="email"
          label="E-Mail"
          className={styles.field}
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'enter an email' })}
          fullWidth
        />
        <TextField
          type="password"
          className={styles.field}
          {...register('password', { required: 'enter a password' })}
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          label="password"
          fullWidth
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          sign in
        </Button>
      </form>
    </Paper>
  );
};
