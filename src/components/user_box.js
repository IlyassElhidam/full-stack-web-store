import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPowerOff } from "react-icons/fa6";

const UserBox = ({ email, name, userBox }) => {
    const navigate = useNavigate();
    const getOff = () => {
        localStorage.clear();
        navigate('/login');
    }
    return (
        <>
            {userBox && (
                <div
                    className=' absolute top-full right-0 bg-white shadow shadow-slate-700 rounded px-4 py-2 duration-300 ease origin-top-right'
                    style={{
                        transform: (userBox ? 'scale(1)' : 'scale(0)'),
                        opacity: (userBox ? '1' : '0')
                    }}
                >
                    <div className="user-infos">
                        <div className='flex items-end mb-1 capitalize'>
                            <span className='mx-2 font-semibold text-slate-700  text-lg'>email:</span>
                            <p className='text-slate-500 text-md '>{email}</p>
                        </div>
                        <div className='flex  items-end mb-1 pb-2 border-b capitalize border-slate-200'>
                            <span className='mx-2 font-bold text-slate-700  text-lg'>function:</span>
                            <p className='text-slate-500 text-md '>{name}</p>
                        </div>
                        <div className="text-center">
                            <button onClick={getOff} className='bg-red-400 px-6 py-2 rounded text-white'><FaPowerOff /></button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default UserBox;
