
import {api, storeSessionTokens} from './api';

//PAYLOAD: actual data being sent or received between the client and the server.
export const auth = {
    async register(payload){
        const data = await api('/api/auth/register', {method: 'POST', body: payload});

        storeSessionTokens(data);
        return data;
    },

    async login(email, password, role = 'customer'){
        const data = await api('/api/auth/login', {
            method: 'POST', 
            body: {email, password, role}
        });
        storeSessionTokens(data);
        return data;
   },
   async logout(){
       try {
        const refreshToken = localStorage.getItem('pc_refresh_token');
        if(refreshToken){
            await api('/api/auth/logout', {
                method: 'POST',
                body: {refresh_token: refreshToken}
            });
           }  
       } 
       catch (err){
        console.error('Logout error', err);
       }
       finally{
        localStorage.removeItem('pc_refresh_token');
        localStorage.removeItem('pc_access_token');
        localStorage.removeItem('pc_user');
       }
   }
}

export function storeSession(result){
    const data = result;
    if(!data) return;

    if(data.access_token || data.refresh_token){
        storeSessionTokens(data);
    }
    if(data.user){
        localStorage.setItem('pc_user', JSON.stringify(data.user));
    }
}

export function clearSession(){
    localStorage.removeItem('pc_refresh_token');
    localStorage.removeItem('pc_access_token');
    localStorage.removeItem('pc_user');
}