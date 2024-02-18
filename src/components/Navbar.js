import React, { useCallback, useMemo } from 'react';
import { FaRegCircleUser } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { FaPowerOff } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UserBox from '../components/user_box';

import outils from '../outils';
import Search from '../pages/Search';
const Navbar = (props) => {
  const [ser, setSer] = useState('');
  const [user_info, setUser_info] = useState(JSON.parse(localStorage.getItem('user_infos')));
  const [user_box, setUser_box] = useState(false);
  const navigate = useNavigate();
  //function to getoout
  const getOff = () => {
    localStorage.clear();
    navigate('/login');
  }
  const HandlData = (e) => {
    setSer(e.target.value);
    props.to_search(ser);
  }
  return (
    <>
      <div className="fixed w-28 inset-y-0 right-0  z-40 ">
        <div className="flex justify-center items-center flex-col gap-y-8 min-h-full">
          {

            outils.map((element) => {
              return (
                <Link key={element.id} to={element.link}>
                  <div className="w-12 h-12  flex justify-center items-center text-3xl  cursor-pointer font-bold rounded-full text-white  bg-sky-400 hover:bg-sky-300 duration-300 ease">{element.icon}</div>
                </Link>
              )
            })

          }
          <div onClick={() => { setUser_box(!user_box) }} className="relative w-12 h-12  flex justify-center items-center   cursor-pointer font-bold rounded-full text-white  bg-sky-400 hover:bg-sky-300 duration-300 ease flex justify-end z-50">
            <button className=' cursor-pointer text-white text-2xl font-semibold ' >
              <FaRegCircleUser />
            </button >
            <UserBox
              userBox={user_box}
              email={user_info.email}
              name={user_info.name}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar;
