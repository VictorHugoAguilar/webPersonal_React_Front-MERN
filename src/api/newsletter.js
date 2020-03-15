import { basePath, apiVersion } from './config';

export function suscribeNewsletterApi(data) {
    const url = `${basePath}${apiVersion}/suscribe-newsletter/${data.toLowerCase()}`;

    const params = {
        method: 'POST',
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(error => {
            console.error('error', error)
            return error;
        })
}
