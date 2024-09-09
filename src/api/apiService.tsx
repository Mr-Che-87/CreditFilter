import axios from 'axios';
import { IProduct } from '../types/IProduct'
  
  //GET для списка кредитных предложений:
  export const fetchProducts = async (): Promise<IProduct[]> => {
    try {
      //Имитация запроса к "серверу":
      const response = await axios.get('./mock.json'); // заглушка лежит в public
      return response.data.products; //получаем респонс
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
      return [];
    }
  };