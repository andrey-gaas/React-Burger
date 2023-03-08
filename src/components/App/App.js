import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AppHeader from "../AppHeader/AppHeader";

import HomePage from '../../pages/Home/Home';
import LoginPage from '../../pages/Login/Login';
import RegistrationPage from '../../pages/Registration/Registration';

function App() {
  return (
    <BrowserRouter>
      <AppHeader />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/registration' element={<RegistrationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
