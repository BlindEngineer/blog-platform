import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
// Компонент высшего порядка обернет любую нашу страницу (в Children передана)
// Если авторизация - ок. показываем чилдрен( страницу, которую поместили между тегами HOC/
// Если нет - через компонент Навигейт переадрессуем пользователя на страницу регистрации(например),
// А чтобы знать,, откуда мы пришли - добавляем стейт с данными location/
function RequireAuth({ children }) {
  const token = useSelector((state) => state.userReducer.token)
  if (!token) {
    return <Navigate to="/sign-in" />
  }
  return children
}

export default RequireAuth
