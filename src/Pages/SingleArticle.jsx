import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

import ArticlePreview from '../components/ArticlePreview/ArticlePreview'
import { getSingleArticle } from '../services/apiService'
import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator'
import ErrorIndicator from '../components/ErrorIndicator/ErrorIndicator'

function SingleArticle() {
  const { slug } = useParams()
  const article = useSelector((state) => state.singleArticle)
  const loading = useSelector((state) => state.loading)
  const error = useSelector((state) => state.error)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSingleArticle(slug))
  }, [dispatch, slug])

  return (
    <>
      <div />
      {error ? <ErrorIndicator message={error} /> : null}
      {loading ? <LoadingIndicator /> : null}
      {Object.keys(article).length && !loading ? <ArticlePreview article={article} /> : null}
    </>
  )
}

export default SingleArticle
