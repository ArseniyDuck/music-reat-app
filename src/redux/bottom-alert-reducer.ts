import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type status = 'ok' | 'warning' | 'error';

type initialStateType = {
   message: string | null
   messageStatus: status
   isShown: boolean
};

const initialState: initialStateType = {
   message: null,
   messageStatus: 'ok',
   isShown: false
};

type AlertSettings = {
   message: string | null
   messageStatus: status
   isShown: boolean
};

export const alertMessage = createAsyncThunk<void, {message: string | null, messageStatus: status}>(
   'bottomAlert/alertMessage',
   async ({ message, messageStatus }, { dispatch }) => {
      dispatch(setAlertMessage({ message, messageStatus, isShown: true }));
      await new Promise(resolve => setTimeout(resolve, 2000));
      dispatch(setAlertMessage({ message: '', messageStatus: 'ok', isShown: false }));
   }
);

export const bottomAlertSile = createSlice({
   name: 'bottomAlert',
   initialState,
   reducers: {
      setAlertMessage(state, action: PayloadAction<AlertSettings>) {
         const { message, messageStatus, isShown } = action.payload
         state.message = message
         state.messageStatus = messageStatus
         state.isShown = isShown
      },
   },
});

export const { setAlertMessage } = bottomAlertSile.actions;
export default bottomAlertSile.reducer;