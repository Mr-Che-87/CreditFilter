import { useState } from 'react';

import './App.scss'
import CreditList from './components/CreditList/CreditList'
import InputForFilter from './components/InputForFilter/InputForFilter'
import SortingMenu from './components/SortingMenu/SortingMenu'
import LinkToCreditOffers from './components/LinkToCreditOffers/LinkToCreditOffers';



export default function App() {
//стейт для текущего вида сортировки: min, max или не выбрано:
  const [sortOrder, setSortOrder] = useState<'min' | 'max' | null>(null);  

//Функция для промежуточной передачи стейта сортировки из SortingMenu в CreditList (через родительский App):
  const transferSort = (order: 'min' | 'max') => {
    setSortOrder(order);  //sortOrder становится равным либо min либо max
  };

  return (
    <div className='appContainer'>
      <InputForFilter />
      <div className='buttonsGroup'>
        <SortingMenu transferSort={transferSort} sortOrder={sortOrder} />
        <LinkToCreditOffers sortOrder={sortOrder} />
      </div>
      <CreditList sortOrder={sortOrder} />
    </div>
  );
}


