import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Header from '../components/Header/Header'
import { setUserInformation } from '../store/userSlice'

function Layout() {
  const dispatch = useDispatch()
  useEffect(() => {
    if (localStorage.getItem('currentUser')) {
      const lsUser = JSON.parse(localStorage.getItem('currentUser'))
      dispatch(setUserInformation(lsUser))
    }
  }, [dispatch])
  return (
    <>
      <Header />
      <main style={{ width: '940px', margin: '0 auto', padding: '26px 0' }}>
        <Outlet />
      </main>
    </>
  )
}

export default Layout
