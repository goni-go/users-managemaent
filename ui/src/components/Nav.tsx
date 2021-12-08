import React from 'react';
import {Link} from "react-router-dom";
import { Credentials } from '../types/creds';

type Props = {
    credentials: Credentials,
    setCredentials: (creds: Credentials) => void;
}

const Nav: React.FC<Props> = ({ credentials, setCredentials }) => {
    // const logout = async () => {

    // }

    let menu;

    if (!credentials.user) {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item active">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item active">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
            </ul>
        )
    } else {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item active">
                    <Link to="/login" className="nav-link" onClick={() => setCredentials({} as Credentials)}>Logout</Link>
                </li>
            </ul>
        )
    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Home</Link>

                <div>
                    {menu}
                </div>
            </div>
        </nav>
    );
};

export default Nav;
