import { Outlet } from 'react-router-dom'

import Header from '../components/Header/Header'

function Layout() {
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
