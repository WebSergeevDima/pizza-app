import Title from "../../components/Title/Title.tsx";
import Input from "../../components/Input/Input.tsx";
import Button from "../../components/Button/Button.tsx";
import {Link} from "react-router";
import {FormEvent, useEffect, useState} from "react";
import {RegistrationForm} from "../../interfaces/registration.interface.ts";
import {useDispatch, useSelector} from "react-redux";
import {login, register} from "../../store/user.slice.ts";
import styles from './Register.module.scss';
import {RootStateType} from "../../store/store.ts";
import {useNavigate} from "react-router-dom";

export default function Register() {
    const [isValid, setIsValid] = useState({
        email: false,
        password: false,
        name: false,
    });
    const [error, setError] = useState<string | null>();
    const dispatch = useDispatch();
    const jwt = useSelector((state: RootStateType) => state.user.jwt);
    const navigate = useNavigate();

    useEffect(() => {
        if (jwt) {
            navigate("/");
        }
    }, [jwt, navigate])


    const submit = async (e: FormEvent) => {
        e.preventDefault()
        setError(null)

        const target = e.target as typeof e.target & RegistrationForm;
        const {email, password, name} = target;

        await sendRegister(email.value, password.value, name.value);
    }

    const sendRegister = async (email: string, password: string, name: string) => {
        dispatch(register({email, password, name}))
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
                <div>
                    <label className={styles.label} htmlFor="name">Ваше имя</label>
                    <Input isValid={isValid.name} type="text" name="name" placeholder="Имя"/>
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