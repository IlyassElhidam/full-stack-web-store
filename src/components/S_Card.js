import React from 'react';
import { FaBagShopping } from 'react-icons/fa6';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const SCard = ({ price, name, desc, img, id }) => {
    const [user_infos, setUser_infos] = useState(JSON.parse(localStorage.getItem('user_infos')));
    //function to add product to card
    const addToCard = async () => {
        let userID = user_infos.id;
        let productID = id;
        let card_items = { productID, userID };
        let result = await fetch('http://127.0.0.1:8000/api/addCard', {
            method: 'POST',
            body: JSON.stringify(card_items),
            headers: {
                'Content-Type': 'application/json',
                'Accepted': 'application/json',
            }
        });
        let is_succes = await result.json();
        console.log('added from show page');
    }
    return (
        <Link to={'/show_product/'+id}>
            <div className='mb-2 bg-slate-300 rounded-md'>
                <div className=" flex gap-4 p-2">
                    <div className="image">
                        <img className='h-52 w-52 rounded-md drop-shadow shadow-slate-600' src={'http://127.0.0.1:8000/' + img} alt="product image" width={300} />
                    </div>
                    <div className="text">
                        <h5 className="text-3xl text-red-600 font-bold">${price}</h5>
                        <h4 className="py-4 text-xl text-slate-600 font-semibold">{name}</h4>
                        <p className="pb-4 text-slate-900 text-lg w-3/4">
                            {desc}
                        </p>
                        <div onClick={addToCard} className="cursor-pointer text-3xl text-orange-400">
                            <FaBagShopping />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
export default SCard;
