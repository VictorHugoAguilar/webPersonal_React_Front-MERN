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

export function deletePostApi(id, token) {
    const url = `${basePath}${apiVersion}/delete-post/${id}`;

    const params = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
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