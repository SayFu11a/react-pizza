import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { AppContext } from '../App';

const Home = () => {
   const dispatch = useDispatch();
   const { categoryId, sort, currentPage } = useSelector((state) => state.filter);

   const { searchValue } = React.useContext(AppContext);
   const [items, setItems] = React.useState([]);
   const [isLoading, setIsLoading] = React.useState(true);

   const onClickCatigory = (id) => {
      dispatch(setCategoryId(id));
   };

   const onChangePage = (namber) => {
      dispatch(setCurrentPage(namber));
   };

   React.useEffect(() => {
      setIsLoading(true);

      const category = categoryId > 0 ? `category=${categoryId}` : '';
      const search = searchValue ? `&search=${searchValue}` : '';

      axios
         .get(
            `https://6465cabb9c09d77a62f404da.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sort.sortProperty}${search}`,
         )
         .then((res) => {
            setItems(res.data);
            setIsLoading(false);
         });

      window.scrollTo(0, 0);
   }, [sort.sortProperty, categoryId, searchValue, currentPage]);

   const pizzas = items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);
   const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

   return (
      <div className="container">
         <div className="content__top">
            <Categories value={categoryId} onClickCatigory={onClickCatigory} />
            <Sort />
         </div>
         <h2 className="content__title">Все пиццы</h2>
         <div className="content__items">{isLoading ? skeletons : pizzas}</div>
         <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
   );
};

export default Home;
