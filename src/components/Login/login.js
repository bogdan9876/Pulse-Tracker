import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ErrorValid from '../ErrorValid/errorValid';
import './login.css';

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleLogin = (values) => {
    const registeredUser = localStorage.getItem('registeredUser');
    const registeredPassword = localStorage.getItem('registeredPassword');

    if (values.email === registeredUser && values.password === registeredPassword) {
      localStorage.setItem('loggedInUser', values.email);
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        <Form className="input-container">
          <Field className="login-input" type="text" name="email" placeholder="Email" />
          <ErrorMessage name="email" component={ErrorValid} />
          <Field className="login-input" type="password" name="password" placeholder="Password" />
          <ErrorMessage name="password" component={ErrorValid} />
          <button className="login-button" type="submit">Login</button>
        </Form>
      </Formik>
      <p className='login-text'>Not a member? <span onClick={() => navigate('/register')}>Register</span></p>
    </div>
  );
};

export default Login;