import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styles from './CreditList.module.scss';
import CreditItem  from './CreditItem/CreditItem';

//import mockData from '../../../public/mock.json';  //по простому
import { fetchProducts } from '../../api/apiService'; //по умному
import { IProduct } from '../../types/IProduct';

  
interface CreditListProps {
    sortOrder: 'min' | 'max' | null;
  }

  export default function CreditList({ sortOrder }: CreditListProps) {
    //const products = mockData.products;  //извлекаем из заглушки напрямую (если по простому)
    const [products, setProducts] = useState<IProduct[]>([]); //стейт для запроса из API (если по умному)
    const [loading, setLoading] = useState<boolean>(true); //стейт для отслеживания загрузки


    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]); //стейт для отфильтрованного списка кредитов
    const amountFilter = useSelector((state: RootState) => state.creditFilter.amount); //через amountFilter подписываемся на изменение amount в глобальном состоянии Redux 

//Имитация запроса к API:
    useEffect(() => {
        const getProducts = async () => {
        setLoading(true);
        const data = await fetchProducts();  
        setProducts(data);
        setLoading(false);
        };
        getProducts();
    }, []);

//Фильтрация и сортировка:
    useEffect(() => {
        let updatedProducts = [...products];  //нач. состояние списка - копия исх. массива из бэкенда

//если фильтр есть, то оставляем только, те, которые больше-равно значения фильтра:
        if (amountFilter !== null) {
          updatedProducts = updatedProducts.filter((product) => product.amount >= amountFilter);
        }

//если сортировка вкл, то сортируем с помощью .sort():
        if (sortOrder) {
          updatedProducts.sort((a, b) =>
//если по возрастанию min - меньшее a встаёт перед бОльшим b, по убыванию - наоброт:
            sortOrder === 'min' ? a.amount - b.amount : b.amount - a.amount
          );
        }
    
        setFilteredProducts(updatedProducts);
      }, [amountFilter, sortOrder, products]); //срабатыает при любом изменении: -фильтра, -сортировки, -данных с бэка
       

      return (
        <div className={styles.listContainer}>
          {loading ? ( //чтобы не вылезала красная надпись - отображаем "Загрузка...", пока данные загружаются
            <p>Загрузка...</p>
          ) : filteredProducts.length !== 0 ? (  //основная загрузка массива:
            filteredProducts.map((product, index) => (
              <CreditItem key={index} name={product.name} amount={product.amount} logo={product.logo} />
            ))
          ) : ( //красная надпись:
            <p className={styles.noResultsMessage}> 
              Нет кредитных предложений, удовлетворяющих вашему запросу.
              <br />
              Попробуйте снизить желаемую сумму.
            </p>
          )}
        </div>
      );
    }