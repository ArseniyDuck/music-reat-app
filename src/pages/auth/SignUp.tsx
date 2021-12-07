import React from 'react';
import { Field, Form, Formik, FormikErrors, FormikHelpers } from 'formik';
import { Link } from 'react-router-dom';
import { signUp } from '../../redux/auth-reducer';
import { useAppDispatch, useAppSelector, useInputType } from '../../tools/hooks';
import a from './Auth.module.scss';
import { Eye, Error } from 'icons';

type PropsType = {};

const SignUp: React.FC<PropsType> = (props) => {
   return (
      <div className={a.wrapper}>
         <div className={a.body}>
            <h1 className={a.heading}>Registration</h1>
            <SignUpForm />
            <p className={a.linkText}>Already have an account? <Link className={a.link} to='/sign-in'>Sign in</Link></p>
         </div>
      </div>
   );
};

type FormValues = {
   username: string
   password1: string
   password2: string
};

const SignUpForm = () => {
   const dispatch = useAppDispatch();
   const serverErrors = useAppSelector(state => state.auth.signUpErrors);
   const [inputType, handleEyeClick] = useInputType();

   const initialValues: FormValues = {
      username: '',
      password1: '',
      password2: '',
   };

   const handleSubmit = (formData: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
      setSubmitting(false);
      resetForm({});
      dispatch(signUp(formData));
   };

   const validate = (values: FormValues) => {
      const errors: FormikErrors<FormValues> = {};
      if (!values.username) {
         errors.username = 'This field is required!';
      }

      if (!values.password1) {
         errors.password1 = 'This field is required!';
      }

      if (!values.password2) {
         errors.password2 = 'This field is required!';
      }

      if (values.password1 !== values.password2) {
         errors.password2 = 'Password mismatch!';
      }

      return errors;
   };
   
   return <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
         {({ errors, touched }) => (
         <Form className={a.form}>
            <div className={a.field}>
               <Field
                  autoComplete='off'
                  id='signUp__username'
                  type='text'
                  name='username'
                  className={a.input}
                  placeholder='Enter username:'
               />
               <label className={a.label} htmlFor='signUp__username'>Username</label>
               {errors.username && touched.username ? (
                  <div className={a.fieldError}>{errors.username}</div>
               ) : null}
            </div>
            <div className={a.field}>
               <Field
                  autoComplete='off'
                  id='signUp__password1'
                  type={inputType}
                  name='password1'
                  className={a.input}
                  placeholder='Enter password:'
               />
               <label className={a.label} htmlFor='signUp__password1'>Password</label>
               <span className={a.eye} onClick={handleEyeClick}><Eye size={20} fillColor='#fff' /></span>
               {errors.password1 && touched.password1 ? (
                  <div className={a.fieldError}>{errors.password1}</div>
               ) : null}
            </div>
            <div className={a.field}>
               <Field
                  autoComplete='off'
                  id='signUp__password2'
                  type={inputType}
                  name='password2'
                  className={a.input}
                  placeholder='Confirm password:'
               />
               <label className={a.label} htmlFor='signUp__password2'>Password confirmation</label>
               {errors.password2 && touched.password2 ? (
                  <div className={a.fieldError}>{errors.password2}</div>
               ) : null}
            </div>
            {!!serverErrors.length && <ul className={a.serverErrors}>
               {serverErrors.map((err, index) => (
                  <li key={index} className={a.serverError}><Error size={15} fillColor='#ff0000' />{err}</li>
               ))}
            </ul>}
            <button type='submit' className={a.submit}>Registrate</button>
         </Form>
         )}
      </Formik>
   </>;
}

export default SignUp;