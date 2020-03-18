import { basePath, apiVersion } from './config';


export function getPostsApi(limit, page) {
    const url = `${basePath}${apiVersion}/get-posts?limit=${limit}&page=${page}`;

    const params = {
        method: 'GET',
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(error => {
            return error;
        })
}