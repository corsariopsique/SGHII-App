import {jwtDecode} from 'jwt-decode';

export const DecodificadorJWT = (jwtToken) => {    
    if (jwtToken) {
        const decoded = jwtDecode(jwtToken);
        const { sub: username, exp: expiration } = decoded;
        const sessionStart = new Date(decoded.iat * 1000);
        const sessionEnd = new Date(expiration * 1000);
        return { username, sessionStart, sessionEnd };
    }
    return null;
}

