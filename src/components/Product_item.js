import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Link, } from 'react-router-dom';
import { GrUpdate } from "react-icons/gr";
import { FaRegImage } from "react-icons/fa6";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdControlCamera } from "react-icons/md";
import ScrollReveal from 'scrollreveal';
const ProductItem = ({ product_id, name, image, price, description,get_after_delete }) => {
   const [modal, setModal] = useState(false);
   //variables used for update items
   const updated_name = useRef();
   const updated_image = useRef();
   const updated_price = useRef();
   const updated_description = useRef();
   //function to update data with api
   const update_product = async (e) => {
      e.preventDefault();
      let formdata = new FormData();
      formdata.append('id', product_id);
      formdata.append('product_name', updated_name.current.value);
      formdata.append('product_image', updated_image.current.files[0]);
      formdata.append('product_price', updated_price.current.value);
      formdata.append('product_description', updated_description.current.value);
      let result = await fetch('http://127.0.0.1:8000/api/edit', {
         method: 'POST',
         body: formdata,
      });
      setModal(!modal);
      window.location.reload();
   };
   const delete_item = async () => {
      let result = await fetch('http://127.0.0.1:8000/api/delete/'+product_id, {
         method: 'delete',
      });
      get_after_delete();
   }

   return (
      <div className="group overflow-hidden">
         <div className='bg-white cursor-pointer relative '>
            <div className="text-center z-40  p-2">
               <img src={"http://127.0.0.1:8000/" + image} className='block w-full h-52 rounded-md' />
            </div>
            <div className="px-2">
               <div className=" flex justify-between">
                  <h4 className='text-xl font-semibold text-red-700'>${price}</h4>
                  <p className='text-slate-800 capitalize text-md font-semibold'>{name}</p>
               </div>
               <div className='text-justify text-slate-500 text-sm'>
                  {(description.length > 32) ? description.substring(0, 25) + '...' : description}
               </div>
            </div>
            <div className="absolute w-full bg-black/5 h-full duration-200 ease-in  -bottom-10 opacity-0 group-hover:bottom-0 group-hover:opacity-100  ">
               <div className="flex justify-between items-end  min-h-full p-2 ">
                  <div onClick={() => { setModal(!modal) }} className=" w-16  h-12 rounded font-bold text-white capitalize bg-green-300 flex justify-center items-center"><GrUpdate className='text-green-600 font-bold text-2xl' /></div>
                  <Link to={`/show/${product_id}`}>
                     <div className="w-16 h-12 rounded font-bold text-white capitalize bg-sky-300 flex justify-center items-center"><MdControlCamera className='text-sky-600 font-bold text-3xl' /></div>
                  </Link>
                  <div onClick={delete_item} className="w-16 h-12 rounded font-bold text-white capitalize bg-red-300 flex justify-center items-center"><RiDeleteBin6Fill className='text-red-600 font-bold text-2xl' /></div>
               </div>
            </div>

         </div>
         {/* the code to custume the update part */}
         {modal && (
            <div className="fixed inset-0 bg-black/10 grid place-items-center z-40">
               <div className="relative bg-slate-200 w-3/5 px-4 py-4 rounded-md drop-shadow-md">
                  <div className="absolute right-2 top-2">
                     <IoMdCloseCircleOutline onClick={() => { setModal(!modal) }} className='text-3xl text-sky-500 font-bold cursor-pointer' />
                  </div>
                  <form>
                     <div className="form_container space-y-4 ">
                        <div className="w-full  text-center mb-6 pb-4 border-b border-slate-300">
                           <h3 className='text-2xl font-bold capitalize'>update  product</h3>
                        </div>
                        <div className="flex justify-between gap-y-2 ">
                           <div className="w-1/2  ">
                              <div className="h-80">
                                 <img src={"http://127.0.0.1:8000/" + image} alt="product image" className='inline-block w-full h-full  rounded' />
                              </div>
                           </div>
                           <div className="w-1/2 flex flex-col justify-between">
                              <div className="w-full px-2 ">
                                 <input ref={updated_name} defaultValue={name} className='w-full  h-12 px-2 text-lg placeholder:capitalize outline-none rounded shadow duration-300 ease-in hover:shadow-sky-500  ' type="text" placeholder='enter product name' />
                              </div>
                              <div className="w-full px-2">
                                 <label htmlFor="image" className=' flex items-center bg-white min-w-full h-12 px-2 text-lg placeholder:capitalize outline-none rounded shadow duration-300 ease-in hover:shadow-sky-500  '>
                                    < input ref={updated_image} type="file" id='image' className='hidden' />
                                    <FaRegImage className='text-sky-500 text-3xl font-bold' />
                                 </label>
                              </div>
                              <div className="w-full px-2">
                                 < input ref={updated_price} defaultValue={price} className='w-full h-12 px-2 text-lg placeholder:capitalize outline-none rounded shadow duration-300 ease-in hover:shadow-sky-500  ' type="text" placeholder='enter product description' />
                              </div>
                              <div className="w-full px-2">
                                 <  input ref={updated_description} defaultValue={description} className='w-full h-12 px-2 text-lg placeholder:capitalize outline-none rounded shadow duration-300 ease-in hover:shadow-sky-500  ' type="text" placeholder='enter product price' />
                              </div>
                              <div className="w-full">
                                 <button onClick={update_product} className='bg-sky-500 text-white capitalize rounded px-12 py-2 font-semibold text-lg '>go</button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         )}
      </div>
   );
}

export default ProductItem;
