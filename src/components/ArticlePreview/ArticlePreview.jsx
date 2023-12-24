import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { format, parseISO } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import { Popconfirm } from 'antd'

import noFoto from '../../assets/img/foto.png'
import FullText from '../FullText/FullText'
import { deleteArticle } from '../../services/apiService'
import { clearSingleArticle } from '../../store/articlesSlice'

import classes from './ArticlePreview.module.scss'

function ArticlePreview({ article }) {
  const { slug: slugParam } = useParams()
  const { slug, title, description, createdAt, tagList, favorited, favoritesCount, author, body } = article
  const { username, image: userAvatar } = author
  const { token, userName } = useSelector((state) => state.userReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    container,
    headContainer,
    articleSide,
    titleAndLikes,
    previewTitle,
    likeIcon,
    noLikeIcon,
    counter,
    tags,
    tag,
    text,
    textForSinglePage,
    personSide,
    person,
    name,
    postDate,
    avatar,
    nameAndDate,
    controlButtons,
    button,
    red,
    green,
  } = classes
  const previewTags = tagList.map((myTag) => {
    return (
      <li key={nanoid()} className={tag}>
        {myTag}
      </li>
    )
  })
  const heartStyle = favorited ? likeIcon : noLikeIcon
  // const confirm = (e) => {
  //   console.log(e)
  //   message.success('Click on Yes')
  // }
  // const cancel = (e) => {
  //   console.log(e)
  //   message.error('Click on No')
  // }

  const handleDelete = async () => {
    navigate('/', { replace: true })
    await dispatch(deleteArticle(slug, token))
    dispatch(clearSingleArticle())
  }
  return (
    <div className={container}>
      <div className={headContainer}>
        <div className={articleSide}>
          <div className={titleAndLikes}>
            <NavLink className={previewTitle} to={`/articles/${slug}`}>
              {title}
            </NavLink>
            <div className={heartStyle} />
            <span className={counter}>{favoritesCount}</span>
          </div>
          <ul className={tags}>{previewTags}</ul>
          <p className={slugParam ? textForSinglePage : text}>{description}</p>
        </div>
        <div className={personSide}>
          <div className={person}>
            <div className={nameAndDate}>
              <span className={name}>{username}</span>
              <span className={postDate}> {format(parseISO(createdAt), 'MMMM d, y')} </span>
            </div>
            <img alt="Avatar" className={avatar} src={userAvatar || noFoto} />
          </div>
          {token && slugParam && username === userName ? (
            <div className={controlButtons}>
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                okText="Yes"
                cancelText="No"
                onConfirm={handleDelete}
                placement="right"
              >
                <button className={`${button} ${red}`} type="button">
                  Delete
                </button>
              </Popconfirm>
              <Link to={`/articles/${slug}/edit`} className={`${button} ${green}`}>
                Edit
              </Link>
            </div>
          ) : null}
        </div>
      </div>
      {slugParam ? <FullText text={body} /> : null}
    </div>
  )
}

export default ArticlePreview
