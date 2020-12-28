import {
  ARTICLE_FAVORITED,
  ARTICLE_UNFAVORITED,
  SET_PAGE,
  APPLY_TAG_FILTER,
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  CHANGE_TAB,
  PROFILE_PAGE_LOADED,
  PROFILE_FAVORITES_PAGE_LOADED,
} from '../constants/actionTypes';

import { createAction, createReducer } from '@reduxjs/toolkit';

const favorite = createAction(ARTICLE_FAVORITED);
const unfavorite = createAction(ARTICLE_UNFAVORITED);

const setpage = createAction(SET_PAGE);
const applytagfilter = createAction(APPLY_TAG_FILTER);

const loadhomepage = createAction(HOME_PAGE_LOADED);
const unloadhomepage = createAction(HOME_PAGE_UNLOADED);

const changetab = createAction(CHANGE_TAB);

const profilepageloaded = createAction(PROFILE_PAGE_LOADED);
const profilefavoritespageloaded = createAction(PROFILE_FAVORITES_PAGE_LOADED);

const initialState = {
  pager: null,
  articles: [],
  tags: [],
  articlesCount: 0,
  currentPage: 0,
  tab: null,
};

const favoritecase = (state, action) => {
  state.articles = state.articles.map(article => {
    if (action.payload && article.slug === action.payload.article.slug) {
      return {
        ...article,
        favorited: action.payload.article.favorited,
        favoritesCount: action.payload.article.favoritesCount
      };
    }
    return article;
  });
}

const pageloadedcase = (state, action) => {
  state.pager = action.pager;
  state.articles = action.payload[1].articles;
  state.articlesCount = action.payload[1].articlesCount;
  state.currentPage = 0;
}

export default createReducer(initialState, builder => {
  builder
    .addCase(favorite, favoritecase)
    .addCase(unfavorite, favoritecase)
    .addCase(setpage, (state, action) => {
      state.articles = action.payload.articles;
      state.articlesCount = action.payload.articlesCount;
      state.currentPage = action.page;
    })
    .addCase(applytagfilter, (state, action) => {
      state.pager = action.pager;
      state.articles = action.payload.articles;
      state.articlesCount = action.payload.articlesCount;
      state.tab = null;
      state.tag = action.tag;
      state.currentPage = 0;
    })
    .addCase(loadhomepage, (state, action) => {
      state.pager = action.pager;
      state.tags = action.payload[0].tags;
      state.articles = action.payload[1].articles;
      state.articlesCount = action.payload[1].articlesCount;
      state.currentPage = 0;
      state.tab = action.tab;
    })
    .addCase(unloadhomepage, (state, action) => {
      state.pager = initialState.pager;
      state.tags = initialState.tags;
      state.articles = initialState.articles;
      state.articlesCount = initialState.articlesCount;
      state.currentPage = initialState.currentPage;
      state.tab = initialState.tab;
    })
    .addCase(changetab, (state, action) => {
      state.pager = action.pager;
      state.articles = action.payload.articles;
      state.articlesCount = action.payload.articlesCount;
      state.tab = action.tab;
      state.currentPage = 0;
      state.tag = null;
    })
    .addCase(profilepageloaded, pageloadedcase)
    .addCase(profilefavoritespageloaded, pageloadedcase)
    .addDefaultCase((state, action) => {}) //handles PROFILE_PAGE_UNLOADED and PROFILE_FAVORITES_PAGE_UNLOADED
})
