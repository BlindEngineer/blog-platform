import { Route, Routes } from 'react-router-dom'

import Layout from '../../Pages/Layout'
import NotFoundPage from '../../Pages/NotFoundPage'
import Homepage from '../../Pages/Homepage'
import SingleArticle from '../../Pages/SingleArticle'
import SignInPage from '../../Pages/SignInPage'
import SignUpPage from '../../Pages/SignUpPage'
import EditProfilePage from '../../Pages/EditProfilePage'
import NewArticlePage from '../../Pages/NewArticlePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/profile" element={<EditProfilePage />} />
        <Route path="/new-article" element={<NewArticlePage />} />
        <Route path="/articles" element={<Homepage />} />
        <Route path="/articles/:slug" element={<SingleArticle />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
