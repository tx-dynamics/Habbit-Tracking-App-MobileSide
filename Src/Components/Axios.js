const axios = require('axios');

import { BaseUrl } from '../Constants/BaseUrl'

const Axios = async (url, params, method) => {
    return new Promise((resolve, reject) => {
        try {
            fetch(BaseUrl + url, {
                method: method,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            })
            .then((response) => response.json())
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                })

        } catch (error) {
            reject(error);
        }
    });


}

export default Axios;