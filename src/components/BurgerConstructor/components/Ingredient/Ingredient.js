import { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import { ingredient } from '../../../../types/data';

import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './Ingredient.module.css';

function Ingredient(props) {
  const { ingredient, type, remove, move, index } = props;
  const ref = useRef(null);
  
  // eslint-disable-next-line
  const [, drag] = useDrag({
    type: 'constructor-ingredient',
    item: ingredient,
  });

  const [{ handlerId }, drop] = useDrop({
    accept: 'constructor-ingredient',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      move(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <li
      className={`mt-4 ${styles['list-item']}`}
      ref={ingredient.type !== 'bun' ? ref : null}
      data-handler-id={handlerId}
    >
      {
        ingredient.type !== 'bun' &&
          <div className={styles['icon-wrapper']}>
            <DragIcon type="primary" />
          </div>
      }
        <ConstructorElement
          type={type}
          isLocked={ingredient.type === 'bun'}
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image}
          extraClass={`${styles.ingredient} ${ingredient.type === 'bun' ? 'ml-8' : 'ml-2'}`}
          handleClose={remove}
          />
      </li>
  );
}

Ingredient.propTypes = {
  ingredient: ingredient.isRequired,
  type: PropTypes.string,
  remove: PropTypes.func.isRequired,
  move: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default Ingredient;
