import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './OrderDetails.module.css';

interface IProps {
  orderNumber: number;
}

function OrderDetails(props: IProps) {
  const { orderNumber } = props;
  return (
    <div className={styles.container}>
      <h3 className={`${styles['order-number']} text text_type_digits-large`}>{orderNumber}</h3>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <div className={`${styles['icon-container']} mt-15`}>
        <CheckMarkIcon type="primary" />
      </div>
      <p className="text text_type_main-default mt-15">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mt-2 mb-15">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;
