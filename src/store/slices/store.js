import { configureStore } from '@reduxjs/toolkit';
import { rootslice } from './rootSlices';

export const store = configureStore({
  reducer: rootslice,
})