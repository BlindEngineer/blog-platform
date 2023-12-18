import { createSlice } from '@reduxjs/toolkit'

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    loading: false,
    error: false,
    authorisation: false,
    articles: [],
    singleArticle: {},
    currentPage: 1,
  },
  reducers: {
    setArticles(state, action) {
      return { ...state, articles: action.payload.articles }
    },
    setArticlesCount(state, action) {
      return { ...state, articlesCount: action.payload.articlesCount }
    },
    setCurrentPage(state, action) {
      return { ...state, currentPage: action.payload }
    },
    setSingleArticle(state, action) {
      return { ...state, singleArticle: action.payload }
    },
    setLoadingOn(state) {
      return { ...state, loading: true, error: false }
    },
    setLoadingOff(state) {
      return { ...state, loading: false, error: false }
    },
    setError(state, action) {
      return { ...state, loading: false, error: action.payload }
    },
  },
})

export const {
  setArticles,
  setArticlesCount,
  setCurrentPage,
  setSingleArticle,
  setLoadingOn,
  setLoadingOff,
  setError,
} = articlesSlice.actions
export default articlesSlice.reducer
