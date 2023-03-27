import React from 'react';
import styles from './ModalOverlay.module.css';

interface IProps {
  onClose: (event: React.MouseEvent<HTMLDivElement>) => void;
}

function ModalOverlay(props: IProps) {
  const { onClose } = props;

  return (
    <div className={styles.overlay} onClick={onClose} />
  );
}

export default ModalOverlay;
