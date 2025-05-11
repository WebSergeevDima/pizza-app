import {PREFIX} from "../../helpers/API.ts";
import {useEffect, useState} from "react";
import {Product} from "../../interfaces/product.inerface.ts";
import axios, {AxiosError} from "axios";
import MenuList from "./Menu/MenuList.tsx";
import styles from './Menu.module.scss';
import {useSelector} from "react-redux";
import {RootStateType} from "../../store/store.ts";

export default function Menu() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();
    const filterName = useSelector((state: RootStateType) => state.products.filter);

    const getMenu = async () => {
        setIsLoading(true);

        try {
            await new Promise<void>((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 2000)
            })
            const {data} = await axios.get<Product[]>(`${PREFIX}/products?name=${filterName}`);
            setProducts(data)
        } catch (e) {
            if(e instanceof AxiosError) {
                console.error(e);
                setError(e.message)
            }
            return;
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getMenu();
    }, [filterName])

    return (
        <div className={styles.wrapper}>
            {error && <h2>{error}</h2>}
            {!isLoading && <MenuList products={products} />}
            {isLoading && <h2>Загрузка...</h2>}
        </div>)
}