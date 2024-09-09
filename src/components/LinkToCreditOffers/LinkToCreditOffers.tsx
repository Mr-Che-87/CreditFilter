import { useState } from 'react';
import { useSelector } from 'react-redux';
import { generateShareableLink } from '../../utils/generateLink';
import ModalMessage from './ModalMessage/ModalMessage';
import styles from './LinkToCreditOffers.module.scss';

interface LinkToCreditOffersProps {
    sortOrder: 'min' | 'max' | null;
}

export default function LinkToCreditOffers({ sortOrder }: LinkToCreditOffersProps) {
  //Получаем значение фильтра из Redux:
  const filterAmount = useSelector((state: any) => state.creditFilter.amount); 
   
  const [isModalVisible, setModalVisible] = useState(false); //стейт для модалки

//хэндлер клика:
  const handleShareLink = () => {
    const shareableLink = generateShareableLink(filterAmount, sortOrder);  //генерит ссылку
    navigator.clipboard.writeText(shareableLink).then(() => {
      setModalVisible(true); //и открывает модалку
    });
  };

  const closeModal = () => {
    setModalVisible(false); 
  };

  return (
    <div className={styles.linkContainer}>
      <button className={styles.shareButton} onClick={handleShareLink}>
        Поделиться ссылкой
      </button>
      {isModalVisible && <ModalMessage message="Ссылка скопирована в буфер обмена" onClose={closeModal} />}
    </div>
  );
}