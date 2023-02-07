import { useEffect } from 'react';
import PropTypes from 'prop-types';

import styles from './ModalOverlay.module.css';

function ModalOverlay(props) {
  const { onClose } = props;

  function close(event) {
    if (event.key === 'Escape') {
      onClose();
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.addEventListener('keydown', close);

    return () => {
      document.body.style.overflow = 'auto';
      document.body.removeEventListener('keydown', close);
    }
  }, []);

  return (
    <div className={styles.overlay} onClick={onClose} />
  );
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
