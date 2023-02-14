import { useMemo, useContext } from 'react';
import ConstructorContext from '../../../../services/ConstructorContext';

import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from "./List.module.css";

function List() {
  const { selectedIngredients } = useContext(ConstructorContext);

  const getType = (index) => {
    if (index === 0) return 'top';
    else if (index === filteredIngredients.length - 1) return 'bottom';
    return undefined;
  }

  const filteredIngredients = useMemo(() => {
    const data = [];
    const bun = selectedIngredients.find(item => item.type === 'bun');

    if (bun) {
      data.push({
        ...bun,
        name: `${bun.name} (верх)`,
        key: `top-${bun._id}`,
      });
    }

    selectedIngredients.forEach(item => {
      if (item.type === 'bun') return;
      data.push({ ...item, key: item._id });
    });

    if (bun) {
      data.push({
        ...bun,
        name: `${bun.name} (низ)`,
        key: `bottom-${bun._id}`,
      });
    }

    return data;
  }, [selectedIngredients]);
  
  return (
    <ul className={styles.list}>
      {
        filteredIngredients.map((item, i) => (
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

export default List;
