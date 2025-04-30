import {Outlet, useMatches} from "react-router";
import styles from './Menu.module.scss';
import Button from "../../components/Button/Button.tsx";
import Menu from "../../components/Menu/Menu.tsx";
import Header from "../../components/Header/Header.tsx";
import {CustomRouteObject} from "../../interfaces/menu.interface.ts";

export default function Layout() {
    const matches = useMatches();
    const currentRoute = matches[matches.length - 1] as CustomRouteObject;
    const title = currentRoute?.handle?.title || 'Страница не найдена';


    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <div>
                    <img src="/src/assets/avatar.png" alt="" className={styles.avatar}/>

                    <div className={styles.name}>
                        Антон Ларичев
                    </div>
                    <div className={styles.email}>
                        alaricode@ya.ru
                    </div>
                </div>
                <div>
                    <Menu/>
                </div>
                <div className={styles.footer}>
                    <Button onClick={() => console.log('!')} appearence={'small'}>
                        <img src="./src/assets/logout.svg" alt=""/> Выйти
                    </Button>
                </div>
            </div>
            <div className={styles.right}>
                <Header title={title}/>
                <Outlet/>
            </div>
        </div>
    )
}