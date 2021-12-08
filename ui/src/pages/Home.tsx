import React from 'react';
import { Credentials } from '../types/creds';
import UsersGrid from "../components/UsersGrid";

type Props = {
    creds: Credentials
}

const Home: React.FC<Props> = ({ creds }) => {

    return creds && creds.token ? (
        <div>
            <p>{`Welcome ${creds.user.firstName} ${creds.user.lastName} :)`}</p>
            <p>For now, you are only able to view the system users</p>
            <p>Hope to have more features in the future..</p>
            <UsersGrid credentials={creds} />
        </div>
    ) : (
        <div>
            <p>Welcome to the User Management System, please login</p>
        </div>
    )
};

export default Home;
