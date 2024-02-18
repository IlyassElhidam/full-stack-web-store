import React, { useState, useEffect, useMemo } from 'react';
import UserNav from '../components/UserNav';
import UCard from '../components/U_Card';
const UProducts = () => {
  const [products, setProducts] = useState([]);
  const [products_stock1, setProducts_stock1] = useState([]);
  const [products_stock2, setProducts_stock2] = useState([]);
  const [user_infos, setUser_infos] = useState(JSON.parse(localStorage.getItem('user_infos')));
  //function to get products data from a back end api
  const getProducts =async () => {
    try {
      let result = await fetch('http://127.0.0.1:8000/api/u_products');
      let products_result = await result.json();
      setProducts_stock1(products_result);
    } catch (error) {
      console.error('there is an error:' + error);
    }
  };
  useEffect(() => {
    getProducts()
  }, []);
  //to set data in products array
  useEffect(() => {
    setProducts(products_stock1)
  }, [products_stock1]);
  return (
    <>
          <UserNav/>
      <div className="min-h-screen bg-slate-100">
        <div className="container mx-auto py-2 px-4 ">
          <div className="grid grid-cols-4 gap-2">
            {
              products.map(({ id, name, image, description, price }, index) => {
                return (
                  <UCard
                    key={index}
                    img={image}
                    name={name}
                    price={price}
                    desc={description}
                    id={id}
                  />
                )
              })
            }
          </div>
        </div>
      </div>

    </>
  );
}

export default UProducts;
