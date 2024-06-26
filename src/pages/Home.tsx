import React from 'react';
import qs from 'qs';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // чтобы сшить строку queryString в адрес

import filterSlice, {
   selectFilter,
   setCategoryId,
   setCurrentPage,
   setFilltersUrl,
} from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
   const navigate = useNavigate(); // Говорим дай нам функцию из своего хука
   const dispatch = useAppDispatch();
   const isSearch = React.useRef(false); // поиска пока нету по умполчанию ничего нету
   const isMounted = React.useRef(false);

   const { items, status } = useSelector(selectPizzaData);
   const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

   const onClickCatigory = React.useCallback((i: number) => {
      dispatch(setCategoryId(i));
   }, []);

   const onChangePage = (value: number) => {
      dispatch(setCurrentPage(value));
   };

   const getPizzas = async () => {
      const sortBy = sort.sortProperty.replace('-', '');
      const order = sort.sortProperty.includes('-') ? 'abc' : 'desc';
      const category = categoryId > 0 ? `category=${categoryId}` : '';
      const search = searchValue ? `&search=${searchValue}` : '';

      dispatch(
         fetchPizzas({
            sortBy,
            order,
            category,
            search,
            currentPage: String(currentPage),
         }),
      );

      window.scrollTo(0, 0);
   };

   // если изменили параметры и был первый рендер
   // useEffect который отчечает за парсинг параметров связанных с фильтрацией пицц, и вшивание их в адресную строчку
   React.useEffect(() => {
      // if проверяет есть ли первый рендер или нет, если первый рендер то не вшивает в URL параметры, а если второй и тд рендер то вшивает. Так как useEffect выполняется в первый раз даже если его параметры не быили изменены, то мы делаем такой лайфхак с помошью if
      if (isMounted.current) {
         // qs.stringify преврашаем объект в строку для ссылки
         const queryString = qs.stringify({
            sortProperty: sort.sortProperty,
            categoryId,
            currentPage,
         });
         navigate(`?${queryString}`); // делаем в начале ссылки "?" // console.log(queryString); // sortProperty=rating&categoryId=0&currentPage=1
      }
      isMounted.current = true; // после первого рендера меняется на тру, и далее в ссылку вшиваются парамтры фильтрации
   }, [sort.sortProperty, categoryId, currentPage]);

   // если был первый рендер, то проверяем URL-праметры и сохраняем в редаксе.
   React.useEffect(() => {
      // если в window.location.search что то есть то мы будем это парсить из наших параметров и превращать в объект
      if (window.location.search) {
         const params = qs.parse(window.location.search.substring(1)); // substring чтбоы убрать первый символ ? - console.log(params); // выводит объект
         const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

         dispatch(
            setFilltersUrl({
               ...params,
                  sort: sort || list[0],
                  searchValue: '',
                  categoryId: 0,
                  currentPage: 1,
            }),
         );
         isSearch.current = true; // если пришли параметры из URL то не вызывай getPizzas и не делай рендер по умолчанию, в коде ниже будет написанно.  если dispatch не был произведен на изменение setFilltersUrl то тут будет false - это значит что мы можем сделать запрос по-умолчанию, то есть запрос с параметрами которые вшиты изначально в редаксе.
      }
   }, []);

   // если был первый рендер то запрашиваем пиццы
   React.useEffect(() => {
      // если нету поска по квери парамтрам то мы делаем axios запрос
      // if (!isSearch.current) {
      getPizzas();
      // }
      // isSearch.current = false; // когда поняли что вверу ничего нету передаем фалсе
   }, [sort.sortProperty, categoryId, searchValue, currentPage]);

   const pizzas = items.map((pizza: any) => (<PizzaBlock key={pizza.id} {...pizza} />));
   const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

   return (
      <div className="container">
         <div className="content__top">
            <Categories value={categoryId} onClickCatigory={onClickCatigory} />
            <Sort value={sort} />
         </div>
         <h2 className="content__title">Все пиццы</h2>
         {status === 'error' ? (
            <div className="cart--empty">
               <h2>
                  Произошла ошибка <span>😕</span>
               </h2>
               <p>Не удалось получить питсы. Повторите попытку позже.</p>
            </div>
         ) : (
            <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
         )}

         <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
   );
};

export default Home;
