const baseUrl = '/api/product';
export const getAllProducts = () => {
    return fetch(baseUrl)
        .then((res) => res.json())
};



export const addProduct = (product) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
}
export const getProduct = (productId) => {
    return fetch(baseUrl + `/${productId}`)
        .then((res) => res.json())
}

export const getProductDets = (productId) => {
    return fetch(baseUrl + `/details/${productId}`)
        .then((res) => res.json())
}