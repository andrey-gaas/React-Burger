import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AppHeader from "../AppHeader/AppHeader";

import HomePage from '../../pages/Home/Home';
import LoginPage from '../../pages/Login/Login';

function App() {
  return (
    <BrowserRouter>
      <AppHeader />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
