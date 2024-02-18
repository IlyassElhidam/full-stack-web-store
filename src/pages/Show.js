import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
const Show = () => {
  const [show_product, setShow_product]= useState([]);
  let {id}= useParams();
  useEffect(()=>{
    product(id);
  },[id]);
  const product=async (product_id)=>{
     let result= await fetch(`http://127.0.0.1:8000/api/show/${product_id}`);
     let products_infos= await result.json();
     setShow_product(products_infos);
  }
    
    return (
        <>
        <Navbar show_navbar={false}/>
          <div className="bg-slate-100 min-h-screen">
              <div className="container mx-auto min-h-screen px-32 py-12">
                  <div className="flex gap-x-4 h-96 px-4 py-6 bg-white shadow shadow-slate-500 rounded">
                      <div className="min-h-full w-2/5">
                          <img src={"http://127.0.0.1:8000/"+show_product.image} className='h-full rounded-xl shadow shadow-slate-800' alt="product image" />
                      </div>
                      <div className="w-3/5 ">
                         <div className="flex justify-between mb-6">
                            <div className="text-3xl text-red-400 font-bold">${show_product.price}</div>
                            <div className="text-3xl text-green-400 font-semibold capitalize">{show_product.name}</div>
                         </div>
                         <div className="bg-slate-200 px-2 py-4 rounded h-56">
                           <p className="text-slate-600 text-lg text-justify ">{show_product.description}</p>
                         </div>
                      </div>
                  </div>
              </div>
          </div>
        </>
    );
}

export default Show;
