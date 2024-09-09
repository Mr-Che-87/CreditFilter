import { useEffect } from 'react';
import styles from './ModalMessage.module.scss';

interface ModalConfirmProps {
  message: string;
  onClose: () => void;
}

export default function ModalConfirm({ message, onClose }: ModalConfirmProps) {
  
  useEffect(() => {
//Хэндлер, чтобы закрыть модальное окно при любом клике и нажатии любой клавиши:
    const handleClick = () => onClose();
    const handleKeyPress = () => onClose();

    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyPress);

  //удаляем хэндлеры при размонтировании
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [onClose]);

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>{message}</div> 
    </div>
  );
}
