import {ChangeEvent} from "react";

export type HeaderProps = {
    title: string,
    updateFilter: (e: ChangeEvent<HTMLInputElement>) => void
}