
import React from 'react';
import { FaRegImage } from "react-icons/fa6";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdDownloadDone } from "react-icons/md";
import Navbar from '../components/Navbar';
const Add = () => {
   let [tranlation, setTranlation] = useState();
   const [bg_color, setBg_color] = useState('');
   const [product_name, setProduct_name] = useState('');
   const [product_image, setProduct_image] = useState('');
   const [product_price, setProduct_price] = useState('');
   const [product_description, setProduct_description] = useState('');
   const [user_infos, setUser_infos] = useState(JSON.parse(localStorage.getItem('user_infos')));
   const navigate = useNavigate();
   const styling = {
      transform: `translateX(${tranlation}px)`,
      backgroundColor: bg_color,
   }
   //use useEffect to getout any user that not have already an accoiunt
   useEffect(() => {
      if (!user_infos) {
         navigate('/login');
      }
   }, []);
   //create a function to send get and send data to backend api
   const getProduct = async (e) => {
      e.preventDefault();
      let formdata = new FormData();
      formdata.append('name', product_name);
      formdata.append('image', product_image);
      formdata.append('price', product_price);
      formdata.append('description', product_description);
      let result = await fetch('http://127.0.0.1:8000/api/add', {
         method: 'POST',
         body: formdata,
      });
      navigate('/products');
   }
   //move add button
   let trans;
   useEffect(() => {
      if (product_description.length > 10) {
         setTranlation(0);
         setBg_color('')
      }
   }, [product_description]);
   const move_btn = (e) => {
      if (product_description.length > 10) {
         trans = 0;
      }
      else if (product_description.length < 10) {
         if (trans == 0) {
            trans = 600;
         }
         else {
            trans = 0;
         }
         setBg_color('red');
      }
      setTranlation(trans);
   }
   return (
      <>
         <Navbar />
         <div className='relative bg-slate-100 min-h-screen flex justify-center items-center'>
            <div className="bg-slate-200 w-3/5 px-4 py-4 rounded-md drop-shadow-md">
               <form>
                  <div className="form_container space-y-4">
                     <div className="w-full text-center mb-6 pb-4 border-b border-slate-300">
                        <h3 className='text-2xl font-bold capitalize'>add product now</h3>
                     </div>
                     <div className="w-full">
                        < input onChange={(e) => { setProduct_name(e.target.value) }} className='w-full h-12 px-2 text-lg placeholder:capitalize outline-none rounded shadow duration-300 ease-in hover:shadow-sky-500  ' type="text" placeholder='enter product name' />
                     </div>
                     <div className="w-full">
                        <label htmlFor="image" className=' flex items-center bg-white min-w-full h-12 px-2 text-lg placeholder:capitalize outline-none rounded shadow duration-300 ease-in hover:shadow-sky-500  '>
                           < input onChange={(e) => { setProduct_image(e.target.files[0]) }} id='image' className='hidden' type="file" />
                           <FaRegImage className='text-sky-500 text-3xl font-bold' />
                        </label>
                     </div>
                     <div className="w-full">
                        < input onChange={(e) => { setProduct_price(e.target.value) }} className='w-full h-12 px-2 text-lg placeholder:capitalize outline-none rounded shadow duration-300 ease-in hover:shadow-sky-500  ' type="text" placeholder='enter product price' />
                     </div>
                     <div className="w-full">
                        < input onChange={(e) => { setProduct_description(e.target.value) }} className='w-full h-12 px-2 text-lg placeholder:capitalize outline-none rounded shadow duration-300 ease-in hover:shadow-sky-500  ' type="text" placeholder='enter product description' />
                     </div>
                     <div className="w-full ">
                        <button onMouseOver={move_btn} onClick={getProduct} className=' bg-sky-500 text-white capitalize rounded px-12 py-2 font-semibold text-lg duration-75 ease ' style={styling}><MdDownloadDone className='text-white font-semibold text-2xl' /></button>
                     </div>
                  </div>
               </form>
            </div>
         </div>
      </>
   );
}

export default Add;
