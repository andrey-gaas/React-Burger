// import PropTypes from 'prop-types';

import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from "./List.module.css";

function List(props) {
  const { data } = props;

  const getType = (index) => {
    if (index === 0) return 'top';
    else if (index === data.length - 1) return 'bottom';
    return undefined;
  }
  
  return (
    <ul className={styles.list}>
      {
        data.map((item, i) => (
          <li className={`mt-4 ${styles['list-item']}`} key={item.key}>
            {
              item.type !== 'bun' && <DragIcon type="primary" />
            }
            <ConstructorElement
              type={getType(i)}
              isLocked={item.type === 'bun'}
              text={item.name}
              price={item.price}
              thumbnail={item.image}
              extraClass={`${styles.ingredient} ${item.type === 'bun' ? 'ml-8' : 'ml-2'}`}
            />
          </li>
        ))
      }
    </ul>
  );
}

List.propTypes = {

};

export default List;
