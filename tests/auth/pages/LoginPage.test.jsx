import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { authSlice } from "../../../src/store/auth";
import { MemoryRouter } from "react-router-dom";
import { notAuthenticatedState } from "../../fixtures/authFixtures";

const mockStartGoogleSignIn = jest.fn();
const mockStartSignInEmailPwd = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startSignInEmailPwd: ({email, password}) => mockStartSignInEmailPwd({email, password})
}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn(),
}))

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
})

describe('Testing in <LoginPage/>', () => { 
    
    beforeEach(() => jest.clearAllMocks())

    test('should show component', () => { 
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
    });

    test('should google button call startGoogleSignIn', () => { 
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )
        const btnGoogle = screen.getByLabelText('btn-google');
        fireEvent.click(btnGoogle);

        expect(mockStartGoogleSignIn).toHaveBeenCalled()

        // fireEvent.submit(loginForm)
        // expect(mockStartSignInEmailPwd).toHaveBeenCalledWith({ email, password })
    })

})