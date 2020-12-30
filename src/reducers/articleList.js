import { createSlice } from '@reduxjs/toolkit';

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

const articleListSlice = createSlice({
  name: 'articlelist',
  initialState,
  reducers: {
    articlefavorited: favoritecase,
    articleunfavorited: favoritecase,
    setpage: (state, action) => {
      state.articles = action.payload.articles;
      state.articlesCount = action.payload.articlesCount;
      state.currentPage = action.page;
    },
    applytagfilter: (state, action) => {
      state.pager = action.pager;
      state.articles = action.payload.articles;
      state.articlesCount = action.payload.articlesCount;
      state.tab = null;
      state.tag = action.tag;
      state.currentPage = 0;
    },
    homepageloaded: (state, action) => {
      state.pager = action.pager;
      state.tags = action.payload[0].tags;
      state.articles = action.payload[1].articles;
      state.articlesCount = action.payload[1].articlesCount;
      state.currentPage = 0;
      state.tab = action.tab;
    },
    homepageunloaded: (state, action) => {
      state.pager = initialState.pager;
      state.tags = initialState.tags;
      state.articles = initialState.articles;
      state.articlesCount = initialState.articlesCount;
      state.currentPage = initialState.currentPage;
      state.tab = initialState.tab;
    },
    changetab: (state, action) => {
      state.pager = action.pager;
      state.articles = action.payload.articles;
      state.articlesCount = action.payload.articlesCount;
      state.tab = action.tab;
      state.currentPage = 0;
      state.tag = null;
    },
    profilepageloaded: pageloadedcase,
    profilefavoritespageloaded: pageloadedcase,
    unload: (state, action) => {}
  }
})

export const {
  articlefavorited,
  articleunfavorited,
  setpage,
  applytagfilter,
  homepageloaded,
  homepageunloaded,
  changetab,
  profilepageloaded,
  profilefavoritespageloaded,
  unload,
} = articleListSlice.actions;

export default articleListSlice.reducer;



