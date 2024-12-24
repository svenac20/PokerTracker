import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { SignInButton } from './ms-sign-in-button';

export const Login = () => {
    const onSuccess = (response: CredentialResponse) => {
        console.log(response);
    };

    const onError = () => {
        console.log("There was error");
    };

    return (
        <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            <GoogleLogin onSuccess={onSuccess} onError={onError}/>
            <SignInButton></SignInButton>
        </div>
    )
}