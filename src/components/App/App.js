import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useAuth from '../../services/hooks/auth';

import AppHeader from "../AppHeader/AppHeader";
import ProtectedRouteElement from '../ProtectedRouteElement/ProtectedRouteElement';
import styles from './App.module.css';

import HomePage from '../../pages/Home/Home';
import LoginPage from '../../pages/Login/Login';
import RegistrationPage from '../../pages/Registration/Registration';
import ForgotPasswordPage from '../../pages/ForgotPassword/ForgotPassword';
import ResetPasswordPage from '../../pages/ResetPassword/ResetPassword';
import ProfilePage from '../../pages/Profile/Profile';

function App() {
  const { loading } = useAuth();

  return (
    <BrowserRouter>
      <AppHeader />
      {
        loading &&
        <p className={`${styles.message} text text_type_main-medium`}>Загрузка...</p>
      }
      {
        !loading &&
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/registration' element={<RegistrationPage />} />
          <Route path='/forgot-password' element={<ForgotPasswordPage />} />
          <Route path='/reset-password' element={<ResetPasswordPage />} />
          <Route path='/profile/*' element={<ProtectedRouteElement element={<ProfilePage />} />} />
        </Routes>
      }
    </BrowserRouter>
  );
}

export default App;
