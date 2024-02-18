import React, { useMemo } from 'react';
import ProductItem from '../components/Product_item';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
const Products = () => {
  let [products, setProducts] = useState([]);
  let [products_stock, setProducts_stock] = useState([]);
  //function to fetch data from api backend

  const getProduct1 = async () => {
    let result = await fetch('http://127.0.0.1:8000/api/u_products');
    let products_infos = await result.json();
    setProducts_stock(products_infos);
  };
  useEffect(()=>{
    getProduct1();  
  },[]);
  //function to get data after delete product
  const getAfterDelete=()=>{
     getProduct1();
  }
  useEffect(() => {
    setProducts(products_stock);
  }, [products_stock]);
//scroll reveal code//
   useEffect(() => {
    ScrollReveal({
      reset: true,
      distance: '80px',
      duration: 200,
     });
     ScrollReveal().reveal('.sub_title',{origin: 'left',delay:250});
   }, []);
  return (
    <>
      <Navbar />
      <div className=" bg-slate-200 ">
        <div className="container mx-auto px-12 min-h-screen text-center pt-10">
          <div className="flex justify-center  mb-6 pb-4 border-b border-slate-300">
            <h4 className="text-2xl font-semibold capitalize text-slate-700 sub_title">
              all products
            </h4>
          </div>
          <div className="z-10 grid grid-cols-5 gap-4 pr-14 pb-6 ">
            {
              products.map((element) => {
                return (
                  <ProductItem
                    key={element.id}
                    name={element.name}
                    image={element.image}
                    price={element.price}
                    description={element.description}
                    product_id={element.id}
                    get_after_delete={getAfterDelete}
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

export default Products;
