import React from 'react';

type CategoriesProps = {
  value: number;
  onClickCatigory: any;
}

const Categories: React.FC<CategoriesProps> = ({ value, onClickCatigory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

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

export default Categories;
