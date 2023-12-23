import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ArticlesList from '../components/ArticlesList/ArticlesList'
import { getArticles } from '../services/apiService'

function Homepage() {
  const dispatch = useDispatch()
  const page = useSelector((state) => state.articlesReducer.currentPage)

  useEffect(() => {
    dispatch(getArticles(page))
  }, [dispatch, page])
  return <ArticlesList />
}

export default Homepage
