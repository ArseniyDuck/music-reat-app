import React from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import withPopUp, { WrappedPopUpType } from '../../../high-order-components/withPopUp/withPopUp';
import { addSongToNewCreatedPlaylist } from '../../../redux/songs-reducer';
import { useAppDispatch } from '../../../tools/hooks';
import s from './SongCreation.module.scss';


type PropsType = {
   songId: number
};

type FormValues = { name: string };

const SongCreation: React.FC<PropsType & WrappedPopUpType> = ({ close, ...props }) => {
   const dispatch = useAppDispatch();

   const initialValues: FormValues = { name: '' };

   const handleSubmit = (formData: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
      console.log(formData.name)
      dispatch(addSongToNewCreatedPlaylist({ songId: props.songId, playlistName: formData.name }));
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


export default withPopUp(SongCreation);