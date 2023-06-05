import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Contact} from '../services/types';

const initialState = {
  detailContact: {
    age: null,
    firstName: null,
    lastName: null,
    id: null,
    photo: null,
  },
};

const contactSlide = createSlice({
  name: 'detail_photo',
  initialState,
  reducers: {
    setDetail(state, action: PayloadAction<Contact>) {
      state.detailContact = action.payload;
    },
  },
});

export const {setDetail} = contactSlide.actions;
export const contactSlice = contactSlide.reducer;
