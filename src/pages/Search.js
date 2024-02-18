import React from 'react';
import ProductItem from '../components/Product_item';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { IoSearchOutline } from "react-icons/io5";
import ScrollReveal from 'scrollreveal';

const Search = () => {
    const [search, setSearch] = useState([]);
    const [searchFor, setSearchFor] = useState('');

    const search_now = async (data) => {
        let result = await fetch(`http://127.0.0.1:8000/api/search/${searchFor}`);
        result = await result.json();
        setSearch(result);
        // console.log(result);
    }
    const get_search = () => {
        if (searchFor) {
            search_now(searchFor)
        }
    }
    //scroll reveal code//
  useEffect(() => {
    ScrollReveal({
        reset: true,
        distance:'200px',
        duration:200,
    });
    ScrollReveal().reveal('.box', {origin:'left', delay:300})
  }, []);
    return (
        <>
            <Navbar />
            <div className='bg-slate-200 '>
                <div className="container mx-auto px-16 py-10 min-h-screen">
                    <div className="flex justify-center  mb-6 pb-4 border-b border-slate-300">
                        <div className="box bg-slate-100 w-1/2 border border-slate-400 rounded-xl flex items-center">
                            <input onChange={(e) => { setSearchFor(e.target.value) }} type="text" className='w-80 flex-auto h-12 px-4 rounded-l-xl text-lg font-semibold outline-none' placeholder='search now...' />
                            <button onClick={get_search} className='w-12 bg-slate-300 hover:bg-slate-200 duration-300 h-full text-slate-500 rounded-r-xl  text-xl  flex justify-center items-center '><IoSearchOutline /></button>
                        </div>
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                        {
                            search.map((element) => {
                                return (
                                    <ProductItem
                                        key={element.id}
                                        name={element.name}
                                        image={element.image}
                                        price={element.price}
                                        description={element.description}
                                        product_id={element.id}
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

export default Search;
