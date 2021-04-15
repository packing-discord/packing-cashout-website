const request = (token, path, method, body) => {
    return new Promise((resolve) => {
        fetch(`${process.env.REACT_APP_API_URL}${path}`, {
            method,
            body: method === 'POST' ? body : undefined,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            res.json().then((data) => {
                resolve(data)
            })
        })
    })
};

export const fetchUpdate = (token) => {
    return request(token, '/update', 'GET');
};
