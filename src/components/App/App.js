import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AppHeader from "../AppHeader/AppHeader";

import HomePage from '../../pages/Home/Home';
import LoginPage from '../../pages/Login/Login';
import RegistrationPage from '../../pages/Registration/Registration';
import ForgotPasswordPage from '../../pages/ForgotPassword/ForgotPassword';
import ResetPasswordPage from '../../pages/ResetPassword/ResetPassword';
import ProfilePage from '../../pages/Profile/Profile';

function App() {
  return (
    <BrowserRouter>
      <AppHeader />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/registration' element={<RegistrationPage />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
        <Route path='/reset-password' element={<ResetPasswordPage />} />
        <Route path='/profile/*' element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
