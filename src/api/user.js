import { basePath, apiVersion } from './config';

export function signUpApi(data) {

    const url = `${basePath}${apiVersion}/sign-up`;

    const params = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            if (result.ok) {
                console.log(result.message);
                return result;
            }
            console.error(result.messageMongo.errmsg);
            return result;
        })
        .catch(error => {
            console.error('error', error)
            return error;
        })
}

export function signInApi(data) {
    const url = `${basePath}${apiVersion}/sign-in`;
    const params = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    };

    return fetch(url, params)
        .then(response => { 
            // console.log(response);
            return response.json();
         })
         .then(result => {
            console.log(result)
            return result;
         })
         .catch(err => {
             console.error(err);
             return err.message;
         })
}

export function getUsersApi( token ){
    const url = `${basePath}${apiVersion}/users`;

    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    };

    return fetch(url, params)
        .then( response => {
            return response.json();
        })
        .then( result => {
            return result;
        })
        .catch(err => {
            return err.message;
        });
}

export function getUsersActiveApi( token, status ){
    const url = `${basePath}${apiVersion}/users-active?active=${status}`;

    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    };

    return fetch(url, params)
        .then( response => {
            return response.json();
        })
        .then( result => {
            return result;
        })
        .catch(err => {
            return err.message;
        });
}