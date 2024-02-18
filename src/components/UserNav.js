import React, { useEffect, useState,useMemo,useContext, useCallback} from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import { GoHome } from 'react-icons/go';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { MdShoppingCart } from 'react-icons/md';
import ShopCard from '../page_user/Shop_card';
import UserBox from '../components/user_box';
const UserNav = () => {
    const [user_infos, setUser_infos] = useState(JSON.parse(localStorage.getItem('user_infos')));
    const [search_val, setSearch_val] = useState('');
    const [show_cart, setShow_cart] = useState(false);
    const [cardsNumber, setCardBumber] = useState([]);
    const [user_box, setUser_box] = useState(false);
    const navigate = useNavigate();
    const { s_val } = useParams();
    // const {card_item1}=useContext(showContext);
    const Navigate = () => {
        navigate('/U_search/' + search_val);
    };
    //set search_val when s_val chnage in the url
    useEffect(() => {
        setSearch_val(s_val);
    }, [s_val]);
    //func to close user card
    const closeU_Card = () => {
        setShow_cart(!show_cart);
    }
    //run this function to get card items o show to user how mush products in his card
    const getUserCrad = useMemo(async () => {
        let result = await fetch('http://127.0.0.1:8000/api/get_user_card/' + user_infos.id);
        let cardItems = await result.json();
        setCardBumber(cardItems);
    }, []);
    //function to set cards number from delete products
    const getNewCrdas3 = (card) => {
        setCardBumber(card);
    };
    return (
        <div className='sticky top-0 left-0 right-0 z-50 max-w-full bg-slate-100  border-b border-slate-200 drop-shadow  '>
            <div className=' container mx-auto flex justify-between items-center'>
                <div className='max-h-20 overflow-hidden flex items-center'>
                    <div>
                        <img src="../images/logo1.png" className='inline-block' alt="logo" width={150} />
                    </div>
                </div>
                <div className="w-1/2 flex items-center">
                    <div className='flex-auto'>
                        <input type="text" onChange={(e) => { setSearch_val(e.target.value) }} value={search_val} className='block bg-slate-200 w-full h-12 px-4 text-lg font-semibold rounded-l-xl outline-none ' placeholder='search now...' />
                    </div>
                    <div onClick={Navigate} className='w-12 h-12 bg-slate-300 rounded-r-xl grid place-items-center'>
                        <IoSearchOutline className='font-bold text-2xl text-slate-900 cursor-pointer' />
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Link to={'/fadream_products'}>
                        <div className="w-12 h-12 bg-slate-300 ease duration-300 hover:bg-slate-400 rounded-full grid place-items-center cursor-pointer">
                            <GoHome className='text-2xl font-semibold text-slate-600' />
                        </div>
                    </Link>
                    <div onClick={() => { setShow_cart(!show_cart) }} className="relative w-12 h-12 bg-slate-300 ease duration-300 hover:bg-slate-400 rounded-full grid place-items-center cursor-pointer">
                        <MdShoppingCart className='text-2xl font-semibold text-slate-600' />
                        <div className='absolute top-0 -right-3 w-6 h-6 rounded-full bg-orange-500 flex justify-center items-center'>
                            <span className=' text-white'>{cardsNumber.length}</span>
                        </div>
                    </div>
                    <div onClick={() => { setUser_box(!user_box) }} className="relative w-12 h-12 bg-slate-300 ease duration-300 hover:bg-slate-400 rounded-full grid place-items-center cursor-pointer">
                        <FaRegCircleUser className='text-2xl font-semibold text-slate-600' />
                        <UserBox
                            userBox={user_box}
                            email={user_infos.email}
                            name={user_infos.name}
                        />
                    </div>
                </div>
                {show_cart && (
                    <ShopCard
                        closeUCard={closeU_Card}
                        get_new_cards3={getNewCrdas3}
                    />
                )}
            </div>
        </div>
    );
}

export default UserNav;

