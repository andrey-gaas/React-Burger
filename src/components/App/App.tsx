import { BrowserRouter } from 'react-router-dom';
import useAuth from '../../services/hooks/auth';
import useIngredients from '../../services/hooks/ingredients';

import AppHeader from "../AppHeader/AppHeader";
import Router from '../Router/Router';
import styles from './App.module.css';

function App() {
  const { loading: authLoading } = useAuth();
  const { loading: ingredientsLoading } = useIngredients();

  return (
    <BrowserRouter>
      <AppHeader />
      {
        (authLoading || ingredientsLoading) ?
          <p className={`${styles.message} text text_type_main-medium`}>Загрузка...</p> : 
          <Router />
      }
    </BrowserRouter>
  );
}

export default App;
