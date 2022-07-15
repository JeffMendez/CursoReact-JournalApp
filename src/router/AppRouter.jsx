import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { FirebaseAuth } from '../firebase/config';
import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { login, logout } from '../store/auth';
import { startLoadingNotes } from '../store/journal';
import { CheckingAuth } from '../ui/components/CheckingAuth';

export const AppRouter = () => {

    const { status } = useSelector(state => state.auth)
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(FirebaseAuth, async(user) => {
            if (!user) return dispatch(logout(null));

            const { uid, email, photoURL, displayName } = user;
            dispatch(login({uid, email, photoURL, displayName}));
            dispatch(startLoadingNotes())
        })
    }, [])
    

    if ( status === 'checking' ) {
        return <CheckingAuth/>
    }

    return (
        <Routes>

            {
                status !== 'authenticated' 
                ? <Route path='/auth/*' element={<AuthRoutes />} />
                : <Route path='/*' element={<JournalRoutes />} />
            }

            <Route path='/*' element={<Navigate to="/auth/login" /> } />
            
        </Routes>
    )
}
