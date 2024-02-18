import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaAngleRight } from "react-icons/fa6";
import { IoChevronDown } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { GrUserAdmin } from "react-icons/gr"
const Signup = () => {
   const [name, setname] = useState('');
   const [phone, setphone] = useState('');
   const [email, setemail] = useState('');
   const [password, setpassword] = useState('');
   const [option, setOption] = useState('');
   const [showOption, setshowOption] = useState(false);
   const navigate = useNavigate();
   //create function to send data to database with api
   const getSignup = async (e) => {
      e.preventDefault();
      let items = { name, phone, email, password, option };
      let result = await fetch('http://127.0.0.1:8000/api/signup', {
         method: 'POST',
         body: JSON.stringify(items),
         headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
         }
      });
      result = await result.json();
      if (result.status === 'succes') {
         localStorage.setItem('user_infos', JSON.stringify(result.user_infos));
         if (result.user_infos.user_type == 'admin') {
            navigate('/add');
         }
         else {
            navigate('/fadream_products');
         }
      }
      else if (result.status === 'failed') {
         console.log('failed');
      }
   }
   return (
      <>
         <div className='bg-slate-100 min-h-screen flex justify-center items-center'>
            <div className="bg-slate-200 w-2/5 px-4 py-4 rounded-md drop-shadow-md">
               <form>
                  <div className="form_container space-y-4">
                     <div className="w-full text-center mb-6 pb-4 border-b border-slate-300">
                        <h3 className='text-2xl font-bold capitalize'>sigup now</h3>
                     </div>
                     <div className="w-full">
                        < input onChange={(e) => { setname(e.target.value) }} className='w-full h-12 px-2 text-lg placeholder:capitalize outline-none rounded shadow duration-300 ease-in hover:shadow-sky-500  ' type="text" placeholder='enter your name' />
                     </div>
                     <div className="w-full">
                        < input onChange={(e) => { setphone(e.target.value) }} className='w-full h-12 px-2 text-lg placeholder:capitalize outline-none rounded shadow duration-300 ease-in hover:shadow-sky-500  ' type="text" placeholder='enter your phone' />
                     </div>
                     <div className="w-full">
                        < input onChange={(e) => { setemail(e.target.value) }} className='w-full h-12 px-2 text-lg placeholder:capitalize outline-none rounded shadow duration-300 ease-in hover:shadow-sky-500  ' type="text" placeholder='enter your email' />
                     </div>
                     <div className="w-full">
                        < input onChange={(e) => { setpassword(e.target.value) }} className='w-full h-12 px-2 text-lg placeholder:capitalize outline-none rounded shadow duration-300 ease-in hover:shadow-sky-500 ' type="password" placeholder='enter your password' />
                     </div>
                     <div className="relative rounded-md bg-white w-full h-12 px-2 text-lg placeholder:capitalize outline-none rounded shadow duration-300 ease-in hover:shadow-sky-500 ">
                        <input type="text" placeholder='select' defaultValue={option} className='absolute pointer-events-none  rounded inset-0 px-4 w-full h-full border-none outline-none' />
                        <div style={{
                           visibility: showOption ? 'visible' : 'hidden'
                        }} className=" absolute grid grid-cols-1  bg-slate-300 right-0 left-0 top-full ">
                           <div
                              onClick={() => {
                                 setOption('user');
                                 setshowOption(!showOption)
                              }}
                              className='flex items-center gap-2 bg-slate-300 border-b border-slate-500 px-4 py-2 text-md text-slate-700 capitalize duration-300 ease cursor-pointer hover:bg-slate-300 '>
                              <div className="icon"><CiUser /></div>
                              <p className="opion">user</p>
                           </div>
                           <div
                              onClick={() => {
                                 setOption('admin');
                                 setshowOption(!showOption);
                              }}
                              className='flex items-center gap-2 bg-slate-300 border-bottom border-slate-200 px-4 py-2 text-md text-slate-700 capitalize duration-300 ease cursor-pointer hover:bg-slate-300 '>
                              <div className="icon"><GrUserAdmin /></div>
                              <p className="opion">admin</p>
                           </div>
                        </div>
                        <div onClick={() => setshowOption(!showOption)} className="absolute cursor-pointer right-0 top-0 bottom-0 h-full w-12 bg-slate-300 grid place-items-center">
                           <FaAngleRight
                              style={{
                                 display: showOption ? 'none' : 'block'
                              }}
                              className='text-slate-700 text-2xl' />
                           <IoChevronDown
                              style={{
                                 display: showOption ? 'block' : 'none'
                              }}
                              className='text-slate-700 text-2xl' />
                        </div>
                     </div>
                     <div className="w-full flex justify-between">
                        <button onClick={getSignup} className='bg-sky-500 text-white capitalize rounded px-12 py-2 font-semibold text-lg '>go</button>
                        <Link to={'/login'}>
                           <div className='text-slate-700 font-semibold '>you ahave already an account? <span className='text-sky-500 capitalize'>login</span>.</div>
                        </Link>
                     </div>
                  </div>
               </form>
            </div>
         </div>
      </>
   );
}
export default Signup;
