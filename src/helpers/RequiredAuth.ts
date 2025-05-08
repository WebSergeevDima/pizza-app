import {ReactNode, useEffect} from "react";
import { useNavigate } from "react-router-dom";

export const RequiredAuth = ({children}: {children: ReactNode}) => {
    const navigate = useNavigate();

    const jwt = localStorage.getItem('jwt')

    if (!jwt) {
        navigate("/auth/login", { replace: true });
        return null; // Или <LoadingSpinner />
    }

    return children
}