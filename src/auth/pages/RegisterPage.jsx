import { AuthLayout } from "../layout/AuthLayout"
import { Grid, TextField, Button, Link, Alert } from "@mui/material"
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from "../../hooks"
import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startRegisterEmailPwd } from "../../store/auth/thunks"

const formsValidations = {
    email: [(value) => value.includes('@'), 'El correo debe tener una @'],
    password: [(value) => value.length >= 6, 'La password debe tener más de 6 caracteres'],
    nombre: [(value) => value.length >= 1, 'El nombre es obligatorio'],
}

const formData = {
    nombre: 'Jeff',
    email: 'jeff@gmail.com',
    password: '123456',
}

export const RegisterPage = () => {

    const dispatch = useDispatch();
    const { status, errorMessage } = useSelector(state => state.auth);

    const isCheckingAuth = useMemo(() => status === 'checking', [status])

    const [formSubmitted, setFormSubmitted] = useState(false)

    const { nombre, email, password, onInputChange, formState, isFormValid, emailValid, passwordValid, nombreValid } 
        = useForm(formData, formsValidations);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        
        if( !isFormValid ) return;

        dispatch(startRegisterEmailPwd(formState))
    }    

    return (
        <AuthLayout title="Register">
            <form onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={12} sx={{ mb: 2 }}>
                        <TextField 
                            label="Nombre" 
                            placeholder="Jeffry Mendez"
                            name="nombre"
                            value={nombre}
                            onChange={onInputChange} 
                            type="text" fullWidth 
                            error={!!nombreValid && formSubmitted}
                            helperText={nombreValid}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mb: 2 }}>
                        <TextField 
                            label="Correo" 
                            placeholder="@gmail.com"
                            name="email"
                            value={email}
                            onChange={onInputChange}  
                            type="email" fullWidth 
                            error={!!emailValid && formSubmitted}
                            helperText={emailValid}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label="Password" 
                            placeholder="*****" 
                            name="password"
                            value={password}
                            onChange={onInputChange} 
                            type="password" fullWidth
                            error={!!passwordValid && formSubmitted}
                            helperText={passwordValid} 
                        />
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
                    <Grid item xs={12}>
                        <Button variant='contained' 
                            type="submit" 
                            fullWidth
                            disabled={isCheckingAuth}
                        >
                            Crear cuenta
                        </Button>
                    </Grid>
                    <Grid container direction="row" justifyContent="end" sx={{ mt: 2 }}>
                        <Link component={RouterLink} color='inherit' to='/auth/login'>
                            ¿Ya tienes cuenta?
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}
