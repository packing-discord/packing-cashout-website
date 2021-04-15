const request = (token, path, method, body) => {
    return new Promise((resolve) => {
        fetch(`${process.env.REACT_APP_API_URL}${path}`, {
            method,
            body: method === 'POST' ? JSON.stringify(body) : undefined,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
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

export const buyProduct = (token, productID, emailAddress) => {
    return request(token, '/buy', 'POST', {
        productID,
        emailAddress
    });
};

export const fetchHistory = (token) => {
    return request(token, '/history', 'GET');
}
