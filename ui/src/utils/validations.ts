export const PASSWORD_MIN_LENGTH = 5; // TODO use env var

export const isEmailValid = (email: string) => {
    return email && email.length > 0 && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email);
};

export const isPasswordValid = (password: string) => {
    return password && password.length >= PASSWORD_MIN_LENGTH;
}

export const isNameValid = (name: string) => {
    return name && name.trim() !== '';
}