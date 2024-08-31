import styles from "./CountryItem.module.css";
import { flagemojiToPNG } from "./convertToEmoji";

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji && flagemojiToPNG(country.emoji)}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
