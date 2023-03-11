import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../services/hooks/auth';

function ProtectedRouteElement(props) {
  const { pathname } = useLocation();
  
  const { element } = props;
  const { user } = useAuth();

  if (user) {
    return element;
  }

  localStorage.setItem('redirect', pathname);
  return <Navigate to="/login" />;
}

ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
};

export default ProtectedRouteElement;
