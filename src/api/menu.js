import { basePath, apiVersion } from './config';

export function addMenu(data) {
    const url = `${basePath}${apiVersion}/get-menus`;

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


export function getMenuApi(){
    const url = `${basePath}${apiVersion}/get-menus`;

    return fetch(url)
        .then(response => {
            return response.json();
        })
        .then(result => {
            if (result.ok) {
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