import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import noFoto from '../../assets/img/foto.png'
import { setAuthOff } from '../../store/userSlice'

import classes from './Header.module.scss'

function Header() {
  const { main, title, user, mainLink, regLinks, name, avatar, blackBorder, bigButton, smallButton, greenBorder } =
    classes
  const userData = useSelector((state) => state.userReducer)
  const { userName, userImage, token } = userData
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const logOut = () => {
    dispatch(setAuthOff())
    localStorage.clear()
    navigate('/', { replace: true })
  }

  return (
    <header className={main}>
      <NavLink to="/" className={mainLink}>
        <h1 className={title}>Realworld Blog</h1>
      </NavLink>
      {token ? (
        <div className={regLinks}>
          <NavLink to="/new-article" className={` ${mainLink} ${title} ${greenBorder} ${smallButton} `}>
            Create article
          </NavLink>
          <NavLink to="/profile" className={user}>
            <span className={name}>{userName}</span>
            <img alt="Avatar" className={avatar} src={userImage || noFoto} />
          </NavLink>
          <button type="button" onClick={logOut} className={` ${mainLink} ${title} ${bigButton} ${blackBorder}`}>
            Log Out
          </button>
        </div>
      ) : (
        <div className={regLinks}>
          <NavLink to="/sign-in" className={` ${mainLink} ${title} `}>
            Sign In
          </NavLink>
          <NavLink to="/sign-up" className={` ${mainLink} ${title} ${bigButton} ${greenBorder}`}>
            Sign Up
          </NavLink>
        </div>
      )}
    </header>
  )
}

export default Header
