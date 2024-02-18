import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
   const [email, setemail]= useState('');
   const [password, setpassword]= useState('');
   const navigate= useNavigate();
   
   //create function to send data to epi backend to get login
   const getLogin= async(e)=>{
      e.preventDefault();
      let items= {email,password};
       let result= await fetch('http://127.0.0.1:8000/api/login', {
        method:'POST',
        body:JSON.stringify(items),
        headers:{
         'Content-Type':'application/json',
         'Accept':'application/json',
        }
       }); 
       result= await result.json();
       if(result.status=== 'succes'){
         localStorage.setItem('user_infos', JSON.stringify(result.user_infos));
         navigate('/add');  
       }
       else if(result.status=== 'failed'){
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
                                 <h3 className='text-2xl  font-bold capitalize'>login now</h3>
                             </div>
                             <div className="w-full">
                                < input onChange={(e)=>{setemail(e.target.value)}} className='w-full h-12 px-2 text-lg placeholder:capitalize outline-none rounded shadow duration-300 ease-in hover:shadow-sky-500  ' type="text" placeholder='enter your email' />
                             </div>
                             <div className="w-full">
                                < input onChange={(e)=>{setpassword(e.target.value)}} className='w-full h-12 px-2 text-lg placeholder:capitalize outline-none rounded shadow duration-300 ease-in hover:shadow-sky-500  ' type="password" placeholder='enter your password' />
                             </div>
                             <div className="w-full flex justify-between">
                                <button onClick={getLogin} className='bg-sky-500 text-white capitalize rounded px-12 py-2 font-semibold text-lg '>go</button>
                                <Link to={'/signup'}>
                                   <div className='text-slate-700 font-semibold '>you have an account? <span className='text-sky-500 capitalize'>signup</span>.</div>
                                </Link>
                             </div>
                       </div>
                 </form>
              </div>
          </div>
        </>
    );
}

export default Login;
