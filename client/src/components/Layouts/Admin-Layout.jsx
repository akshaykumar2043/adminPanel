import { NavLink ,Outlet } from "react-router-dom"
import { FaUser, } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { FcServices } from "react-icons/fc";
import { IoMdHome } from "react-icons/io";

export const AdminLayout = () => {
    return <>
         <header>
            <div className="container">
                <nav>
                  <ul>
                    <li>
                       <NavLink to="/admin/users">
                        <FaUser />users</NavLink> 
                    </li>
                    <li>
                    <NavLink to="/admin/contacts">
                        <IoMdContact />Contact</NavLink>
                    </li>
                    <li>
                    <NavLink to="/service">
                    <FcServices />Services</NavLink>
                    </li>
                    <li><NavLink to="/">
                    <IoMdHome />Home</NavLink></li>
                    </ul>  
                </nav>
            </div>
         </header>
         <Outlet/>
    </>
}