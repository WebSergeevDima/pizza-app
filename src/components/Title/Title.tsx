import {TitleProps} from "./Title.props.ts";
import styles from './Title.module.scss';

export default function Title({children, ...props}: TitleProps) {
    return (
        <h2 {...props} className={styles.title}>{children}</h2>
    )
}