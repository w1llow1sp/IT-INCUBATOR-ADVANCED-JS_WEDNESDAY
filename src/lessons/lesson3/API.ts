import axios from 'axios';

const configOMB = {
    baseURL: 'http://www.omdbapi.com',
};
const key =  'f5284b56';
const axiosInstance = axios.create(configOMB);

const API = {
    searchFilmsByTitle: (title: string) => {
        return axiosInstance
            .get('/', {
                params: {
                    apikey: key,
                    s: title,
                },
            })
            .then((response) => response.data)
            .catch((error) => {
                console.log('Can\'t search films by title', error);
                throw error;
            });
    },
    searchFilmsByType: (title: string, type: string) => {
        return axiosInstance
            .get('/', {
                params: {
                    apikey: key,
                    s: title,
                    type: type,
                },
            })
            .then((response) => response.data)
            .catch((error) => {
                console.log('Can\'t search films by type', error);
                throw error;
            });
    }
};


export default API;
