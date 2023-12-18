import { configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'

import articlesReducer from './articlesSlice'
// Если добавятся редьюсеры - перелопатить юз. селекторы
const blogStore = configureStore({
  reducer: articlesReducer,
  middleware: () => [thunk],
})

export default blogStore
