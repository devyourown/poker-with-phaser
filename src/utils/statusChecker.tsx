import call, { Methods } from "./api";

export default function isLogined(): boolean {
    const token = localStorage.getItem("TOKEN");
    if (!token)
        return false;
    call("/auth/status", Methods.GET, { headers: {
        Authorization: `Bearer ${token}`
    }})?.then((response) => {
        if (response.status === 200)
            return true;
        return false;
    });
    return false;
}

export function getTokenHeader() {
    const token = localStorage.getItem("TOKEN");
    if (!token)
        return {};
    return { headers: {
        Authorization: `Bearer ${token}`
    }};
}