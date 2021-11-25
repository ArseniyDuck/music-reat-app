import React from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import withPopUp, { WrappedPopUpType } from '../../high-order-components/withPopUp/withPopUp';
import s from './PlaylistCreationPopUp.module.scss';


type PropsType = {
   actionAfterSubmit: (name: string) => void
};

type FormValues = { name: string };

const PlaylistCreationPopUp: React.FC<PropsType & WrappedPopUpType> = ({ close, ...props }) => {
   const initialValues: FormValues = { name: '' };

   const handleSubmit = (formData: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
      props.actionAfterSubmit(formData.name)
      setSubmitting(false);
      resetForm({});
      close();
   };

   return (
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
         {() => (
         <Form>
            <Field 
               autoFocus
               autoComplete='off'
               type='text'
               name='name'
               className={s.input}
               placeholder='Enter name:'
            />
            <div className='mobilePopUpCancelButtons'>
               <button type='submit' className='mobilePopUpButton'>Create</button>
               <button type='button' onClick={close} className='mobilePopUpButton'>Cancel</button>
            </div>
         </Form>
         )}
      </Formik>
   );
};


export default withPopUp(PlaylistCreationPopUp);