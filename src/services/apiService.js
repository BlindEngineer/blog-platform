import {
  setLoadingOn,
  setLoadingOff,
  setArticles,
  setArticlesCount,
  setSingleArticle,
  setError,
} from '../store/articlesSlice'

const baseUrl = 'https://blog.kata.academy/api/'

async function fetchResources(url, options) {
  const result = await fetch(url, options)
  if (!result.ok) {
    throw new Error(`Could not fetch ${url}. Received status ${result.status}`)
  }
  return result.json()
}

const getArticles = (page) => (dispatch) => {
  dispatch(setLoadingOn())
  fetchResources(`${baseUrl}articles?limit=5&offset=${5 * (page - 1)}`)
    .then((articles) => {
      dispatch(setArticles(articles))
      dispatch(setArticlesCount(articles))
      dispatch(setLoadingOff())
    })
    .catch((error) => {
      dispatch(setError(error.message))
    })
}

const getSingleArticle = (slug) => (dispatch) => {
  dispatch(setLoadingOn())
  fetchResources(`${baseUrl}articles/${slug}`)
    .then((result) => {
      dispatch(setSingleArticle(result.article))
      dispatch(setLoadingOff())
    })
    .catch((error) => {
      dispatch(setError(error.message))
    })
}

export { getArticles, fetchResources, getSingleArticle }
