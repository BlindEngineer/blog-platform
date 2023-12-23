/* eslint-disable react/jsx-props-no-spreading */
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'

import { logInUser } from '../../services/apiService'
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator'

import classes from './SignIn.module.scss'

function SignIn() {
  const { error, attempt, token } = useSelector((state) => state.userReducer)
  const hasRendered = useRef(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    const newUser = {
      user: {
        email: data.email.toLowerCase(),
        password: data.password,
      },
    }
    await dispatch(logInUser(newUser))
  }

  useEffect(() => {
    if (hasRendered.current) {
      if (token && !error && !attempt) {
        navigate('/', { replace: true })
      }
    } else {
      hasRendered.current = true
    }
  }, [attempt, error, navigate, token])

  const regEmail = register('email', {
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.[A-Z]{2,4}$/i,
  })

  const regPassword = register('password', {
    required: true,
    pattern: /\S+/,
  })

  const {
    container,
    header,
    textLabel,
    list,
    listElem,
    textInput,
    submit,
    form,
    question,
    link,
    errorTextInput,
    inputError,
  } = classes
  return (
    <div className={container}>
      {error ? <ErrorIndicator message={error} /> : null}
      <h2 className={header}>Sign In</h2>
      <form className={form} onSubmit={handleSubmit(onSubmit)}>
        <ul className={list}>
          <li className={listElem}>
            <label htmlFor="emailAdress" className={textLabel}>
              Email address
              <br />
              <input
                id="email"
                name="email"
                type="email"
                {...regEmail}
                placeholder="Email address"
                className={`${textInput} ${errors.email && errorTextInput}`}
              />
              {errors.email && (
                <div className={inputError}>
                  {errors.email.type === 'required' && 'Поле обязательно для заполнения.'}
                  {errors.email.type === 'pattern' && 'Несоответствие шаблону электронной почты.'}
                </div>
              )}
            </label>
          </li>
          <li className={listElem}>
            <label htmlFor="password" className={textLabel}>
              Password
              <br />
              <input
                id="password"
                name="password"
                type="password"
                {...regPassword}
                placeholder="Password"
                className={`${textInput} ${errors.password && errorTextInput}`}
              />
              {errors.password && (
                <div className={inputError}>
                  {errors.password.type === 'required' && 'Поле обязательно для заполнения.'}
                  {errors.password.type === 'pattern' && 'В пароле не должно быть пробельных символов.'}
                </div>
              )}
            </label>
          </li>
        </ul>
        <button type="submit" className={submit}>
          Login
        </button>
      </form>
      <p className={question}>
        Don’t have an account?{' '}
        <Link to="/sign-up" className={link}>
          Sign Up.
        </Link>
      </p>
    </div>
  )
}

export default SignIn
