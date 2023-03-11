import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import useAuth from '../../services/hooks/auth';

function ProtectedRouteElement(props) {
  const { element } = props;
  const { user } = useAuth();

  if (user) {
    return element;
  }

  return <Navigate to="/login" />;
}

ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
};

export default ProtectedRouteElement;
