import axios from 'axios'
// const baseUrl = '/api/users/login';

export const login = async credentials => {
    const response = await axios.post('/api/users/login', credentials);
    return response.data;
}

export const register=async credentials=>{
    const response=await axios.post('/api/users/',credentials)
    return response.data;
}



