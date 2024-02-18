import React from 'react';
import './dash_itm.css';
const DashboardItem = ({key1,value}) => {
    return (
        <>
            <div className=" dash_item bg-transparent  border border-slate-300 rounded h-36 leading-36 flex justify-center items-center">
                <div className='flex  gap-2 text-slate-500   text-3xl'>
                    <p className="font-bold   capitalize">{key1}</p>
                    {':'}
                    <h4 className="text-green-400 text-bold">
                        {value}
                    </h4>
                </div>
            </div>
        </>
    );
}

export default DashboardItem;
