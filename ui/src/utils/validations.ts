import config from "./config";

export const isEmailValid = (email: string) => {
    return email && email.length > 0 && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email);
};

export const isPasswordValid = (password: string) => {
    return password && password.length >= config.user.passwordMinLength;
}

export const isNameValid = (name: string) => {
    return name && name.trim() !== '';
}