import React from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import s from './Form.module.scss';


type FormValues = { name: string };

type PropsType = {
   hideMe: () => void
   createPlaylist: (name: string) => void
};

const PlaylistCreationForm: React.FC<PropsType> = ({ createPlaylist, hideMe }) => {
   const initialValues: FormValues = { name: '' };

   const handleSubmit = (formData: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
      createPlaylist(formData.name);
      setSubmitting(false);
      resetForm({});
      hideMe();
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
         </Form>
         )}
      </Formik>
   );
};

export default PlaylistCreationForm;