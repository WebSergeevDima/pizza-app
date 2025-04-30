import {forwardRef, memo} from "react";
import {InputProps} from "./Input.props.ts";
import styles from './Input.module.scss';
import cn from 'classnames';

const Input = forwardRef<HTMLInputElement, InputProps>(({isValid = true, ...props}, ref) => {

    return (
        <input ref={ref} {...props} className={cn(styles.input, {
            [styles.invalid]: isValid
        })}/>
    )
});

export default memo(Input);