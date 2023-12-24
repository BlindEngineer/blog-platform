/* eslint-disable react/jsx-props-no-spreading */
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'

import { updateUser } from '../../services/apiService'
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator'

import classes from './EditProfile.module.scss'

function EditProfile() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.userReducer)
  const { token, error, changes } = user

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = async (data) => {
    const newInfo = {
      user: {
        username: data.username,
        email: data.email.toLowerCase(),
        password: data.password,
        image: data.avatar,
      },
    }
    await dispatch(updateUser(newInfo, token))
  }

  const regName = register('username', {
    required: true,
    minLength: 3,
    maxLength: 20,
    pattern: /\S+/,
  })

  const regEmail = register('email', {
    required: true,
    minLength: 5,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.[A-Z]{2,4}$/i,
  })

  const regPassword = register('password', {
    required: true,
    minLength: 6,
    maxLength: 40,
    pattern: /\S+/,
  })

  const regAvatar = register('avatar', {
    pattern: /^((http|https):\/\/)?([^"'\s]*\.(?:jpg|jpeg|gif|png|svg))$/,
  })

  const { container, header, textLabel, list, listElem, textInput, submit, form, inputError, errorTextInput } = classes
  return (
    <div className={container}>
      {error ? <ErrorIndicator message={error} /> : null}
      {!error && changes ? <Navigate to="/" replace /> : null}
      <h2 className={header}>Edit Profile</h2>
      <form className={form} onSubmit={handleSubmit(onSubmit)}>
        <ul className={list}>
          <li className={listElem}>
            <label htmlFor="username" className={textLabel}>
              Username
              <br />
              <input
                id="username"
                name="username"
                type="text"
                {...regName}
                placeholder="New username"
                defaultValue={user.userName}
                className={`${textInput} ${errors.username && errorTextInput}`}
              />
              {errors.username && (
                <div className={inputError}>
                  {errors.username.type === 'required' && 'Поле обязательно для заполнения.'}
                  {errors.username.type === 'minLength' && 'Минимальная длина поля - 3 символа.'}
                  {errors.username.type === 'maxLength' && 'Максимальная длина поля - 20 символов.'}
                  {errors.username.type === 'pattern' && 'Пробельные символы запрещены'}
                </div>
              )}
            </label>
          </li>
          <li className={listElem}>
            <label htmlFor="email" className={textLabel}>
              Email address
              <br />
              <input
                id="email"
                type="email"
                name="email"
                {...regEmail}
                placeholder="New email address"
                defaultValue={user.email}
                className={`${textInput} ${errors.email && errorTextInput}`}
              />
              {errors.email && (
                <div className={inputError}>
                  {errors.email.type === 'required' && 'Поле обязательно для заполнения.'}
                  {errors.email.type === 'minLength' && 'Минимальная длина поля - 5 символов.'}
                  {errors.email.type === 'pattern' && 'Несоответствие шаблону электронной почты.'}
                </div>
              )}
            </label>
          </li>
          <li className={listElem}>
            <label htmlFor="password" className={textLabel}>
              New password
              <br />
              <input
                id="password"
                name="password"
                type="password"
                {...regPassword}
                placeholder="New password"
                className={`${textInput} ${errors.password && errorTextInput}`}
              />
              {errors.password && (
                <div className={inputError}>
                  {errors.password.type === 'required' && 'Поле обязательно для заполнения.'}
                  {errors.password.type === 'minLength' && 'Минимальная длина поля - 6 символов.'}
                  {errors.password.type === 'maxLength' && 'Максимальная длина поля - 40 символов.'}
                  {errors.password.type === 'pattern' && 'В пароле не должно быть пробельных символов'}
                </div>
              )}
            </label>
          </li>
          <li className={listElem}>
            <label htmlFor="avatar" className={textLabel}>
              Avatar image (url)
              <br />
              <input
                id="avatar"
                name="avatar"
                type="url"
                {...regAvatar}
                placeholder="Avatar image"
                defaultValue={user.userImage}
                className={`${textInput} ${errors.avatar && errorTextInput}`}
              />
              {errors.avatar && (
                <div className={inputError}>{errors.avatar.type === 'pattern' && 'Введите корректный url аватара'}</div>
              )}
            </label>
          </li>
        </ul>
        <button type="submit" className={submit}>
          Save
        </button>
      </form>
    </div>
  )
}

export default EditProfile
