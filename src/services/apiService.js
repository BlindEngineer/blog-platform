import {
  clearSingleArticle,
  setArticles,
  setArticlesCount,
  setError,
  setLoadingOff,
  setLoadingOn,
  setSingleArticle,
} from '../store/articlesSlice'
import { setChangeOn, setUserError, setUserInformation, setUserLoadingOff, setUserLoadingOn } from '../store/userSlice'

const baseUrl = 'https://blog.kata.academy/api/'

async function fetchResources(url, options) {
  const result = await fetch(url, options)
  if (!result.ok) {
    if (result.status === 404) {
      throw new Error(
        `Received status ${result.status}.
        Невозможно получить доступ к ресурсу по адресу ${url}. 
        Проверьте правильность запроса. Удачи! `
      )
    } else if (result.status === 422) {
      throw new Error(
        `Received status ${result.status}.
        Данные, введенные в одном или нескольких полях, не соответствуют условиям. 
        Проверьте правильность передаваемых данных. Удачи! `
      )
    }
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

const createArticle = (data, token, slug) => (dispatch) => {
  dispatch(setLoadingOn())
  fetchResources(`${baseUrl}articles${slug ? `/${slug}` : ''}`, {
    method: `${slug ? 'PUT' : 'POST'}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((result) => {
      dispatch(setSingleArticle(result.article))
      dispatch(setLoadingOff())
    })
    .catch((error) => {
      dispatch(setError(error.message))
    })
}

const deleteArticle = (slug, token) => (dispatch) => {
  dispatch(setLoadingOn())
  fetchResources(`${baseUrl}articles/${slug}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(() => {
      dispatch(clearSingleArticle())
      dispatch(setLoadingOff())
    })
    .catch((error) => {
      dispatch(setError(error.message))
    })
}

const postNewUser = (newUser) => (dispatch) => {
  fetchResources(`${baseUrl}users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  }).then((response) => {
    dispatch(setUserInformation(response))
    localStorage.setItem('currentUser', JSON.stringify(response))
  })
}

const logInUser = (data) => (dispatch) => {
  dispatch(setUserLoadingOn())
  fetchResources(`${baseUrl}users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      dispatch(setUserInformation(response))
      localStorage.setItem('currentUser', JSON.stringify(response))
      dispatch(setUserLoadingOff())
    })
    .catch((error) => {
      dispatch(setUserError(error.message))
    })
}

const updateUser = (data, token) => (dispatch) => {
  dispatch(setUserLoadingOn())
  fetchResources(`${baseUrl}user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      dispatch(setUserInformation(response))
      localStorage.setItem('currentUser', JSON.stringify(response))
      dispatch(setUserLoadingOff())
      dispatch(setChangeOn())
    })
    .catch((error) => {
      dispatch(setUserError(error.message))
    })
}

export {
  getArticles,
  fetchResources,
  createArticle,
  getSingleArticle,
  postNewUser,
  logInUser,
  updateUser,
  deleteArticle,
}
