import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnit";

function Main({ weatherData, onCardClick, clothingItem, onCardLike}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  if (!weatherData || !weatherData.type) {
    return <p>Loading weather data...</p>;
  }

  if (!Array.isArray(clothingItem)) {
    return <p>Loading clothing items...</p>;
  }

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]}°
          {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
        {Array.isArray(clothingItem) &&
            clothingItem
              .filter((item) => item && item.weather)
              .filter((item) => {
                return item.weather === weatherData.type;
              })
              .map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} onCardLike={onCardLike}/>
          );
        })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
