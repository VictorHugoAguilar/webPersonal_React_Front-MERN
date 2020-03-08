import { basePath, apiVersion } from './config';

export function addMenu(token, data) {
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


export function getMenuApi() {
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


export function updateMenuApi(token, menuId, data) {
    const url = `${basePath}${apiVersion}/update-menu/${menuId}`;

    const params = {
        method: 'PUT',
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
            console.error(result);
            return result;
        })
        .catch(error => {
            console.error('error', error)
            return error;
        })
}

export function activateMenuApi(token, menuId, status) {
    const url = `${basePath}${apiVersion}/activate-menu/${menuId}`;

    const params = {
        method: 'PUT',
        body: JSON.stringify({ active: status }),
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
            console.error(result);
            return result;
        })
        .catch(error => {
            console.error('error', error)
            return error;
        })
}

export function addMenuApi(token, menu) {
    const url = `${basePath}${apiVersion}/add-menu`;

    const params = {
        method: 'POST',
        body: JSON.stringify(menu),
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
            console.error(result);
            return result;
        })
        .catch(error => {
            console.error('error', error)
            return error;
        })

}