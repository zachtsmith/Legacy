import { getToken } from "./authManager";
import firebase from "firebase/app";
import "firebase/auth";

const apiUrl = "/api/UserProfile";

export const getUserProfiles = () => {
    return getToken().then((token) => {
        return fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Error("An unknown error occured");
            }
        });
    });
};


export const getCurrentUserByFirebaseId = () => {
    return getToken()?.then((token) => {
        const uid = firebase?.auth()?.currentUser.uid;

        return fetch(`${apiUrl}/${uid}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Error("An unknown error occured");
            }
        });
    });
};

export const getUserProfile = (userId) => {
    return fetch(`${apiUrl}/details/${userId}`)
        .then((res) => res.json())
}

// export const getCarrier = (carrierId) => {
//     return fetch(baseUrl + `/${carrierId}`)
//         .then((res) => res.json())
// }
export const getUserHealth = (userId) => {
    return fetch(`${apiUrl}/:${userId}`)
        .then((res) => res.json())
}
