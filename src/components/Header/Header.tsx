import Title from "../Title/Title.tsx";
import {HeaderProps} from "./Header.props.ts";
import styles from './Header.module.scss';
import InputSearch from "../InputSearch/InputSearch.tsx";

export default function Header({title, updateFilter}: HeaderProps) {


    return (
        <header className={styles.header}>
            <Title>{title}</Title>
            <InputSearch onChange={updateFilter} />
        </header>
    );
}