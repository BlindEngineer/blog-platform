import { NavLink } from 'react-router-dom'

import classes from './Header.module.scss'

function Header() {
  const { main, title, mainLink, regLinks, signIn, signOut } = classes
  return (
    <header className={main}>
      <NavLink to="/" className={mainLink}>
        <h1 className={title}>Realworld Blog</h1>
      </NavLink>
      <div className={regLinks}>
        <NavLink to="/" className={` ${mainLink} ${title} ${signIn}`}>
          Sign In
        </NavLink>
        <NavLink to="/" className={` ${mainLink} ${title} ${signOut}`}>
          Sign Up
        </NavLink>
      </div>
    </header>
  )
}

export default Header
