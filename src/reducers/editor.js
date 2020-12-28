import { ARTICLE_SUBMITTED } from '../constants/actionTypes';
import * as actions from './../actions';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  articleSlug: '',
  title: '',
  description: '',
  body: '',
  tagInput: '',
  tagList: [],
  inProgress: null,
  errors: [],
};

export default createReducer(initialState, builder => {
  builder
    .addCase(actions.editorpageloaded, (state, action) => {
      state.articleSlug = action.payload ? action.payload.article.slug : '';
      state.title = action.payload ? action.payload.article.title : '';
      state.description = action.payload ? action.payload.article.description : '';
      state.body = action.payload ? action.payload.article.body : '';
      state.tagInput = '';
      state.tagList = action.payload ? action.payload.article.tagList : [];
    })
    .addCase(actions.articlesubmitted, (state, action) => {
      state.inProgress = null;
      state.errors = action.error ? action.payload.errors : null;
    })
    .addCase(actions.asyncstart, (state, action) => {
      if (action.subtype === ARTICLE_SUBMITTED) {
        state.inProgress = true;
      }
    })
    .addCase(actions.addtag, (state, action) => {
      state.tagList = state.tagList.concat([state.tagInput]);
      state.tagInput = '';
    })
    .addCase(actions.removetag, (state, action) => {
      state.tagList = state.tagList.filter(tag => tag !== action.tag) || [];
    })
    .addCase(actions.updatefieldeditor, (state, action) => {
      state[action.key] = action.value || null;
    })
    .addDefaultCase((state, action) => {}) //handles EDITOR_PAGE_UNLOADED
});
