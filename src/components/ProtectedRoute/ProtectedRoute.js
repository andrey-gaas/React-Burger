import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../services/hooks/auth';

function ProtectedRoute(props) {
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
    return <Navigate to="/login" state={{ from: location}}/>;
  }

  // Если все ок, то рендерим внутреннее содержимое
  return element;
}

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
  anonymous: PropTypes.bool,
};

ProtectedRoute.defaultProps = {
  anonymous: PropTypes.false,
};

export default ProtectedRoute;
