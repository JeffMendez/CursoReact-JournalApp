import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const loginEmailPwd = async({ email, password }) => {
    try {
        const result = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { displayName, photoURL, uid } = result.user;

        return {
            ok: true,
            displayName, email, photoURL, uid
        }
    } catch (error) {
        const { code, message } = error;
        return {
            ok: false,
            code, message
        }
    }
}

export const signInWithGoogle = async() => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        const { displayName, email, photoURL, uid } = result.user;
        
        return {
            ok: true,
            displayName, email, photoURL, uid
        }
    } catch (error) {
        const { code, message } = error;
        return {
            ok: false,
            code, message
        }
    }
}

export const registerWithEmailPwd = async({ email, password, nombre}) => {
    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;
        
        await updateProfile(FirebaseAuth.currentUser, { displayName: nombre })

        return {
            ok: true,
            uid, photoURL, email, nombre
        }
    } catch (error) {
        const { code, message } = error;
        return {
            ok: false,
            code, message
        }
    }
}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}
