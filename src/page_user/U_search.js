import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserNav from '../components/UserNav';
import SCard from '../components/S_Card';

const USearch = () => {
    const { s_val } = useParams();
    const [s_products, setS_products] = useState([]);
    const search_products = async () => {
        let result = await fetch('http://127.0.0.1:8000/api/serach_val/'+s_val.toLowerCase());
        let s_products = await result.json();
        setS_products(s_products);
    }
    useEffect(() => {
        search_products();
    }, [s_val]);
    return (
        <>
            <UserNav s_val={s_val} />
            <div className="bg-slate-100 min-h-screen">
                <div className="container mx-auto py-2 px-4 gap-2">
                    {
                        s_products.map(({ id,price, name, description, image }, index) => {
                          return  <SCard
                                key={index}
                                id={id}
                                price={price}
                                name={name}
                                desc={description}
                                img={image}
                            />
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default USearch;
