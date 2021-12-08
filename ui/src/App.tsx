import React, { useState } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Nav from "./components/Nav";
import { Credentials } from './types/creds';

const App = () => {
    const [credentials, setCredentials] = useState({} as Credentials);

    return (
        <div className="App">
            <BrowserRouter>
                <Nav credentials={credentials} setCredentials={setCredentials}/>

                <main className="form-signin">
                    <Route path="/" exact component={() => <Home creds={credentials}/>}/>
                    <Route path="/login" component={() => <Login setCredentials={setCredentials}/>}/>
                    <Route path="/register" component={Register}/>
                </main>
            </BrowserRouter>
        </div>
    );
}

export default App;
