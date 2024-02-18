import React from 'react';

const ProductSearch = () => {
    return (
        <div className='bg-white p-2 flex '>
            <div className="text-center p-2">
                <img src="/images/logo.png" className='w-full object-cover' />
            </div>
            <div className="px-2">
                <div className=" flex justify-between">
                    <h4 className='text-xl font-semibold text-red-700'>$400</h4>
                    <p className='text-slate-800 capitalize text-xl font-semibold'>mercedes 220</p>
                </div>
                <div className='text-justify text-slate-500 text-sm'>
                    mercedes class 220 is one of the vars the i love so much tahn others car around the world.
                </div>
            </div>
        </div>
    );
}

export default ProductSearch;
