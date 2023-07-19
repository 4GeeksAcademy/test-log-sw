import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import CardsPeople from "../component/CardsPeople.jsx";
import CardsPlanets from "../component/CardsPlanets.jsx";
import CardsVehicles from "../component/CardsVehicles.jsx";
import { Navbar } from "../component/navbar.js";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const delay = 2000; // 2 secondes

    const timer = setTimeout(() => {
      actions.getPeople();
      actions.getPlanet();
      actions.getVehicle();
      setIsLoading(false); // Mettre à jour l'état isLoading à false après le délai
    }, delay);

    return () => clearTimeout(timer); // Nettoyer le timer si le composant est démonté avant la fin du délai
  }, []);
  // useEffect(() => { actions.getPeople();
  //        actions.getPlanet();
  //        actions.getVehicle();}, [])

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <span className="lettre">L</span>
          <span className="lettre">O</span>
          <span className="lettre">A</span>
          <span className="lettre">D</span>
          <span className="lettre">I</span>
          <span className="lettre">N</span>
          <span className="lettre">G</span>
        </div>
      ) : (
        <>
          <Navbar />
          <div className="main-content">
            <div>
              <div>
                <h2 className="heading">Characters:</h2>
              </div>
            </div>
            <div>
              <div className="d-flex cards-content">
                <div className="d-flex ">
                  {store.people
                    ? store.people.map((character, index) => (
                        <CardsPeople
                          key={character.url}
                          index={index}
                          character={character}
                        />
                      ))
                    : ""}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div>
                <h2 className="heading">Planets:</h2>
              </div>
            </div>
            <div>
              <div className="d-flex cards-content">
                <div className="d-flex ">
                  {store.planets
                    ? store.planets.map((planet, index) => (
                        <CardsPlanets
                          key={planet.url}
                          index={index}
                          planet={planet}
                        />
                      ))
                    : ""}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div>
                <h2 className="heading">Vehicles:</h2>
              </div>
            </div>
            <div>
              <div className="d-flex cards-content">
                <div className="d-flex ">
                  {store.vehicles
                    ? store.vehicles.map((vehicle, index) => (
                        <CardsVehicles
                          key={vehicle.url}
                          index={index}
                          vehicle={vehicle}
                        />
                      ))
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
