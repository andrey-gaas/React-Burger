import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

import styles from './Modal.module.css';

interface IProps {
  onClose: () => void;
  children: JSX.Element;
  title?: string;
}

function Modal(props: IProps) {
  const { onClose, children, title } = props;

  const close = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.addEventListener('keydown', close);

    return () => {
      document.body.style.overflow = 'auto';
      document.body.removeEventListener('keydown', close);
    }
  }, [close]);

  return createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={`${styles['modal-container']} pt-10 pl-10 pr-10 pb-15`}>
        <div className={styles['title-container']}>
          <h2 className="text text_type_main-large" >
            {title}
          </h2>
          <button className={styles['close-button']} onClick={onClose} >
            <CloseIcon type="primary" />
          </button>
        </div>

        {children}
      </div>
    </>,
    document.querySelector('#modal-portal') as HTMLElement,
  );
}

export default Modal;
