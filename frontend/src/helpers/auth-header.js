import Cookies from 'universal-cookie';

export function authHeader() {
    const cookies = new Cookies();
    let access_token = cookies.get('access_token');
    if (access_token) {
        return { 
            'x-access-token': access_token,
            'Content-Type':'application/json'};
    } else {
        return {'Content-Type':'application/json'};
    }
}