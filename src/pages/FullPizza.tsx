import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza: React.FC = () => {
   const [pizza, setPizza] = React.useState<{
      imageUrl: string;
      title: string;
      price: number;
   }>(); // объянили будущим программистам что тут происходт в пицаа
   const { id } = useParams();
   const navigate = useNavigate();

   React.useEffect(() => {
      async function fetchPizza() {
         try {
            const { data } = await axios.get(
               'https://6465cabb9c09d77a62f404da.mockapi.io/items/' + id,
            );
            setPizza(data);
         } catch (error) {
            alert('Ошмька при получении питсы');
            navigate('/');
         }
      }

      fetchPizza();
   }, []);

   if (!pizza) {
      return <>загрузка...</>;
   }

   return (
      <div className="container">
         <img src={pizza.imageUrl} />
         <h2>{pizza.title}</h2>
         <h4>{pizza.price} ₽</h4>
      </div>
   );
};

export default FullPizza;