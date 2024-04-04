import { NavLink } from "react-router-dom";
//import { useAuth0 } from "@auth0/auth0-react";
import "./Navbar.css";
import { useAuth } from "../store/auth";

export const Navbar = () => {

  const { isLoggedIn } = useAuth();
  // const { loginWithRedirect } = useAuth0();
  return (
    <>
      <header>
        <div className="container">
          <div className="logo-brand">
            <NavLink to="/">AkshayTechnical</NavLink>
          </div>

          <nav>
            <ul>
              <li>
                <NavLink to="/"> Home </NavLink>
              </li>
              <li>
                <NavLink to="/about"> About </NavLink>
              </li>
              <li>
                <NavLink to="/service"> Services </NavLink>
              </li>
              <li>
                <NavLink to="/contact"> Contact </NavLink>
              </li>
              {isLoggedIn ? (<li> <NavLink to="/logout">Logout</NavLink></li>
              ) : (<>
                <li><NavLink to="/register"> Register </NavLink></li>

                <li><NavLink to="/login"> Login </NavLink></li>
              {/* return <button onClick={() => loginWithRedirect()}>Log In</button>; */}
              </>)}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};