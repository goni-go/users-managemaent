import axios from 'axios';
import { AuthType, FullUserType, UserType } from '../types/user';
import config from "./config";
import { createToken } from "./jwt";

export const register = async (user: FullUserType) => {

    const token = createToken(user);

    const body = {
        email: user.email,
        firstName: user.firstName.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
        lastName: user.lastName.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
        description: user.description
    }

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }

    const response = await axios.post(`${config.server.url}/register`, body, { headers });
    return response.data;
}

export const fetchUsersPagination = async (pageNumber: number, token: string): Promise<UserType[]> => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }

    const response = await axios.get(`${config.server.url}/users`, {
        headers,
        params: {
            pageSize: config.pagination.pageSize,
            pageNumber
        }
    });
    return response.data as UserType[];
}

export const login = async (user: AuthType): Promise<any> => {
    const token = createToken(user);

    const body = {
        email: user.email
    }
    
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }

    const response = await axios.post(`${config.server.url}/login`, body, { headers });
    return response.data;
}