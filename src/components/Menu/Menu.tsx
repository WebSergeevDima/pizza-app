import styles from "./Menu.module.scss";
import {Link, useLocation} from "react-router";
import cn from "classnames";

export default function Menu() {
    const location = useLocation();

    return (
        <div className={styles.menu}>
            <Link to="/" className={cn(styles.menuItem, {
                [styles.active]: location.pathname === '/'
            })}><img src="/src/assets/menu-icon.svg" alt=""/> Главная</Link>
            <Link to="/cart" className={cn(styles.menuItem, {
                [styles.active]: location.pathname === '/cart'
            })}><img src="/src/assets/cart-icon.svg" alt=""/> Корзина</Link>
        </div>
    )
}