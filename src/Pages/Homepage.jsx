import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ArticlesList from '../components/ArticlesList/ArticlesList'
import { getArticles } from '../services/apiService'
import { setChangeOff } from '../store/userSlice'

function Homepage() {
  const dispatch = useDispatch()
  const page = useSelector((state) => state.articlesReducer.currentPage)
  const token = useSelector((state) => state.userReducer.token)

  useEffect(() => {
    dispatch(setChangeOff())
    dispatch(getArticles(page, token))
  }, [dispatch, page, token])
  return <ArticlesList />
}

export default Homepage
