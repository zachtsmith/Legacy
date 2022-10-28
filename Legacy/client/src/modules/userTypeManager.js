const baseUrl = '/api/userType';
export const getAllUserTypes = () => {
    return fetch(baseUrl)
        .then((res) => res.json())
};