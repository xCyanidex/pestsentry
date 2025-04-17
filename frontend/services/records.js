import axios from 'axios';
const baseUrl = '/api/records';

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const create = async (newObject) => {
    const config = {
        headers: { Authorization: token},
    }
    try {
        const response = await axios.post(baseUrl, newObject, config)
        return response.data
    } catch {
        return "Server Error";
    }

}


const getAllRecords = async (userId) => {
    
    const config = {
        headers: { Authorization: token },
    }
    try {
        const request = axios.get(`${baseUrl}/content/${userId}`,config);
        return request.then((response) => response.data)
    }
    catch (error) {
        console.log(error)
    }
}


export default { setToken, create, getAllRecords }

