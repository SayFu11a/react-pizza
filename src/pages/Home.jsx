import React from 'react';
import qs from 'qs';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // чтобы сшить строку queryString в адрес

import { setCategoryId, setCurrentPage, setFilltersUrl } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { AppContext } from '../App';

const Home = () => {
   const navigate = useNavigate(); // Говорим дай нам функцию из своего хука
   const dispatch = useDispatch();
   const isSearch = React.useRef(false); // поиска пока нету по умполчанию ничего нету
   const isMounted = React.useRef(false);

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

   const axiosPizzas = async () => {
      setIsLoading(true);

      const sortBy = sort.sortProperty.replace('-', '');
      const order = sort.sortProperty.includes('-') ? 'abc' : 'desc';
      const category = categoryId > 0 ? `category=${categoryId}` : '';
      const search = searchValue ? `&search=${searchValue}` : '';

      await axios
         .get(
            `https://6465cabb9c09d77a62f404da.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
         )
         .then((res) => {
            setItems(res.data);
            setIsLoading(false);
         });

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
               ...params, // мы указываем что нам необходимо передать все эти параметры.
               sort,
            }),
         );
         isSearch.current = true; // если пришли параметры из URL то не вызывай axiosPizzas и не делай рендер по умолчанию, в коде ниже будет написанно.  если dispatch не был произведен на изменение setFilltersUrl то тут будет false - это значит что мы можем сделать запрос по-умолчанию, то есть запрос с параметрами которые вшиты изначально в редаксе.
      }
   }, []);

   // если был первый рендер то запрашиваем пиццы
   React.useEffect(() => {
      // если нету поска по квери парамтрам то мы делаем axios запрос
      if (!isSearch.current) {
         axiosPizzas();
      }
      isSearch.current = false; // когда поняли что вверу ничего нету передаем фалсе
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
