import styles from './ProductCard.module.scss';
import {ProductCardProps} from "./ProductCard.props.ts";
import {Link} from "react-router";
import {useDispatch} from "react-redux";
import {cartActions, cartSlice} from "../../store/cart.slice.ts";
import {AppDispatchType} from "../../store/store.ts";

export default function ProductCard({...props} : ProductCardProps) {
    const dispatch = useDispatch<AppDispatchType>();
    const addToCartHandler = () => {
        dispatch(cartActions.add(props.id));
    }

    return (
        <Link to={`/product/${props.id}`} className={styles.card}>
            <div className={styles.head} style={{
                backgroundImage: `url(${props.image})`
            }}>
                <div className={styles.price}>{props.price} <span className={styles.currency}>R</span></div>
                <button className={styles.addToCardBtn} onClick={addToCartHandler}>
                    <img src="/src/assets/card-btn-add-icon.svg" alt=""/>
                </button>
                <div className={styles.rating}>
                    {props.rating}
                    <img src="/src/assets/star-icon.svg" alt=""/>
                </div>
            </div>
            <div className={styles.footer}>
                <div className={styles.title}>{props.title}</div>
                <div className={styles.description}>{props.description}</div>
            </div>
        </Link>
    )
}