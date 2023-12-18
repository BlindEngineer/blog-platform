import { nanoid } from 'nanoid'
import { useSelector, useDispatch } from 'react-redux'

import ArticlePreview from '../ArticlePreview/ArticlePreview'
import Paginator from '../Paginator/Paginator'
import { setCurrentPage } from '../../store/articlesSlice'
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator'
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator'

import classes from './ArticlesList.module.scss'

const { listContainer } = classes

function ArticlesList() {
  const articles = useSelector((state) => state.articles)
  const articlesCount = useSelector((state) => state.articlesCount)
  const currentPage = useSelector((state) => state.currentPage)
  const loading = useSelector((state) => state.loading)
  const error = useSelector((state) => state.error)
  const dispatch = useDispatch()
  const onPageChange = (page) => {
    dispatch(setCurrentPage(page))
  }
  const elements = articles.map((article) => {
    return <ArticlePreview key={nanoid()} article={article} />
  })
  return (
    <>
      {loading ? <LoadingIndicator /> : null}
      {error ? <ErrorIndicator message={error} /> : null}
      {!loading ? (
        <>
          <div className={listContainer}>{elements}</div>
          <Paginator currentPage={currentPage} onChange={onPageChange} totalPages={Math.ceil(articlesCount / 5)} />
        </>
      ) : null}
    </>
  )
}

export default ArticlesList
