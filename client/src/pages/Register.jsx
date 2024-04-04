import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
// import { useAuth0 } from "@auth0/auth0-react";
import { useGoogleLogin } from '@react-oauth/google';
// import { jwtDecode } from "jwt-decode";
import axios from "axios";

const URL = "http://localhost:5000/api/register";
export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    // confirmPassword:"",
  });
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }, //tokenResponse => console.log(tokenResponse),
  });


  // const { loginWithRedirect } = useAuth0();
  const { storeTokenInls } = useAuth();

  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    console.log(name);
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // handle form on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();
      console.log("res from server", res_data.extraDetails);
      if (response.ok) {

        storeTokenInls(res_data.token);
        setUser({ username: "", email: "", phone: "", password: "" });
        toast.success("Registration successful");
        navigate("/");

      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }

    } catch (error) {
      console.log("register", error);
    }
  };



  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
                <img
                  src="/images/register.png"
                  alt="a nurse with a cute look"
                  width="400"
                  height="500"
                />
              </div>
              {/* our main registration code  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3"><b>Registration</b></h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">username</label>
                    <input
                      type="text"
                      name="username"
                      value={user.username}
                      onChange={handleInput}
                      placeholder="Type your username"
                    />
                  </div>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="Type your email"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">phone</label>
                    <input
                      type="number"
                      name="phone"
                      value={user.phone}
                      onChange={handleInput}
                      placeholder="Type your phone"
                    />
                  </div>
                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="Type your password"
                    />
                  </div>
                  {/* <div>
                    <label htmlFor="confirmPassword">confirmPassword</label>
                    <input
                      type="confirmPassword"
                      name="confirmPassword"
                      value={user.confirmPassword}
                      onChange={handleInput}
                      placeholder="Type your confirmPassword"
                    />
                  </div> */}
                  <br />
                  <button type="submit" className="btn secondary-btn">

                    <b>Register</b>
                  </button>
                  {/* <li><button type="submit" className="btn secondary-btn" onClick={() => loginWithRedirect()}>Register with google</button>; 
                 </li> */}


                  {/* <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      var credentialResponseDecoded=jwtDecode(credentialResponse.credential)
                      console.log(credentialResponseDecoded);
                    }}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                  />; */}




                </form> <button className="btn secondary-btn" onClick={() => login()}>Sign in with Google </button>

              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};