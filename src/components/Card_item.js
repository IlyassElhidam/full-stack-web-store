import React, { useState, useEffect } from 'react';
import { RiDeleteBin6Fill } from "react-icons/ri";
const CardItem = ({ image, name, price, desc, quantity, id, runAfterDelete }) => {
    const deleteCard = async () => {
        let result = await fetch('http://127.0.0.1:8000/api/delete_card/' + id, {
            method: 'DELETE',
        });
        runAfterDelete();
    }
    //functio to update a product quantity
    const update_qtt = async (e) => {
        try {
            let quantity1=e.target.value;
            let formdata = new FormData();
            formdata.append('id', id);
            formdata.append('quantity', quantity1);
            await fetch('http://127.0.0.1:8000/api/update_card_qtt', {
                method: 'POST',
                body: formdata,
            }
            )
        }catch(error){
            console.error('error in update qtt fnction'+error);
        }
    }
    return (
        <>
            <div className="flex items-center bg-slate-100 rounded-md mb-1 p-2 gap-2">
                <div className=" w-1/4 max-h-36   overflow-hidden">
                    <img className='w-full h-36 rounded-md shadow shadow-slate-700' src={'http://127.0.0.1:8000/' + image} alt="product image" />
                </div>
                <div className=" w-3/4">
                    <h5 className="text-xl text-red-600 font-bold">${price}</h5>
                    <h4 className="text-xl text-slate-600 font-semibold">{name}</h4>
                    <p className=" text-slate-900 w-3/4 py-2">
                        {desc}
                    </p>
                    <div className="flex justify-between ">
                        <div>
                            <input onChange={update_qtt} className='outline-none  text-slate-700 text-3xl bg-slate-300 rounded-md px-2 w-32 border border-slate-400  ' type="number" defaultValue={parseInt(quantity)} />
                        </div>
                        <div onClick={deleteCard} className='pr-4 flex items-center cursor-pointer text-orange-400 text-2xl '>
                            <RiDeleteBin6Fill />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CardItem;
