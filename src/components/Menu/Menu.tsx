import styles from "./Menu.module.scss";
import {Link, useLocation} from "react-router";
import cn from "classnames";
import {useSelector} from "react-redux";
import {RootStateType} from "../../store/store.ts";
import {MenuProps} from "./Menu.props.ts";

export default function Menu() {
    const location = useLocation();
    const cartItems = useSelector((state: RootStateType) => state.cart.items);

    return (
        <div className={styles.menu}>
            <Link to="/" className={cn(styles.menuItem, {
                [styles.active]: location.pathname === '/'
            })}><img src="/src/assets/menu-icon.svg" alt=""/> Главная</Link>
            <Link to="/cart" className={cn(styles.menuItem, {
                [styles.active]: location.pathname === '/cart'
            })}><img src="/src/assets/cart-icon.svg" alt=""/> Корзина <span>{cartItems.length}</span></Link>
        </div>
    )
}