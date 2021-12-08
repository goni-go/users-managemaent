import { SyntheticEvent, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { FullUserType } from '../types/user';
import { register } from '../utils/api';
import { isEmailValid, isPasswordValid, isNameValid } from '../utils/validations';

const Register = () => {
    const [user, setUser] = useState({} as FullUserType);
    const [disabled, setDisabled] = useState(true);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (isEmailValid(user.email) && isPasswordValid(user.password) && isNameValid(user.firstName) && isNameValid(user.lastName)) {
            setDisabled(false);
        } else if (!disabled) {
            setDisabled(true);
        }
    }, [user]);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            await register(user);
            setRedirect(true); // after successful registraion - redirct to login page
        } catch (error) {
            alert(error);
            console.log('error in register: ', error);
        }
    }

    if (redirect) {
        return <Redirect to="/login"/>;
    }

    return (
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please register</h1>

            <input className="form-control" placeholder="First Name" required
                   onChange={e => setUser({ ...user, firstName: e.target.value })}
            />

            <input className="form-control" placeholder="Last Name" required
                onChange={e => setUser({ ...user, lastName: e.target.value })}
            />

            <input type="email" className="form-control" placeholder="Email address" required
                   onChange={e => setUser({ ...user, email: e.target.value })}
            />

            <input type="password" className="form-control" placeholder="Password" required
                   onChange={e => setUser({ ...user, password: e.target.value })}
            />

            <input className="form-control" placeholder="Description"
                   onChange={e => setUser({ ...user, description: e.target.value })}
            />

            <button className="w-100 btn btn-lg btn-primary" type="submit" disabled={disabled}>Submit</button>
        </form>
    );
};

export default Register;
