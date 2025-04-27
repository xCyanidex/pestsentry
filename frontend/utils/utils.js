import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token) => {
    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // in seconds
        return decoded.exp < currentTime;
    } catch (error) {
        return true; // assume expired if invalid token
    }
};
