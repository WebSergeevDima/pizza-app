import Input from "../../components/Input/Input.tsx";
import {FormEvent, useState} from "react";
import Button from "../../components/Button/Button.tsx";
import styles from './Login.module.scss';
import Title from "../../components/Title/Title.tsx";
import {Link} from "react-router";

export default function Login() {
    const [isValid, setIsValid] = useState({
        email: false,
        password: false,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault()
        console.log('form: ', e)
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