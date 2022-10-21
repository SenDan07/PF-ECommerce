import { Link } from "react-router-dom";
import styles from "./Menu.module.css";

const Menu = () => {
  return (
    <div className={styles.contentBtns}>
      <Link className={styles.btn} to="/adminuser">
        Usuarios
      </Link>
      <Link className={styles.btn} to="/admicategory">
        Categorias
      </Link>
      <Link className={styles.btn} to="/deletebook">
        Libros
      </Link>
      <Link className={styles.btn} to="/allorders">
        Ventas
      </Link>
    </div>
  );
};

export default Menu;
