import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";
import { Navbar } from "../component/navbar";
import { Link } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(""); // Ajout de la variable d'état loginError
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();

  async function handleLog(e) {
    e.preventDefault();
    let isLogged = await actions.login(email, password);
    console.log(isLogged);
    if (isLogged) {
      // Connexion réussie
      navigate("/home");
    } else {
      // Connexion échouée
      setLoginError("Email and/or password incorrect");
    }
  }

  return (
    <>
      <Navbar />
      <h1 className="title-log">Glad to see you again jedi</h1>
      <div>
        <form
          className="container log-content card mx-auto bg-transparent text-center"
          onSubmit={handleLog}
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
            Log in
          </button>
          {loginError && <p className="text-danger">{loginError}</p>}{" "}
          {/* Affichage du message d'erreur */}
          <Link to="/signup">
            <p className="mt-4 create-p ">
              Don't you have an account? <span className="click">click here</span>
            </p>
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
