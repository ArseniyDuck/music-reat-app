import React from 'react';
import { useAppDispatch } from 'hooks';
import { createPlaylist } from 'redux/playlists-reducer';
import s from './AsidePlaylistCreation.module.scss';
import { Field, Form, Formik, FormikHelpers } from 'formik';


type FormValues = { name: string };

type PropsType = {
   close: () => void
};

const AsidePlaylistCreation: React.FC<PropsType> = ({ close }) => {
   const dispatch = useAppDispatch();

   const initialValues: FormValues = {name: ''};

   const handleSubmit = (formData: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
      dispatch(createPlaylist(formData.name));
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
         </Form>
         )}
      </Formik>
   );
};

export default AsidePlaylistCreation;