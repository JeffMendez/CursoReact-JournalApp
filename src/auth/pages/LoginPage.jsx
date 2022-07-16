import { Google } from "@mui/icons-material"
import { Grid, Typography, TextField, Button, Link, Alert } from "@mui/material"
import { useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link as RouterLink } from 'react-router-dom'

import { useForm } from "../../hooks"
import { startGoogleSignIn, startSignInEmailPwd } from "../../store/auth"
import { AuthLayout } from "../layout/AuthLayout"

const formData = {
    email: 'jeff@gmail.com',
    password: '123456',
}

export const LoginPage = () => {

    const { status, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const { email, password, onInputChange } = useForm(formData)

    const isAuthenticating = useMemo(() => status === 'checking', [status]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email == '' || password == '') return;
        dispatch(startSignInEmailPwd({email, password}))
    }

    const handleGoogleSignIn = (e) => {
        dispatch(startGoogleSignIn())
    }

    return (
        <AuthLayout title="Login">
            <form onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={12} sx={{ mb: 2 }}>
                        <TextField 
                            label="Correo" 
                            placeholder="@gmail.com"
                            name="email"
                            value={email}
                            onChange={onInputChange}
                            type="email" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label="Password" 
                            placeholder="*****" 
                            name="password"
                            value={password}
                            onChange={onInputChange}
                            type="password" fullWidth />
                    </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid 
                        item 
                        xs={12}
                        display={ !!errorMessage ? '': 'none'}
                    >
                        <Alert severity='error'>
                            {errorMessage}
                        </Alert>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Button variant='contained' 
                            type="submit" 
                            fullWidth
                            disabled={isAuthenticating}
                        >
                            Login
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button 
                            variant='contained' 
                            fullWidth onClick={handleGoogleSignIn}
                            disabled={isAuthenticating}
                            aria-label='btn-google'
                            >
                            <Google />
                            <Typography sx={{ ml: 1 }}>Google</Typography>
                        </Button>
                    </Grid>
                    <Grid container direction="row" justifyContent="end" sx={{ mt: 2 }}>
                        <Link component={RouterLink} color='inherit' to='/auth/register'>
                            Crear una cuenta
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}
