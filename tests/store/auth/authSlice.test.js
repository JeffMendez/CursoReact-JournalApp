import { authSlice, login, logout } from "../../../src/store/auth/authSlice"
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFixtures"

describe('Testing auth slice', () => { 
    test('should return inital state and name', () => {
        const state = authSlice.reducer(initialState, {});
        expect(state).toEqual(initialState)
        expect(authSlice.name).toBe('auth')
    })

    test('should authenticate', () => { 
        const state = authSlice.reducer(initialState, login(demoUser))
        expect(state).toEqual(authenticatedState)
    })

    test('should logout withour args', () => { 
        const stateAuth = authSlice.reducer(initialState, login(demoUser))
        const stateLogout = authSlice.reducer(stateAuth, logout(null))
        expect(stateLogout).toEqual(notAuthenticatedState)
    })

    test('should logout with error', () => { 
        const stateAuth = authSlice.reducer(initialState, login(demoUser))
        const stateLogout = authSlice.reducer(stateAuth, logout('Credenciales incorrectas'))
        expect(stateLogout).toEqual({
            ...notAuthenticatedState,
            errorMessage: 'Credenciales incorrectas'
        })
    })
})