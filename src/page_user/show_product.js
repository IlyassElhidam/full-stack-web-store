import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserNav from '../components/UserNav';
import UCard from '../components/U_Card';
import { FaBagShopping } from 'react-icons/fa6';
// export const showContext= createContext(null);
const ShowProduct = () => {
    const [user_infos, setUser_infos] = useState(JSON.parse(localStorage.getItem('user_infos')));
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});
    const { id } = useParams();
    const [card_item1,setcard_item1]=useState([]);
    //function to get all other products
    const fetch_products = async () => {
        let products_8 = [];
        let i = 0;
        let result = await fetch('http://127.0.0.1:8000/api/products');
        let products = await result.json();
        while (i < 8) {
            products_8.push(products[i]);
            i++;
        };
        setProducts(products_8);
    }
    useEffect(() => {
        fetch_products();
    }, [id]);
    //function to get a single product
    const get_product = async () => {
        let result1 = await fetch('http://127.0.0.1:8000/api/show_product/' + id);
        let product1 = await result1.json();
        setProduct(product1);
    }
    useEffect(() => {
        get_product();
        const IntervalValid1 = setInterval(get_product, 800);
        return () => clearInterval(IntervalValid1);
    }, [id]);
    //add product to card frfom show page
    const add_to_card=async()=>{
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
           console.log('added from show page');
    }
    return (
        <>
            {/* <showContext.Provider value={{card_item1}}> */}
                <UserNav /> 
            {/* </showContext.Provider> */}
            <div className='min-h-screen bg-slate-100'>
                <div className="container mx-auto px-4 py-2">
                    <div className="flex justify-between border-b border-slate-300 pb-6">
                        <div className="w-auto  p-4 ">
                            <div>
                                <img src={'http://127.0.0.1:8000/' + product.image} className='h-96 rounded-lg shadow-md shadow-slate-600' alt="product image" />
                            </div>
                        </div>
                        <div className="w-3/4 px-2 py-4 ">
                            <h5 className="text-3xl text-red-400 font-bold pb-4">${product.price}</h5>
                            <h4 className="text-3xl text-slate-800 font-semibold capitalize pb-4">{product.name}</h4>
                            <p className="w-3/4 text-justify text-md text-slate-600 mb-4">
                                {product.description}
                            </p>
                            <button onClick={add_to_card} className='bg-green-500 duration-300 ease hover:bg-green-400 px-8 py-2 capitalize rounded-md '>
                                <FaBagShopping className=' text-slate-100 text-2xl font-semi-bold' />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="products">
                    <div className="flex justify-center py-4">
                        <h4 className="text-3xl text-center capitalize text-slate-600 font-semibold w-64 pb-4 border-b border-slate-300">other products</h4>
                    </div>
                    <div className="container mx-auto grid grid-cols-4 gap-4 px-4">
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

export default ShowProduct;
