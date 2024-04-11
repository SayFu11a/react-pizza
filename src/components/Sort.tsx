import React from 'react';
import { useSelector, useDispatch } from 'react-redux'; // импортируем из библеотеки react-redux useSelector, useDispatch
import { selectSort, setTypeSort } from '../redux/slices/filterSlice';

type SortItem = {
   name: string;
   sortProperty: string;
}

export const list: SortItem[] = [
   { name: 'популярности (DESC)', sortProperty: 'rating' },
   { name: 'популярности (ASC)', sortProperty: '-rating' },
   { name: 'цене (DESC)', sortProperty: 'price' },
   { name: 'цене (ASC)', sortProperty: '-price' },
   { name: 'алфавиту (DESC)', sortProperty: 'title' },
   { name: 'алфавиту (ASC)', sortProperty: '-title' },
];

function Sort() {
   const dispatch = useDispatch(); // получаем функцию котораая будет передавать нам в редакс действие.
   const sort = useSelector(selectSort); // вытаскиваем из store.js объект sort
   const sortRef = React.useRef<HTMLDivElement>(null); // ссылка на sort dom элемент

   const [open, setOpen] = React.useState(false);
   const rotate = { transform: 'rotate(180deg)' };

   const onClicListItem = (obj: SortItem) => {
      dispatch(setTypeSort(obj));
      setOpen(!open);
   }

   // эта тема зарывает попап сорта при клике на другое место на боди
   React.useEffect(() => {
      const clickOnPopap = (event: MouseEvent) => {
         // event.composedPath() - показывает на какой элемент кликнули
         if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
            setOpen(false);
            // console.log('снаружи клик');
         }
      };

      document.body.addEventListener('click', clickOnPopap);

      // это типа componentWillUnmount(). вызывается перед удалением компонента чтобы удалить лисенер, так как если не удалить его то он множится когда компонент удаляется когда мы переходим на другой компоннет, страрый компоенент удаляется а вот лисенер остается, и вот тут внизу мы решаем проблему с лисенером просто удаляем его когда компоннет удаляется.
      return () => document.body.removeEventListener('click', clickOnPopap);
   }, []);

   return (
      <div ref={sortRef} className="sort">
         <div className="sort__label">
            <svg
               style={open ? {} : rotate}
               width="10"
               height="6"
               viewBox="0 0 10 6"
               fill="none"
               xmlns="http://www.w3.org/2000/svg">
               <path
                  d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                  fill="#2C2C2C"
               />
            </svg>
            <b>Сортировка по:</b>
            <span onClick={() => setOpen(!open)}>{sort.name}</span>
         </div>
         {open && (
            <div className="sort__popup">
               <ul>
                  {list.map((obj, index) => (
                     <li
                        key={index}
                        className={sort.sortProperty === obj.sortProperty ? 'active' : ''}
                        onClick={() => onClicListItem(obj)}>
                        {obj.name}
                     </li>
                  ))}
               </ul>
            </div>
         )}
      </div>
   );
}

export default Sort;
