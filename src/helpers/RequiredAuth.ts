import {ReactNode} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootStateType} from "../store/store.ts";

export const RequiredAuth = ({children}: { children: ReactNode }) => {
    const navigate = useNavigate();

    const jwt = useSelector((state: RootStateType) => state.user.jwt);

    if (!jwt) {
        navigate("/auth/login", {replace: true});
        return null; // Или <LoadingSpinner />
    }

    return children
}