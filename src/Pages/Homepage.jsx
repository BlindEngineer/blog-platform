import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ArticlesList from '../components/ArticlesList/ArticlesList'
import { getArticles } from '../services/apiService'
import { setChangeOff } from '../store/userSlice'

function Homepage() {
  const dispatch = useDispatch()
  const page = useSelector((state) => state.articlesReducer.currentPage)

  useEffect(() => {
    dispatch(setChangeOff())
    dispatch(getArticles(page))
  }, [dispatch, page])
  return <ArticlesList />
}

export default Homepage
