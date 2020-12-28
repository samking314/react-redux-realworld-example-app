import * as actions from './../actions';
import { createReducer } from '@reduxjs/toolkit';

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

export default createReducer(initialState, builder => {
  builder
    .addCase(actions.appload, (state, action) => {
      state.token = action.token || null;
      state.appLoaded = true;
      state.currentUser = action.payload ? action.payload.user : null;
    })
    .addCase(actions.redirect, (state, action) => {
      state.redirectTo = null;
    })
    .addCase(actions.logout, (state, action) => {
      state.redirectTo = '/';
      state.token = null;
      state.currentUser = null;
    })
    .addCase(actions.articlesubmitted, (state, action) => {
      const redirectUrl = `/article/${action.payload.article.slug}`;
      state.redirectTo = redirectUrl;
    })
    .addCase(actions.settingssaved, (state, action) => {
      state.redirectTo = action.error ? null : '/';
      state.currentUser = action.error ? null : action.payload.user;
    })
    .addCase(actions.login, logincase)
    .addCase(actions.register, logincase)
    .addCase(actions.deletearticle, (state, action) => {
      state.redirectTo = '/';
    })
    .addCase(actions.articlepageunloaded, addviewchangecounter)
    .addCase(actions.editorpageunloaded, addviewchangecounter)
    .addCase(actions.homepageunloaded, addviewchangecounter)
    .addCase(actions.profilepageunloaded, addviewchangecounter)
    .addCase(actions.profilefavoritespageunloaded, addviewchangecounter)
    .addCase(actions.settingspageunloaded, addviewchangecounter)
    .addCase(actions.loginpageunloaded, addviewchangecounter)
    .addCase(actions.registerpageunloaded, addviewchangecounter)
    .addDefaultCase((state, action) => {})
});
