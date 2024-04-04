import React from 'react';
import { setSearchValue } from '../../redux/slices/filterSlice';
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';
import { useDispatch } from 'react-redux';

const Search = () => {
   const dispatch = useDispatch();
   const [value, setValue] = React.useState(''); // локально хранит searchValue (внутри компонета Search) этот стйест отчевает за быстрое отображение данных из инпута
   const inputRef = React.useRef(); // добавляем useRef

   const updateSerchValue = React.useCallback(
      // - сохранили ссылку на функцию (сохраниили внутри updateSerchValue) с помошью useCallback,
      // - если бы не useCallback то функция пересоздовалась бы.
      // - то есть каждый раз при изменении инпута происходил бы запрос к серверу моментально
      // и наш бэкэнд из-за большого колличества запросов может нас забанить
      debounce((str) => {
         // сделали функцию setSearchValue отложенной с пмомшью debounce
         dispatch(setSearchValue(str));
      }, 500), //отложенной на 500мс
      [],
   );

   const clearAndFocusInput = () => {
      // создаем функцию для очистки и фокусировки инпута
      dispatch(setSearchValue('')); // делаем очитку в контексте
      setValue(''); // делаем очитку локально
      // document.querySelector('input').focus(); // неправильный способ
      inputRef.current.focus(); // правильный способ для фокусироки инпута
   };

   const onChangeInput = (event) => {
      // onChangeInput вызывается каждый раз когда менятеся ввод (target.value) внутри input
      setValue(event.target.value); // это у нас моментально сохраниться
      updateSerchValue(event.target.value);
   };

   return (
      <div className={styles.root}>
         <svg
            className={styles.icon}
            enableBackground="new 0 0 32 32"
            id="EditableLine"
            version="1.1"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg">
            <circle
               cx="14"
               cy="14"
               fill="none"
               id="XMLID_42_"
               r="9"
               stroke="#000000"
               strokeLinecap="round"
               strokeLinejoin="round"
               strokeMiterlimit="10"
               strokeWidth="2"
            />
            <line
               fill="none"
               id="XMLID_44_"
               stroke="#000000"
               strokeLinecap="round"
               strokeLinejoin="round"
               strokeMiterlimit="10"
               strokeWidth="2"
               x1="27"
               x2="20.366"
               y1="27"
               y2="20.366"
            />
         </svg>
         <input
            ref={inputRef} // мы привязали inputRef к Dom элементу input
            value={value} // сделали контролруемый инпут локально
            onChange={onChangeInput}
            className={styles.input}
            placeholder="Поиск пиццы ..."
         />
         {value && (
            <svg
               onClick={clearAndFocusInput}
               className={styles.closeIcon}
               viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg">
               <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
            </svg>
         )}
      </div>
   );
};

export default Search;
