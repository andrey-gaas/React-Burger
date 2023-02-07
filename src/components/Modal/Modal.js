import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

import styles from './Modal.module.css';

function Modal(props) {
  const { onClose, children, title } = props;

  return createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={`${styles['modal-container']} pt-10 pl-10 pr-10 pb-15`}>
        <div className={styles['title-container']}>
          <h2 className="text text_type_main-large">
            {title}
          </h2>
          <button className={styles['close-button']} onClick={onClose}>
            <CloseIcon type="primary" />
          </button>
        </div>
        
        {children}
      </div>
    </>,
    document.querySelector('#modal-portal'),
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element,
  title: PropTypes.string,
};

Modal.defaultProps = {
  title: "",
};

export default Modal;
