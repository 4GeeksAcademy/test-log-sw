import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const myToken = localStorage.getItem("myToken");
    const userLoggedIn = !!myToken;
    setIsLoggedIn(userLoggedIn);
  }, []);

  function handleLogout() {
    let isLogged = actions.logout();
    if (isLogged) {
      localStorage.removeItem("myToken");
      setIsLoggedIn(false);
      console.log("session closed");
    }
  }

  return (
    <div>
      <nav className="navbar navbar-expand-md  navbar-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img
              className="logo-nav"
              src="https://logodownload.org/wp-content/uploads/2015/12/star-wars-logo-3-1.png"
              alt=""
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {isLoggedIn ? (
            <>
              <div className="btn-group dropstart">
                <button
                  type="button"
                  className="btn btn-favorite dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  FAVORITES
                  <span className="fav-num">{store.favorites.length}</span>
                </button>
                <ul className="dropdown-menu  mx-auto">
                  {store.favorites.map((favorite, index) => {
                    return (
                      <li key={index}>
                        <h2>
                          {favorite.name}{" "}
                          <box-icon
                            type="solid"
                            className="bx-lg bx-tada-hover me-4"
                            color="yellow"
                            name="trash-alt"
                            onClick={(event) => {
                              event.stopPropagation();
                              actions.deleteFavorite(favorite);
                            }}
                          ></box-icon>
                        </h2>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <h3>Hi, {store.user.email}</h3>
              <button
                className="btn btn-primary btn-out  "
                onClick={handleLogout}
              >
                Log Out
              </button>
            </>
          ) : (
            <div className="d-flex">
              <Link to="/login">
                <button className="btn btn-primary  btn-favorite me-3">
                  Log In
                </button>
              </Link>
              <Link to="/signup">
                <button className="btn btn-primary btn-favorite">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};
