import Input from "../../components/Input/Input.tsx";
import {FormEvent, useEffect, useState} from "react";
import Button from "../../components/Button/Button.tsx";
import styles from './Login.module.scss';
import Title from "../../components/Title/Title.tsx";
import {Link} from "react-router";
import {LoginForm} from "../../interfaces/auth.interface.ts";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, RootStateType} from "../../store/store.ts";
import {login} from "../../store/user.slice.ts";

export default function Login() {
    const navigate = useNavigate();
    const [isValid, setIsValid] = useState({
        email: false,
        password: false,
    });
    const [error, setError] = useState<string | null>();
    const dispatch = useDispatch<AppDispatchType>();
    const jwt = useSelector((state: RootStateType) => state.user.jwt);

    useEffect(() => {
        if (jwt) {
            navigate("/");
        }
    }, [jwt, navigate])

    const submit = async (e: FormEvent) => {
        e.preventDefault()
        setError(null)

        const target = e.target as typeof e.target & LoginForm;
        const {email, password} = target;

        await sendLogin(email.value, password.value);
    }

    const sendLogin = async (email: string, password: string) => {
        dispatch(login({email, password}))
        // try {
        //     const {data} = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
        //         email,
        //         password
        //     })
        //     dispatch(userActions.addJwt(data.access_token))
        //     navigate("/");
        // } catch (e) {
        //     if (e instanceof AxiosError) {
        //         setError(e.response?.data.message);
        //     }
        // }
    }

    return (
        <div>
            <div className={styles.title}>
                <Title>Вход</Title>
            </div>
            <form className={styles.form} onSubmit={submit}>
                <div>
                    <label className={styles.label} htmlFor="email">Ваш email</label>
                    <Input isValid={isValid.email} id="email" name="email" type="email" placeholder="Email"/>
                </div>
                <div>
                    <label className={styles.label} htmlFor="password">Ваш пароль</label>
                    <Input isValid={isValid.password} type="password" name="password" placeholder="Пароль"/>
                </div>
                {error && <div>Error: {error}</div>}
                <Button className={styles.formBtn} appearence="big">Вход</Button>
            </form>
            <div className={styles.footer}>
                <div>Нет аккаунта?</div>
                <div>
                    <Link to="/auth/register" className={styles.link}>Зарегистрироваться</Link>
                </div>
            </div>
        </div>
    )
}