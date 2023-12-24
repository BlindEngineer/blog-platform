/* eslint-disable react/jsx-props-no-spreading */
import { useParams, useNavigate } from 'react-router-dom'
import { useFieldArray, useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { nanoid } from 'nanoid'

import { createArticle } from '../../services/apiService'
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator'

import classes from './CreateAndEditArticle.module.scss'

function CreateAndEditArticle() {
  const {
    container,
    header,
    form,
    list,
    listElem,
    textLabel,
    textInput,
    textArea,
    errorTextInput,
    inputError,
    submit,
    tagBlock,
    tagList,
    tagElem,
    tagButton,
    del,
    add,
    tagInput,
  } = classes
  const { slug: editMode } = useParams()
  const { singleArticle, error } = useSelector((state) => state.articlesReducer)
  const { token } = useSelector((state) => state.userReducer)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tagList: editMode ? singleArticle.tagList : [],
      title: editMode ? singleArticle.title : '',
      description: editMode ? singleArticle.description : '',
      body: editMode ? singleArticle.body : '',
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  })

  const regTitle = register('title', {
    required: true,
    maxLength: 200,
    validate: (value) => value.toString().trim() !== '',
  })

  const regDescription = register('description', {
    required: true,
    validate: (value) => value.toString().trim() !== '',
  })

  const regBody = register('body', {
    required: true,
  })

  const onSubmit = async (data) => {
    console.log(data)
    const articleInfo = {
      article: {
        title: data.title,
        description: data.description,
        body: data.body,
        tagList: data.tagList || [],
      },
    }
    await dispatch(createArticle(articleInfo, token, editMode))
    console.log(data)
    if (!error) navigate('/', { replace: true })
  }

  console.log(fields)
  return (
    <div className={container}>
      {error ? <ErrorIndicator message={error} /> : null}
      <h2 className={header}>{editMode ? 'Edit article' : 'Create new article'}</h2>
      <form className={form} onSubmit={handleSubmit(onSubmit)}>
        <ul className={list}>
          <li className={listElem}>
            <label htmlFor="title" className={textLabel}>
              Title
              <br />
              <input
                id="title"
                name="title"
                type="text"
                {...regTitle}
                placeholder="Title"
                className={`${textInput} ${errors.title && errorTextInput}`}
              />
              {errors.title && (
                <div className={inputError}>
                  {errors.title.type === 'required' && 'Поле обязательно для заполнения.'}
                  {errors.title.type === 'maxLength' && 'Слишком длинный заголовок.'}
                  {errors.title.type === 'validate' && 'Заголовок не должен состоять только из пробельных символов'}
                </div>
              )}
            </label>
          </li>
          <li className={listElem}>
            <label htmlFor="description" className={textLabel}>
              Short description
              <br />
              <input
                id="description"
                name="description"
                type="text"
                {...regDescription}
                placeholder="Short description"
                className={`${textInput} ${errors.description && errorTextInput}`}
              />
              {errors.description && (
                <div className={inputError}>
                  {errors.description.type === 'required' && 'Поле обязательно для заполнения.'}
                  {errors.description.type === 'validate' &&
                    'Описание не должно состоять только из пробельных символов'}
                </div>
              )}
            </label>
          </li>
          <li className={listElem}>
            <label htmlFor="body" className={textLabel}>
              Text
              <br />
              <textarea
                id="body"
                name="body"
                {...regBody}
                placeholder="Text"
                className={`${textInput} ${textArea} ${errors.body && errorTextInput}`}
              />
              {errors.body && (
                <div className={inputError}>
                  {errors.body.type === 'required' && 'Поле обязательно для заполнения.'}
                </div>
              )}
            </label>
          </li>
        </ul>
        {fields.length !== 0 && <p className={textLabel}>Tags</p>}
        <div className={tagBlock}>
          <ul className={tagList}>
            {fields.map((item, index) => {
              return (
                <li className={tagElem} key={nanoid()}>
                  <input
                    {...register(`tagList.${index}`, { required: true })}
                    type="text"
                    placeholder="Tag"
                    defaultValue={item || ''}
                    className={`${textInput} ${tagInput}`}
                  />
                  <button type="button" className={`${tagButton} ${del}`} onClick={() => remove(index)}>
                    Delete
                  </button>
                </li>
              )
            })}
          </ul>
          <button type="button" className={`${tagButton} ${add}`} onClick={() => append('')}>
            Add tag
          </button>
        </div>
        <button type="submit" className={submit}>
          Send
        </button>
      </form>
      {editMode ? <div>EditArticle {editMode}</div> : <div>CreateArticle</div>}
    </div>
  )
}

export default CreateAndEditArticle
