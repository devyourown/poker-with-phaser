import axios from "axios";

export enum Methods {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

const API_END_POINT = "http://localhost:8080"

export default function call(api: string, method: Methods, data: {}) {
    let result;
    try {
        const request = makeRequest(api, method, data);
        result = axios(request);
    } catch (err) {
        console.log(err);
    }
    return result;
}

function makeRequest(api: string, method: Methods, data: {}) {
    data = JSON.stringify(data);
    return {
        method: method,
        url: API_END_POINT + api,
        headers: {'Content-Type': 'application/json'},
        data: data
    };
}
