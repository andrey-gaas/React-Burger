import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { convertedIngredient } from '../../../../types/data';

import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Loader from '../../../Loader/Loader';

import styles from "./TotalPrice.module.css";

function TotalPrice(props) {
  const { checkout, data, loading } = props;

  const price = useMemo(() => {
    return data.reduce((totalPrice, item) => {
      return totalPrice + item.price;
    }, 0);
  }, [data]);

  return (
    <section className={`${styles['total-contaier']} mt-10`}>
      <div className={styles.total}>
        <span className="text text_type_digits-medium mr-2">
          {price}
        </span>
        <CurrencyIcon />
      </div>
      <Button
        htmlType="button"
        extraClass={`${styles.button} ml-10`}
        onClick={checkout}
        disabled={loading}
      >
        Оформить заказ
        {
          loading && (
          <div className={`${styles['loader-container']} ml-2`}>
            <Loader />
          </div>
        )}
      </Button>
    </section>
  );
}

TotalPrice.propTypes = {
  checkout: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(convertedIngredient).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default TotalPrice;