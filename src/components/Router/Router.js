import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import ProtectedRouteElement from '../ProtectedRouteElement/ProtectedRouteElement';
import HomePage from '../../pages/Home/Home';
import LoginPage from '../../pages/Login/Login';
import RegistrationPage from '../../pages/Registration/Registration';
import ForgotPasswordPage from '../../pages/ForgotPassword/ForgotPassword';
import ResetPasswordPage from '../../pages/ResetPassword/ResetPassword';
import ProfilePage from '../../pages/Profile/Profile';

import IngredientsDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';

function Router() {
  const location = useLocation();
  const navigate = useNavigate();

  let background = location.state && location.state.background;

  const handleModalClose = () => {
    navigate(-1);
  };
  
  return (
    <>
      <Routes location={background || location}>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/registration' element={<RegistrationPage />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
        <Route path='/reset-password' element={<ResetPasswordPage />} />
        <Route path='/profile/*' element={<ProtectedRouteElement element={<ProfilePage />} />} />
        <Route path='/ingredients/:ingredientId' element={<IngredientsDetails extraClass="mt-20" />} />
      </Routes>
      {
        background &&
        <Routes>
          <Route
            path='/ingredients/:ingredientId'
            element={
              <Modal onClose={handleModalClose}>
                <IngredientsDetails />
              </Modal>
            }
          />
        </Routes>
      }
    </>
  );
}

export default Router;