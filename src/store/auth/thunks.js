import { loginEmailPwd, logoutFirebase, registerWithEmailPwd, signInWithGoogle } from "../../firebase/provider";
import { clearNotesLogout } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = (email, password) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
    }
}

export const startSignInEmailPwd = ({ email, password }) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
        const result = await loginEmailPwd({email, password});
        
        if (result.ok) dispatch(login(result))
        else dispatch(logout(result.message))
    }
}

export const startGoogleSignIn = () => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
        const result = await signInWithGoogle();

        if ( result.ok ) dispatch(login(result))
        else dispatch(logout(result.message))    
    }   
}

export const startRegisterEmailPwd = ({ email, password, nombre }) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());

        const { ok, uid, photoURL, message } = await registerWithEmailPwd({ email, password, nombre });

        if ( !ok ) return dispatch(logout(message));

        dispatch(login({ uid, displayName: nombre, email, photoURL}))
    }
}

export const startLogout = () => {
    return async(dispatch) => {
        await logoutFirebase();
        dispatch(logout(null))
        dispatch(clearNotesLogout())
    }
}