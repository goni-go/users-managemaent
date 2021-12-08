export type UserType = {
    email: string;
    firstName: string;
    lastName: string;
    description: string;
};

export type FullUserType = UserType & {
    password: string;
};

export type AuthType = {
    email: string;
    password: string;
}