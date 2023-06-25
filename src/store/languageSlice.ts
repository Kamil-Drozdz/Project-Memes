import { createSlice } from '@reduxjs/toolkit';

const SUPPORTED_LANGS = ['en', 'pl'];
const BROWSER_LANG = navigator.language.slice(0, 2);
const initialState = SUPPORTED_LANGS.includes(BROWSER_LANG) ? BROWSER_LANG : 'en';

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (_, action) => {
      return action.payload;
    }
  }
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
