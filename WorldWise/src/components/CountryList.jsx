import { useCities } from "../contexts/useCities";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

function CountryList() {
  const { cities, isLoading } = useCities();
  const countries = cities.reduce((arr, city) => {
    if (arr.map((el) => el.country).includes(city.country)) return arr;
    return [...arr, { country: city.country, emoji: city.emoji }];
  }, []);

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking a city on a map" />
    );

  if (isLoading) return <Spinner />;

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
