import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import languageReducer from './languageSlice';
import subscriptionReducer from './subscriptionSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    language: languageReducer,
    subscription: subscriptionReducer
  }
});
