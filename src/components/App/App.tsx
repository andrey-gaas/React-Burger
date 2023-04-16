import { BrowserRouter } from 'react-router-dom';
import useAuth from '../../services/hooks/auth';
import useIngredients from '../../services/hooks/ingredients';
import useOrders from '../../services/hooks/orders';
import Cookies from '../../utils/cookies';

import AppHeader from "../AppHeader/AppHeader";
import Router from '../Router/Router';
import styles from './App.module.css';

function App() {
  const { order } = useOrders();
  const token = Cookies.getCookie('token');
  const { loading: authLoading } = useAuth();
  const { loading: ingredientsLoading } = useIngredients();

  return (
    <BrowserRouter>
      <AppHeader />
      {
        (authLoading || ingredientsLoading || order.loading.general || (token && order.loading.user)) ?
          <p className={`${styles.message} text text_type_main-medium`}>Загрузка...</p> :
          <Router />
      }
    </BrowserRouter>
  );
}

export default App;
