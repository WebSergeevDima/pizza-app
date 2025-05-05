import {Outlet} from "react-router";
import styles from './Auth.layout.module.scss';

export default function AuthLayout() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.logo}>
                <img src="/register-logo.svg" alt="" />
            </div>
            <div className={styles.content}>
                <Outlet/>
            </div>
        </div>
    )
}