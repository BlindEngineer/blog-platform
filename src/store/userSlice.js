import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: null,
    userName: null,
    userImage: null,
    token: null,
    error: false,
    attempt: false,
  },
  reducers: {
    setUserLoadingOn(state) {
      return { ...state, attempt: true, error: false }
    },
    setUserLoadingOff(state) {
      return { ...state, attempt: false, error: false }
    },
    setUserError(state, action) {
      return { ...state, attempt: false, error: action.payload }
    },
    setUserInformation(state, action) {
      const { email, token, username, image } = action.payload.user
      return { ...state, attempt: false, error: false, email, token, userName: username, userImage: image }
    },
    setAuthOff(state) {
      return { ...state, attempt: false, error: false, email: null, token: null, userName: null, userImage: null }
    },
  },
})

export const { setUserLoadingOn, setUserLoadingOff, setUserError, setUserInformation, setAuthOff } = userSlice.actions
export default userSlice.reducer
