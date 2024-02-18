import CardItem from '../components/Card_item';
import { IoBagCheckOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
const ShopCard = ({ closeUCard, get_new_cards3 }) => {
    const [user_infos, setUser_infos] = useState(JSON.parse(localStorage.getItem('user_infos')));
    const navigate = useNavigate();
    const [cards, setCards] = useState([]);
    const [orders, setOrders] = useState([]);
    const handleUCard = () => {
        closeUCard();
    }
    //function to get products added to card;
    const getCardItems = async () => {
        try {
            let result = await fetch('http://127.0.0.1:8000/api/get_user_card/' + user_infos.id);
            let cardItems = await result.json();
            setCards(cardItems);
        } catch (error) {
            console.error('thereis an error:' + error);
        }
    }
    useEffect(() => {
        getCardItems();
    }, []);
    const getNewCrads1 = () => {
        getCardItems();
        get_new_cards3(cards.splice(1));
    }
 //function to add orders
 const add_order=async()=>{
    let userID=user_infos.id;
    let orders= await fetch('http://127.0.0.1:8000/api/add_orders',{
        method:'POST',
        body:JSON.stringify(userID),
        headers:{
            'Content-Type':'application/json',
            'Accepte':'application/json',
        }
    });
    orders= await orders.json();
    console.log(orders );
 }
    return (
        <div className="fixed min-h-screen border-l-2 drop-shadow border-slate-500 w-1/2 top-0 bottom-0 right-0 z-50">
            <div className="relative w-full h-full bg-slate-300 py-10 overflow-hidden overflow-y-scroll">
                <div onClick={handleUCard} className="absolute top-4 left-2 cursor-pointer w-8 h-8 bg-slate-100 duration-300 ease hover:bg-slate-200 flex justify-center items-center rounded-full text-xl text-slate-700 font-semibold">
                    <span>X</span>
                </div>
                <div className="text-center border-b border-slate-200 pb-2 mb-4">
                    <h5 className='text-slate-600 font-semibold text-2xl'>your products</h5>
                </div>
                <div className="flex justify-center -2 mb-4">
                    <button onClick={add_order} className="flex items-center bg-green-400 px-4 py-2 rounded-md text-slate-100">
                        <span className='text-xl font-semibold pr-2 capitalize'>buy now</span>
                        <button className='font-bold text-2xl'><IoBagCheckOutline /></button>
                    </button>
                </div>
                <div className="px-4">
                    {
                        cards.map(({ id, image, name, price, description,quantity }, index) => {
                            return (
                                <CardItem
                                    key={index}
                                    id={id}
                                    image={image}
                                    name={name}
                                    price={price}
                                    desc={description}
                                    quantity={quantity}
                                    runAfterDelete={getNewCrads1}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default ShopCard;
