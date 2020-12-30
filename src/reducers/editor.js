import { ARTICLE_SUBMITTED } from '../constants/actionTypes';
import { createSlice } from '@reduxjs/toolkit';

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

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    editorpageloaded: (state, action) => {
      state.articleSlug = action.payload ? action.payload.article.slug : '';
      state.title = action.payload ? action.payload.article.title : '';
      state.description = action.payload ? action.payload.article.description : '';
      state.body = action.payload ? action.payload.article.body : '';
      state.tagInput = '';
      state.tagList = action.payload ? action.payload.article.tagList : [];
    },
    articlesubmitted: (state, action) => {
      state.inProgress = null;
      state.errors = action.error ? action.payload.errors : null;
    },
    asyncstart: (state, action) => {
      if (action.subtype === ARTICLE_SUBMITTED) {
        state.inProgress = true;
      }
    },
    addtag: (state, action) => {
      state.tagList = state.tagList.concat([state.tagInput]);
      state.tagInput = '';
    },
    removetag: (state, action) => {
      state.tagList = state.tagList.filter(tag => tag !== action.tag) || [];
    },
    updatefieldeditor: (state, action) => {
      state[action.key] = action.value || null;
    },
    unload: (state, action) => {}
  }
})

export const { editorpageloaded, articlesubmitted, asyncstart, addtag, removetag, updatefieldeditor, unload } = editorSlice.actions;

export default editorSlice.reducer;
