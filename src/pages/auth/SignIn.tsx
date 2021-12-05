import React from 'react';
import { Link } from 'react-router-dom';
import { Field, Form, Formik, FormikErrors, FormikHelpers } from 'formik';
import { signIn } from '../../redux/auth-reducer';
import { useAppDispatch } from '../../tools/hooks';
import a from './Auth.module.scss';

type PropsType = {};

const SignIn: React.FC<PropsType> = (props) => {
   return (
      <div className={a.wrapper}>
         <div className={a.body}>
            <h1 className={a.heading}>Sign In</h1>
            <SignInForm />
            <p className={a.linkText}>Don't have an account? <Link className={a.link} to='/sign-up'>Sign Up</Link></p>
         </div>
      </div>
   );
};

type FormValues = {
   username: string
   password: string
};

const SignInForm = () => {
   const dispatch = useAppDispatch();

   const initialValues: FormValues = {
      username: '',
      password: '',
   };

   const handleSubmit = (formData: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
      setSubmitting(false);
      resetForm({});
      dispatch(signIn(formData));
   };

   const validate = (values: FormValues) => {
      const errors: FormikErrors<FormValues> = {};
      if (!values.username) {
         errors.username = 'This field is required!';
      }

      if (!values.password) {
         errors.password = 'This field is required!';
      }

      return errors;
   };
   
   return (
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
         {({ errors, touched }) => (
         <Form className={a.form}>
            <div className={a.field}>
               <Field
                  autoComplete='off'
                  id='signIn__username'
                  type='text'
                  name='username'
                  className={a.input}
                  placeholder='Enter username:'
               />
               <label className={a.label} htmlFor='signIn__username'>Username</label>
               {errors.username && touched.username ? (
                  <div className={a.fieldError}>{errors.username}</div>
               ) : null}
            </div>
            <div className={a.field}>
               <Field
                  autoComplete='off'
                  id='signIn__password'
                  type='password'
                  name='password'
                  className={a.input}
                  placeholder='Enter password:'
               />
               <label className={a.label} htmlFor='signIn__password'>Password</label>
               {errors.password && touched.password ? (
                  <div className={a.fieldError}>{errors.password}</div>
               ) : null}
            </div>
            <button type='submit' className={a.submit}>Sign In</button>
         </Form>
         )}
      </Formik>
   );
}


export default SignIn;