import { signInWithGoogle } from "../../../src/firebase/provider";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkingAuthentication, startGoogleSignIn } from "../../../src/store/auth/thunks"
import { demoUser } from "../../fixtures/authFixtures";

jest.mock("../../../src/firebase/provider")

describe('Testing in authThunks', () => { 
    const dispatch = jest.fn();
    beforeEach(() => jest.clearAllMocks());

    test('should invoke checkingCredentials', async() => { 
        await checkingAuthentication()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    })

    test('should startGoogleSignIn call checkingCredentials and return ok', async() => { 
        const loginData = { ok: true, ...demoUser };
        await signInWithGoogle.mockResolvedValue(loginData)
        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(login(loginData))
    })

    test('should startGoogleSignIn call checkingCredentials and return error', async() => { 
        const loginData = { ok: false, message: 'Un error en Google' };
        await signInWithGoogle.mockResolvedValue(loginData)
        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(logout(loginData.message))
    })
})