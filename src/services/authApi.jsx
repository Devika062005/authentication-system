import axios from "axios";

const API_URL = "http://localhost:3000/users"

function getUserByEmail(email) {
    return axios.get(`${API_URL}?email=${email}`);

}

function getUserById(id) {
    return axios.get(`${API_URL}/${id}`);
}

function checkUsername(username) {
    return axios.get(`${API_URL}?username=${username}`)
}
function createUser(userData) {
    return axios.post(API_URL, userData);
}



export {
    getUserByEmail,
    getUserById,
    checkUsername,
    createUser
};



