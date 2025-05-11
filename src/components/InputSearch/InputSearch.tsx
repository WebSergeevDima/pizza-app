import styles from './InputSearch.module.scss';

export default function InputSearch({...props}) {
    return (
        <input className={styles.input} type="text" placeholder="Введите блюдо или состав" {...props} />
    )
}