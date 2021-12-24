import Cookies from 'universal-cookie';

export function authHeader() {
    const cookies = new Cookies();
    let user = cookies.get('user');
    let access_token = cookies.get('access_token');
    if (user && access_token) {
        return { 
            'x-access-token': access_token,
            'Content-Type':'application/json'};
    } else {
        return {'Content-Type':'application/json'};
    }
}