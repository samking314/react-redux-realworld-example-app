import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appName: 'Conduit',
  token: null,
  viewChangeCounter: 0,
};

const logincase = (state, action) => {
  state.redirectTo = action.error ? null : '/';
  state.token = action.error ? null : action.payload.user.token;
  state.currentUser = action.error ? null : action.payload.user;
}

const addviewchangecounter = (state, action) => {
  state.viewChangeCounter = state.viewChangeCounter + 1;
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    appload: (state, action) => {
      state.token = action.token || null;
      state.appLoaded = true;
      state.currentUser = action.payload ? action.payload.user : null;
    },
    redirect: (state, action) => {
      state.redirectTo = null;
    },
    logout: (state, action) => {
      state.redirectTo = '/';
      state.token = null;
      state.currentUser = null;
    },
    articlesubmitted: (state, action) => {
      const redirectUrl = `/article/${action.payload.article.slug}`;
      state.redirectTo = redirectUrl;
    },
    settingssaved: (state, action) => {
      state.redirectTo = action.error ? null : '/';
      state.currentUser = action.error ? null : action.payload.user;
    },
    login: logincase,
    register: logincase,
    deletearticle: (state, action) => {
      state.redirectTo = '/';
    },
    articlepageunloaded: addviewchangecounter,
    editorpageunloaded: addviewchangecounter,
    homepageunloaded: addviewchangecounter,
    profilepageunloaded: addviewchangecounter,
    profilefavoritespageunloaded: addviewchangecounter,
    settingspageunloaded: addviewchangecounter,
    loginpageunloaded: addviewchangecounter,
    registerpageunloaded: addviewchangecounter,
    asyncend: (state, action) => {},
    unload: (state, action) => {}
  }
})

export const {
  appload,
  redirect,
  logout,
  articlesubmitted,
  settingssaved,
  login,
  register,
  deletearticle,
  articlepageunloaded,
  editorpageunloaded,
  homepageunloaded,
  profilepageunloaded,
  profilefavoritespageunloaded,
  settingspageunloaded,
  loginpageunloaded,
  asyncend,
  registerpageunloaded,
} = commonSlice.actions;

export default commonSlice.reducer;



