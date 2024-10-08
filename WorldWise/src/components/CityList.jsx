import { useEffect } from "react";
import { useCities } from "../contexts/useCities";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

function CityList() {
  const { cities, isLoading, fetchCities } = useCities();

  useEffect(() => {
    if (cities.length === 0) {
      fetchCities();
    }
  }, [cities.length, fetchCities]);

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking a city on a map" />
    );

  if (isLoading) return <Spinner />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
