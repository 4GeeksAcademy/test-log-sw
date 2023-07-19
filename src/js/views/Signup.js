import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../component/navbar";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(""); // Ajout de la variable d'état loginError
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
    } else {
      // Connexion échouée
      setLoginError("Email already exists");
    }
  }

  return (
    <>
      <Navbar />
      <h1>Glad to see you again jedi</h1>
      <div>
        <form
          className="container log-content card mx-auto bg-transparent text-center"
          onSubmit={handleSubmit}
        >
          <div className="mt-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label log-label"
            >
              Email address
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="form-control mt-0"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              Beware of the dark side of the force
            </div>
          </div>
          <div className="mb-0">
            <label htmlFor="password" className="form-label log-label">
              Password
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="form-control mt-0"
              id="password"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-log btn-more">
            Create account
          </button>
          {loginError && <p className="text-danger">{loginError}</p>}{" "}
          {/* Affichage du message d'erreur */}
          <Link to="/signup">
            <p className="mt-4 create-p ">
              Do you already have an account? <span>click here</span>
            </p>
          </Link>
        </form>
      </div>
    </>
  );
};

export default Signup;
