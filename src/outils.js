import { AiFillHome } from "react-icons/ai";
import { MdOutlineLocationSearching } from "react-icons/md";
import { MdOutlineAddTask } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { IoSearchOutline } from "react-icons/io5";
import {CiAlignBottom } from 'react-icons/ci'
const icons=[
    {
      id:0,
       icon: <AiFillHome />,
       link:'/products'
    },
     {
      id:1,
        icon: <MdOutlineAddTask />,
        link:'/add'
     },
     {
      id:2,
      icon: <IoSearchOutline />,
      link:'/search'
     },
     {
      id:3,
      icon: <CiAlignBottom/>,
      link:'/'
     },
];
export default icons;