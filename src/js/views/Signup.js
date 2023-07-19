import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar } from "../component/navbar";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(email,password);
    //    boolean   <=
    let register = await actions.signup(email, password);
    console.log(register);
    if (register) {
      //true
      navigate("/login");
    }
  }

  return (
    <>
      <Navbar />

      <h1>Welcome young padawan</h1>
      <form
        className="container card mx-auto bg-transparent text-center"
        onSubmit={handleSubmit}
      >
        <div className="mb-3 ">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" className="btn btn-success">
          Create account
        </button>
      </form>
      <div className="">
        <NavLink to="/login">
          <button type="submit" className="btn btn-primary">
            Log in
          </button>
        </NavLink>
      </div>
    </>
  );
};

export default Signup;
