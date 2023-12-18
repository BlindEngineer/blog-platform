import { NavLink, useParams } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { format, parseISO } from 'date-fns'

import noFoto from '../../assets/img/foto.png'
import FullText from '../FullText/FullText'

import classes from './ArticlePreview.module.scss'

function ArticlePreview({ article }) {
  const { slug: slugParam } = useParams()
  const { slug, title, description, createdAt, tagList, favorited, favoritesCount, author, body } = article
  const { username, image: userAvatar } = author
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
    name,
    postDate,
    avatar,
    nameAndDate,
  } = classes
  const previewTags = tagList.map((myTag) => {
    return (
      <li key={nanoid()} className={tag}>
        {myTag}
      </li>
    )
  })
  const heartStyle = favorited ? likeIcon : noLikeIcon
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
          <div className={nameAndDate}>
            <span className={name}>{username}</span>
            <span className={postDate}> {format(parseISO(createdAt), 'MMMM d, y')} </span>
          </div>
          <img alt="Avatar" className={avatar} src={userAvatar || noFoto} />
        </div>
      </div>
      {slugParam ? <FullText text={body} /> : null}
    </div>
  )
}

export default ArticlePreview
