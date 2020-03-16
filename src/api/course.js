import { basePath, apiVersion } from './config';

export function getCoursesApi() {
    const url = `${basePath}${apiVersion}/get-courses`;

    const params = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            if (result.ok) {
                return result;
            }
            return result;
        })
        .catch(error => {
            console.error('error', error)
            return error;
        })
}

export function getCourseDataUdemyApi(id) {
    const baseUrl = `https://www.udemy.com/api-2.0/courses/${id}`;
    const courseParams = `?fields[course]=title,headline,url,price,image_480x270`;
    const url = baseUrl + courseParams;

    return fetch(url)
        .then(async response => {
            return {
                code: response.status,
                data: await response.json()
            };
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        });
}

export function addCourse(token, data) {
    const url = `${basePath}${apiVersion}/get-menus`;

    const params = {
        method: 'POST',
        body: JSON.stringify(data),
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