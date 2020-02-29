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