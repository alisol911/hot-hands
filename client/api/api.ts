import { post, get } from '../framework/api/server';

const ERR_MSG = `
  Service is unavailable
`;

export function getValue(url, type = 'json') {
    return new Promise((resolve, reject) => {
        return get(url, type)
            .then(result => {
                if (result)
                    resolve(result);
                else
                    reject(new Error(ERR_MSG));
            })
            .then(null, (err) => reject(new Error(ERR_MSG)));
    });
}

export function setValue(url, data) {
    return new Promise((resolve, reject) => {
        return post(url, data)
            .then(result => {
                if (result)
                    resolve(result);
                else
                    reject(new Error(ERR_MSG));
            })
            .then(null, (err) => reject(new Error(ERR_MSG)));
    });
}
