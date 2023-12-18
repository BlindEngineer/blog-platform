import { Route, Routes } from 'react-router-dom'

import Layout from '../../Pages/Layout'
import NotFoundPage from '../../Pages/NotFoundPage'
import Homepage from '../../Pages/Homepage'
import SingleArticle from '../../Pages/SingleArticle'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="/articles" element={<Homepage />} />
        <Route path="/articles/:slug" element={<SingleArticle />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
