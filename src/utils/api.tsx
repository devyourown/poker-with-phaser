import axios from "axios";

export enum Methods {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

const API_END_POINT = "http://localhost:8080"

export default function call(api: string, method: Methods, data?: any) {
    let result;
    try {
        const request = makeRequest(api, method, data);
        console.log(request);
        result = axios(request);
    } catch (err) {
        console.log(err);
    }
    return result;
}

function makeRequest(api: string, method: Methods, data?: any) {
    if (data)
        data = JSON.stringify(data);
    const token = localStorage.getItem("TOKEN");
    return {
        method: method,
        url: API_END_POINT + api,
        headers: {'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`},
        data: data
    };
}
