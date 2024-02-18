import React, { useState,useEffect } from 'react';
import { FaBagShopping } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import ScrollReveal from 'scrollreveal';
const UCard = ({ img, name, desc, price, id }) => {
    const [user_infos,setUser_infos]=useState(JSON.parse(localStorage.getItem('user_infos')));
    const add_to_card = async() => {
        let userID=user_infos.id;
        let productID=id;
        let card_items={productID,userID};
           let result= await fetch('http://127.0.0.1:8000/api/addCard',{
             method:'POST',
             body:JSON.stringify(card_items),
             headers:{
                'Content-Type':'application/json',
                'Accepted':'application/json',
             }
           });
           let is_succes= await result.json();
           //to run get cards function;
    }
    //scroll reveal code//
   useEffect(() => {
    ScrollReveal({
      reset: true,
      distance: '80px',
      duration: 2000,
      delay:'200'
     });
     ScrollReveal().reveal('.productItem',{origin: 'left',easing:'ease-in-out'});
   }, []);
    return (
        <>
            <div className='drop-shadow p-4 productItem'>
                <div className="relative bg-slate-200 p-2">
                    <Link to={'/show_product/' + id}>
                        <div className="overflow-hidden max-h-52 mb-2">
                            <img src={"http://127.0.0.1:8000/" + img} className='w-full h-52 rounded-md' alt="product image" />
                        </div>
                    </Link>
                    <div className="cart_content">
                        <div className='absolute top-0 right-0 bg-orange-500 text-white text-xl font-bold p-2 rounded-md'>${price}</div>
                        <div className="flex justify-between items-center ">
                            <h5 className="text-xl font-semibold text-slate-700 capitalize underline">{name}</h5>
                            <div onClick={add_to_card} className='cursor-pointer '> <FaBagShopping className='text-3xl font-semibold duration-300 ease text-orange-400 hover:text-orange-300' /> </div>
                        </div>
                        <p className="text-md text-slate-600">
                            {
                               
                                (desc.length>36)? desc.substring(0,30)+'...' : desc
                               
                            }
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
};
export default UCard;
