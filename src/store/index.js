import { configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'

import articlesReducer from './articlesSlice'
import userReducer from './userSlice'
// Если добавятся редьюсеры - перелопатить юз. селекторы
const reducer = {
  articlesReducer,
  userReducer,
}
const blogStore = configureStore({
  reducer,
  middleware: () => [thunk],
})

export default blogStore
