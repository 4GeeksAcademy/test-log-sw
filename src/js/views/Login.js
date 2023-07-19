import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";
import { Navbar } from "../component/navbar";

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
      navigate("/");
    } else {
      // Connexion échouée
      setLoginError("Email and/or password incorrect");
    }
  }

  return (
    <>
      <Navbar />
      <h1>Glad to see you again jedi</h1>
      <form
        className="container card mx-auto bg-transparent text-center"
        onSubmit={handleLog}
      >
        <div className="mb-3">
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
        <button type="submit" className="btn btn-primary">
          Log in
        </button>
        {loginError && <p className="text-danger">{loginError}</p>} {/* Affichage du message d'erreur */}
      </form>
    </>
  );
};

export default Login;
