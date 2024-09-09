import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAmountFilter } from '../../store/filtersSlice';
import styles from './InputForFilter.module.scss';

export default function InputForFilter() {
    const dispatch = useDispatch();

//При перезагрузке восстанавливаем фильтр из localStorage:
     useEffect(() => {
        const storedAmount = localStorage.getItem('filterAmount');
        if (storedAmount) {
            dispatch(setAmountFilter(Number(storedAmount)));
        }
    }, [dispatch]);


//Хэндлер ввода в инпут, меняющий состояние через редакс:
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(/\D/g, ''); // удаляем все символы, кроме цифр
        const amount = value ? parseInt(value, 10) : null;  //парсим строку  в число
        dispatch(setAmountFilter(amount)); // инициируем изменения значения фильтра в редукторе
        localStorage.setItem('filterAmount', amount?.toString() || ''); //сохраняем фильтр в localStorage
    };

    return (
        <div className={styles.inputContainer}>
            <input
                type="number"
                className={styles.inputContent}
                placeholder="Необходимая сумма кредита, ₽"
                min="1"
                onInput={handleInput}
                defaultValue={localStorage.getItem('filterAmount') || ''} //введённое в инпут сохраняем в localStorage
            />
        </div>
    );
}