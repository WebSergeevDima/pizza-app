import {Outlet, useMatches} from "react-router";
import styles from './Menu.module.scss';
import Button from "../../components/Button/Button.tsx";
import Menu from "../../components/Menu/Menu.tsx";
import Header from "../../components/Header/Header.tsx";
import {CustomRouteObject} from "../../interfaces/menu.interface.ts";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, RootStateType} from "../../store/store.ts";
import {getProfile, userActions} from "../../store/user.slice.ts";
import {ChangeEvent, useEffect} from "react";;
import {productsActions} from "../../store/products.slice.ts";

export default function Layout() {
    const matches = useMatches();
    const currentRoute = matches[matches.length - 1] as CustomRouteObject;
    const title = currentRoute?.handle?.title || 'Страница не найдена';
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatchType>();
    const profile = useSelector((state: RootStateType) => state.user.userProfile);

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch])

    const logout = () => {
        dispatch(userActions.logout());
        navigate("/auth/login");
    }

    const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(productsActions.addQuery(e.currentTarget.value));
    }

    // const getProducts = async () => {
    //     try {
    //         await new Promise<void>((resolve) => {
    //             setTimeout(() => {
    //                 resolve();
    //             }, 2000)
    //         })
    //         const {data} = await axios.get<Product[]>(`${PREFIX}/products${!!q ? `?name=` : ''}`);
    //
    //     } catch (e) {
    //         if(e instanceof AxiosError) {
    //             console.error(e);
    //         }
    //         return;
    //     }
    // }

    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <div>
                    <img src="/src/assets/avatar.png" alt="" className={styles.avatar}/>

                    <div className={styles.name}>
                        {profile?.name}
                    </div>
                    <div className={styles.email}>
                        {profile?.email}
                    </div>
                </div>
                <div>
                    <Menu/>
                </div>
                <div className={styles.footer}>
                    <Button onClick={logout} appearence={'small'}>
                        <img src="./src/assets/logout.svg" alt=""/> Выйти
                    </Button>
                </div>
            </div>
            <div className={styles.right}>
                <Header title={title} updateFilter={updateFilter}/>
                <Outlet/>
            </div>
        </div>
    )
}