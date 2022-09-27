import { useState } from "react";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<IWeather>();

  interface IWeather {
    name: string;
    main: {
      temp: number;
      humidity: number;
    };
    weather: [{ description: string; icon: string }];
    sys: {
      country: string;
    };
    wind: {
      speed: number;
    };
  }

  const apiKey = "a0d1e1cc808fee2fcce58d7d8d15d19b";

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    apiFetch(URL);
  };

  const apiFetch = (URL: string) => {
    if (city.length >= 3) {
      fetch(URL)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }else if(response.status === 404){
            alert("Cidade não encontrada!")
          }
        })
        .then((data) => setWeather(data))
        .catch((err) => console.log(err));
    } else {
      alert("Digite uma Cidade Válida");
    }
  };

  return (
    <div className="h-[100vh] bg-gradient-to-b from-violet-600 to-blue-400 text-white font-roboto ">
      <nav className="py-4 mb-5 text-center shadow-md">
        <a className="py-3 px-3 ml-7 font-bold text-3xl" href="/">
          Clima Tempo
        </a>
      </nav>

      <main className="flex justify-center items-center mx-4 mt-[150px]">
        <form className="p-8 shadow-2xl bg-[#5c54ed] rounded-2xl ">
          <h3 className="text-3xl font-extrabold">
            Confira o clima de uma cidade:
          </h3>
          <div className="w-[100%] flex">
            <input
              type="text"
              placeholder="Digite o nome de uma cidade"
              className="py-1 px-2 rounded-md mt-4 outline-none font-bold text-lg text-black flex-1"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={handleSearch} className="font-bold text-2xl pl-3">
              <i className="fa-solid fa-magnifying-glass mt-4"></i>
            </button>
          </div>

          {weather ? (
            <div
              id="weather-data"
              className="flex flex-col justify-baseline items-center border-t-2 mt-5 py-5"
            >
              <h2 className=" mb-3 flex justify-center items-center">
                <i className="fa-solid fa-location-dot text-base pr-4"></i>
                <span className="text-3xl font-semibold pr-4">
                  {weather.name}
                </span>
                <img
                  className="h-5"
                  src={`https://countryflagsapi.com/png/${weather.sys.country}`}
                  alt="Bandeira do país"
                />
              </h2>

              <p className="text-xl font-semibold mt-3">
                <span>{Math.floor(weather.main.temp)}</span>&deg;C
              </p>

              <div
                id="description-container"
                className="flex items-center mt-3 text-2xl"
              >
                <p id="description" className="text-2xl font-semibold">
                  {weather.weather[0].description}
                </p>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                  alt="Condição do tempo"
                />
              </div>

              <div
                id="details-container"
                className="flex justify-center items-center gap-5 mt-3"
              >
                <p id="umidity" className="border-r-white text-xl">
                  <i className="fa-solid fa-droplet"></i>
                  <span> {Math.floor(weather.main.humidity)}%</span>
                </p>

                <p id="wind" className="text-xl border-l-2 pl-5">
                  <i className="fa-solid fa-wind"></i>
                  <span> {Math.floor(weather.wind.speed)}km/h</span>
                </p>
              </div>
            </div>
          ) : null}
        </form>
      </main>
    </div>
  );
}
