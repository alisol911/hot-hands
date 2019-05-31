export function post(path, data) {
    return fetch(path, {
        method: 'post',
        headers: [
            ['Content-Type', 'application/json']
        ],
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok)
            return response.json();
        else
            return null;
    });
}

export function get(path, type = 'json') {
    return fetch(path, {
        method: 'get'
    })
    .then(response => {
        if (response.ok)
            return (type === 'json' ? response.json() : response.text());
        else
            return null;
    });
}
