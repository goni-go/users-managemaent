export type UserType = {
    email: string;
    firstName: string;
    lastName: string;
    description: string;
};

export type FullUserType = UserType & {
    password: string;
};

export type AuthUserType = {
    email: string;
    password: string;
}