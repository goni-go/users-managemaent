import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import { login } from '../utils/api';
import { Credentials } from "../types/creds";
import { AuthType } from '../types/user';
import { isEmailValid, isPasswordValid, PASSWORD_MIN_LENGTH } from "../utils/validations";

type Props = {
    setCredentials: (cred: Credentials) => void;
}

const Login: React.FC<Props> = ({ setCredentials }) => {
    const [user, setUser] = useState({} as AuthType);
    const [disabled, setDisabled] = useState(true);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (isEmailValid(user.email) && isPasswordValid(user.password)) {
            setDisabled(false);
        } else if (!disabled) {
            setDisabled(true);
        }
    }, [user]);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const response = await login(user);
            setRedirect(true);
            setCredentials(response);
        } catch (error) {
            alert(error);
            console.log('error in login: ', error);
        }
    }

    if (redirect) {
        return <Redirect to="/"/>;
    }

    return (
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <input type="email" className="form-control" placeholder="Email address" required
                   onChange={e => setUser({ ...user, email: e.target.value })}
            />

            <input type="password" minLength={PASSWORD_MIN_LENGTH} className="form-control" placeholder="Password" required
                   onChange={e => setUser({ ...user, password: e.target.value })}
            />

            <button className="w-100 btn btn-lg btn-primary" type="submit" disabled={disabled}>Sign in</button>
        </form>
    );
};

export default Login;
