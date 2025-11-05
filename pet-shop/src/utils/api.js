
//THIS IS A client side API service 

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export function getAccessToken() {
    return localStorage.getItem('pc_access_token') || '';
}

//TOKEN HANDLING
export function storeSessionTokens(response){
    //HANDLE DIFFERENT RESPONSE STRUCTURES FROM BACKEND
    let accessToken = null;
    let refreshToken = null;
    let user = null;

    //EXTRACT TOKENS FROM DIFFERENT POSSIBLE LOCATION
    if(response.access_token){
        accessToken = response.access_token;
    } 
    else if (response.data && response.data.access_token){
        accessToken = response.data.access_token;
    }

    if(response.refresh_token){
        refreshToken = response.refresh_token;
    }
    else if (response.data && response.data.refresh_token){
        refreshToken = response.data.refresh_token;
    }

    if(response.user){
        user = response.user;
    }
    else if (response.data && response.data.user){
        user = response.data.user;
    }

    //STORE TOKENS 
    if(accessToken){
        localStorage.setItem('pc_access_token', accessToken);
    }
    if(refreshToken){
        localStorage.setItem('pc_refresh_token', refreshToken);
    }
    if(user){
        localStorage.setItem('pc_user', JSON.stringify(user));
    }

    console.log('Token storage', {
		accessToken: accessToken ? 'Stored' : 'Not found',
		refreshToken: refreshToken ? 'Stored' : 'Not found',
		user: user ? 'Stored' : 'Not found',
		responseStructure: {
			hasAccessToken: !!response.access_token,
			hasDataAccessToken: !!(response.data && response.data.access_token),
			hasUser: !!response.user,
			hasDataUser: !!(response.data && response.data.user),
            actualResponse: response
		}
	});
}


export async function api(path, {method = 'GET', body, token, isFormData = false} = {}){
    const headers = {
        'Accept': 'application/json',
    };

    //ONLY SET CONTENT TYPE IF NOT FOR JSON REQUEST
    if(!isFormData){
        headers['Content-Type'] = 'application/json';
    }

    const t = token || getAccessToken();
    if(t) headers.Authorization = `Bearer ${t}`;

    console.log('Api Request', {method, path, body, isFormData });

    const response = await fetch(`${API_BASE_URL}${path}`, {
        method, 
        headers,
        body: isFormData ? body : (body ?JSON.stringify(body) : undefined),
    });

    //ADD DETAILS RESPONSE LOGGING
    
    const responseText = await response.text();

    let json;
    try{
        json = JSON.parse(responseText);
        console.log('Api response JSON:', json);
    }
    catch(err){
        console.log('Api response text: ', responseText);
        json = {};
    }

    //BACKEND RESPONSE: success return
    if(!response.ok || json?.success === false){
        const msg = json?.message || 'An error occurred';
        const error = new Error(msg);

        //PRESERVE DETAILED FIELD ERRORS 
        if(json?.errors){
            error.errors = json.errors;
            error.fieldErrors = json.errors;
        }

        //PRESERVE FULL RESPONSE FOR DEBUGGING
        error.response = json;
        throw error;
    }

    if(path.includes('/auth/')){
        return json?.data || json;
    }
    else{
        return json?.data !== undefined ? json.data : json;
    }
}

//CONVENIENCE API METHODS
export const apiGet  = {
    async post(path, data, options={}){
        const result = await api(path, {method: 'POST', body: data, ...options});

        return result;
    },

    async get(path, options = {}){
        return api(path, {method: 'GET', ...options});
    },
    async put(path, data, options = {}){
        return api(path, {method: 'PUT', body: data, ...options});
    },
    async delete(path, options = {}){
        return api(path, {method: 'DELETE', ...options});
    }
}