import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../services/hooks/auth';

interface IProps {
  element: JSX.Element;
  anonymous?: boolean;
}

function ProtectedRoute(props: IProps) {
  const { element, anonymous } = props;
  const { user } = useAuth();

  const location = useLocation();
  const from = location.state?.from || '/';
  // Если разрешен неавторизованный доступ, а пользователь авторизован...
  if (anonymous && user) {
    // ...то отправляем его на предыдущую страницу
    return <Navigate to={from} />;
  }

  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && !user) {
    // ...то отправляем его на страницу логин
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Если все ок, то рендерим внутреннее содержимое
  return element;
}

export default ProtectedRoute;
