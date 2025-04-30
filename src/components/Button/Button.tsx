import styles from './Button.module.css';
import {ButtonProps} from "./Button.props.ts";
import cn from 'classnames';

export default function Button({children, className, appearence = 'small', ...props}: ButtonProps) {
    return (
        <button className={cn(styles.button, className, styles[appearence] )} {...props}>{children}</button>
    )
}