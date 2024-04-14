import React from 'react';

import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate'

type CategoriesProps = {
  value: number;
  onClickCatigory: (i: number) => void;
}

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories: React.FC<CategoriesProps> = React.memo(
  ({ value, onClickCatigory }) => {

    useWhyDidYouUpdate('Categories', { value, onClickCatigory })
  
    return (
      <div className="categories">
        <ul>
          {categories.map((categoryName, index) => (
            <li
              key={index}
              onClick={() => onClickCatigory(index)}
              className={value == index ? 'active' : ''}>
              {categoryName}
            </li>
          ))}
        </ul>
      </div>
    );
  }
)

export default Categories;
