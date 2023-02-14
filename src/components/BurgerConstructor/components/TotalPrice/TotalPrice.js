import { useMemo } from 'react';
import PropTypes from 'prop-types';

import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from "./TotalPrice.module.css";

function TotalPrice(props) {
  const { checkout, data } = props;

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
      <Button htmlType="button" extraClass='ml-10' onClick={checkout}>
        Оформить заказ
      </Button>
    </section>
  );
}

TotalPrice.propTypes = {
  checkout: PropTypes.func.isRequired,
};

export default TotalPrice;