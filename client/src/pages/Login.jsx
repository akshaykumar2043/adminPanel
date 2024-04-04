import { useState } from "react";
import { useNavigate } from "react-router-dom";
import  {useAuth}  from "../store/auth.jsx";
import { toast } from "react-toastify";

const URL = "http://localhost:5000/api/login";

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  //store token in local 
  const { storeTokenInls } = useAuth();



  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // handle form on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      console.log("login form", response);
      const res_data = await response.json();
      if (response.ok) {
       
        // local store token
        storeTokenInls(res_data.token);
        setUser({ email: "", password: "" });
        toast.success("Login successful");
        navigate("/");
       
      }
      else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
        console.log("invalid credential");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section>
        <main>
          <div className="section-login">
            <div className="container grid grid-two-cols">
              <div className="login-image reg-img">
                <img
                  src="/images/login.png"
                  alt="a nurse with a cute look"
                  width="400"
                  height="500"
                />
              </div>
              {/* our main registration code  */}
              <div className="login-form">
                <h1 className="main-heading mb-3"><b>Login</b></h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="Type your email "
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
                  <br />
                  <button type="submit" className="btn secondary-btn">
                    <b>LOGIN</b>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};