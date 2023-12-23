/* eslint-disable react/jsx-props-no-spreading */
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { postNewUser } from '../../services/apiService'

import classes from './SignUp.module.scss'

function SignUp() {
  const {
    container,
    header,
    textLabel,
    list,
    listElem,
    textInput,
    breakline,
    submit,
    checkLabel,
    checkbox,
    form,
    agreement,
    question,
    link,
    inputError,
    errorTextInput,
    checkboxError,
  } = classes

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    const newUser = {
      user: {
        username: data.username,
        email: data.email.toLowerCase(),
        password: data.password,
      },
    }
    await dispatch(postNewUser(newUser))
    navigate('/', { replace: true })
  }

  const regName = register('username', {
    required: true,
    minLength: 3,
    maxLength: 20,
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

  const regRepeatPassword = register('repeatPassword', {
    required: true,
    validate: (value) => value === watch('password'),
  })

  const regAgreement = register('agreement', {
    required: true,
  })

  return (
    <div className={container}>
      <h2 className={header}>Create new account</h2>
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
                placeholder="Username"
                className={`${textInput} ${errors.username && errorTextInput}`}
              />
              {errors.username && (
                <div className={inputError}>
                  {errors.username.type === 'required' && 'Поле обязательно для заполнения.'}
                  {errors.username.type === 'minLength' && 'Минимальная длина поля - 3 символа.'}
                  {errors.username.type === 'maxLength' && 'Максимальная длина поля - 20 символов.'}
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
                name="email"
                type="email"
                {...regEmail}
                placeholder="Email address"
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
                  {errors.password.type === 'minLength' && 'Минимальная длина поля - 6 символов.'}
                  {errors.password.type === 'maxLength' && 'Максимальная длина поля - 40 символов.'}
                  {errors.password.type === 'pattern' && 'В пароле не должно быть пробельных символов'}
                </div>
              )}
            </label>
          </li>
          <li className={listElem}>
            <label htmlFor="repeatPassword" className={textLabel}>
              Repeat Password
              <br />
              <input
                id="repeatPassword"
                name="repeatPassword"
                type="password"
                {...regRepeatPassword}
                placeholder="Repeat Password"
                className={`${textInput} ${errors.repeatPassword && errorTextInput}`}
              />
              {errors.repeatPassword && (
                <div className={inputError}>
                  {errors.repeatPassword.type === 'required' && 'Поле обязательно для заполнения.'}
                  {errors.repeatPassword.type === 'validate' && 'Значения паролей должны совпадать.'}
                </div>
              )}
            </label>
          </li>
        </ul>
        <div className={breakline} />
        <div className={agreement}>
          <input id="agreement" type="checkbox" name="agreement" {...regAgreement} className={checkbox} />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="agreement" className={checkLabel}>
            I agree to the processing of my personal information
          </label>
        </div>
        {errors.agreement && (
          <div className={checkboxError}>{errors.agreement.type === 'required' && 'Отметка обязательна.'}</div>
        )}
        <button type="submit" className={submit}>
          Create
        </button>
      </form>
      <p className={question}>
        Already have an account?{' '}
        <Link to="/sign-in" className={link}>
          Sign In.
        </Link>
      </p>
    </div>
  )
}

export default SignUp
