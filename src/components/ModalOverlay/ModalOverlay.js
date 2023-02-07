import PropTypes from 'prop-types';

import styles from './ModalOverlay.module.css';

function ModalOverlay(props) {
  const { onClose } = props;

  return (
    <div className={styles.overlay} onClick={onClose} />
  );
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
