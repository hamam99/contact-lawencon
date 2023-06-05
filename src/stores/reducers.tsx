// reducers.ts

import {combineReducers} from '@reduxjs/toolkit';
import {contactSlice} from './contactSlice';

export const rootReducer = combineReducers({
  contact: contactSlice,
});
