const baseUrl = '/api/carrier';
export const getAllCarriers = () => {
    return fetch(baseUrl)
        .then((res) => res.json())
};



export const addCarrier = (carrier) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(carrier)
    })
}
export const getCarrier = (carrierId) => {
    return fetch(baseUrl + `/${carrierId}`)
        .then((res) => res.json())
}

export const getCarrierDets = (carrierId) => {
    return fetch(baseUrl + `/details/${carrierId}`)
        .then((res) => res.json())
}