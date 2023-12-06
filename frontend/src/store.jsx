// store.js
import { configureStore } from '@reduxjs/toolkit';
import slideReducer  from './slice';

const store = configureStore({
  reducer: { slider: slideReducer}
  // Add other middleware and options as needed
});

export default store;