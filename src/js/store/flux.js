const getState = ({ getStore, getActions, setStore }) => {
  const API_REQUEST_DELAY = 1000;
  const API_REQUEST_DELAY2 = 2000;
  const API_REQUEST_DELAY3 = 3000;
  const API_URL =
    "https://valentinfrar-upgraded-disco-v4vqw666pvwcxw4v-3000.preview.app.github.dev";
  return {
    store: {
      user: {},
      people: [],
      character: [],
      planets: [],
      planet: [],
      vehicles: [],
      vehicle: [],
      favorites: [],
      isLoading: true,
    },
    actions: {
      // Use getActions to call a function within a fuction
      getPeople: async () => {
        try {
          const settings = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          };

          const request = await fetch(
            "https://www.swapi.tech/api/people/",
            settings
          );
          const json = await request.json();
          const data = json;
          const store = getStore();
          setStore({ ...store, people: data.results });
          await new Promise((resolve) =>
            setTimeout(resolve, API_REQUEST_DELAY)
          );
        } catch (error) {
          console.log("No se pudo cargar: ", error);
        }
      },

      getCharacterDescription: async (url) => {
        try {
          const store = getStore();
          const settings = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          };

          const request = await fetch(url, settings);
          const data = await request.json();
          setStore({ character: [...store.character, data.result.properties] });
        } catch (error) {
          console.log(error);
        }
      },

      charDescription: (url) => {
        getActions().getCharacterDescription(url);
      },
      getPlanet: async () => {
        try {
          const settings = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          };

          const request = await fetch(
            "https://www.swapi.tech/api/planets/",
            settings
          );
          const json = await request.json();
          const data = json;
          setStore({ planets: data.results });
          await new Promise((resolve) =>
            setTimeout(resolve, API_REQUEST_DELAY2)
          );
        } catch (error) {
          console.log(error);
        }
      },

      getPlanetDescription: async (url) => {
        try {
          const store = getStore();
          const settings = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          };

          const request = await fetch(url, settings);
          const json = await request.json();
          const data = json;
          setStore({ planet: [...store.planet, data.result.properties] });
        } catch (error) {
          console.log("Planets load problem", error);
        }
      },

      planetDescription: (url) => {
        getActions().getPlanetDescription(url);
      },
      getVehicle: async () => {
        try {
          const settings = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          };

          const request = await fetch(
            "https://www.swapi.tech/api/vehicles/",
            settings
          );
          const json = await request.json();
          const data = json;
          setStore({ vehicles: data.results });
          await new Promise((resolve) =>
            setTimeout(resolve, API_REQUEST_DELAY3)
          );
        } catch (error) {
          console.log(error);
        }
      },

      getVehicleDescription: async (url) => {
        try {
          const store = getStore();
          const settings = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          };

          const request = await fetch(url, settings);
          const json = await request.json();
          const data = json;
          setStore({ vehicle: [...store.vehicle, data.result.properties] });
        } catch (error) {
          console.log("Vehicle load problem", error);
        }
      },

      vehicleDescription: (url) => {
        getActions().getVehicleDescription(url);
      },

      addCharacters: (char) => {
        const store = getStore();
        const favoriteExist = store.favorites.includes(char);
        if (!favoriteExist) {
          setStore({ favorites: [...store.favorites, char] });
        }
      },
      addPlanets: (planet) => {
        const store = getStore();
        const favoriteExist = store.favorites.includes(planet);
        if (!favoriteExist) {
          setStore({ favorites: [...store.favorites, planet] });
        }
      },
      addVehicles: (vehicle) => {
        const store = getStore();
        const favoriteExist = store.favorites.includes(vehicle);
        if (!favoriteExist) {
          setStore({ favorites: [...store.favorites, vehicle] });
        }
      },
      deleteFavorite: (favorite) => {
        const store = getStore();
        const updatedFavorites = store.favorites.filter(
          (item) => item !== favorite
        );
        setStore({ favorites: updatedFavorites });
      },
      // Fonction de connexion
      login: async (userEmail, userPassword) => {
        console.log(userEmail, userPassword);
        try {
          // let myToken = localStorage.getItem("myToken");
          const response = await fetch(API_URL + "/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json", 
            },
            body: JSON.stringify({
              email: userEmail,
              password: userPassword,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            localStorage.setItem("myToken", data.access_token);
            setStore({ user: data.user });
            console.log(data);
            return data;
          } else if (response.status === 401) {
            // Gérer l'erreur de connexion non autorisée
            return false;
          }
        } catch (err) {
          console.log(err);
          return false; // Gérer les autres erreurs, renvoyer false par défaut
        }
      },

      // Fonction d'inscription
      signup: async (userEmail, userPassword) => {
        try {
          // Utiliser la clé "myToken" au lieu de "token"
          const response = await fetch(API_URL + "/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Utiliser le préfixe "Bearer" pour l'autorisation
            },
            body: JSON.stringify({
              email: userEmail,
              password: userPassword,
            }),
          });

          if (response.ok) {
            console.log(response);
            console.log("Todo perfecto");
            return response;
          } else if (response.status === 401) {
            // Gérer l'erreur de connexion non autorisée
            return false;
          }
        } catch (err) {
          console.log(err);
          return false; // Gérer les autres erreurs, renvoyer false par défaut
        }
      },
      logout: () => {
        let token = localStorage.getItem("myToken");
        return token != null ? true : false;
      },
      isAuth: async () => {
        try {
          let token = localStorage.getItem("myToken");
          const settings = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer" + token,
            },
          };

          const request = await fetch(API_URL + "/private", settings);
          const json = await request.json();
          const data = json;
          setStore({ user: data.user });
        } catch (error) {
          console.log("No se pudo cargar: ", error);
        }
      },
    },
  };
};

export default getState;
