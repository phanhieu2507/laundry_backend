import axios from 'axios';


function getToken() {
    const userData = sessionStorage.getItem('userData');
    if (userData) {
        const data = JSON.parse(userData);
        return data.token;
    }
    return null;
}

const token = getToken();

export default axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // Chỉ đính kèm token nếu nó tồn tại
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    }
});
