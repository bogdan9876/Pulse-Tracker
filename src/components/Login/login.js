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

  const handleLogin = async (values) => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('loggedInUser', values.email);
        navigate('/');
      } else {
        alert(data.error || 'An error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  return (
    <div className="login-container">
      <div className='login'>Login</div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        <Form className="input-container">
          <p className='text4'>Email</p>
          <Field className="login-input" type="text" name="email" placeholder="Your email" />
          <ErrorMessage name="email" component={ErrorValid} />
          <p className='text1'>Password</p>
          <Field className="login-input" type="password" name="password" placeholder="*********" />
          <ErrorMessage name="password" component={ErrorValid} />
          <button className="login-button" type="submit">Login</button>
        </Form>
      </Formik>
      <p className='login-text'>Not a member? <span onClick={() => navigate('/register')}>Register</span></p>
    </div>
  );
};

export default Login;