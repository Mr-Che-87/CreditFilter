import { useState, useEffect } from 'react';
import styles from './SortingMenu.module.scss';
import minSorting from "../../assets/minSorting.png"; 
import maxSorting from "../../assets/maxSorting.png"; 

interface SortingMenuProps {
    transferSort: (order: 'min' | 'max') => void;
    sortOrder: 'min' | 'max' | null;
}

export default function SortingMenu({ transferSort, sortOrder }: SortingMenuProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false); //стейт для открытия-закрытия доп-меню

//При перезагрузке восстанавливаем сортировку из localStorage:
 useEffect(() => {
    const storedSortOrder = localStorage.getItem('sortOrder');
    if (storedSortOrder === 'min' || storedSortOrder === 'max') {
        transferSort(storedSortOrder);
    }
}, [transferSort]);

//Хэндлер открытия-закрытия доп-меню:
    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

//Хэндлер кликов на кнопки доп-меню:
    const handleSort = (order: 'min' | 'max') => {
        transferSort(order); //при клике вызываем transferSort, переданную из App => где она, в свою очередь, меняет общий стейт
        setIsMenuOpen(false); // закрываем меню после выбора
        localStorage.setItem('sortOrder', order); //cохраняем сортировку в localStorage
    };

    return (
        <div className={styles.sortingContainer}>
            <button 
                className={styles.buttonContainer}
                onClick={handleMenuToggle}
            >
                <p className={styles.buttonText}>Сортировать</p>
                <img 
                    className={styles.buttonImg} 
                    src={sortOrder === 'min' ? minSorting : maxSorting} //меняем картинку в зав-ти от типа сортировки 
                    alt='min/max icon'
                />
            </button>
            {isMenuOpen && (
                <div className={styles.dropdownMenu}>
                    <button onClick={() => handleSort('min')}>Начиная с минимального предложения</button>
                    <button onClick={() => handleSort('max')}>Начиная с максимального предложения</button>
                </div>
            )}
        </div>
    );
}