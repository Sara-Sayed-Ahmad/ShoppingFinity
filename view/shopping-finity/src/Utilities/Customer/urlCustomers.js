const API_BEST_URL_DEVELOPMENT = "http://localhost:7102/api/AllUsers";
const API_BEST_URL_PRODUCTION = "http://appname.azurewebsite.net";

const ENDPOINT = {
    GETALL_DATA : 'GetUsers',
    GETALL_USER_ID : 'GetUser'
}

const development = {
    API_URL_GET_ALL_USERS : `${API_BEST_URL_DEVELOPMENT}/${ENDPOINT.GETALL_DATA}`,
    API_URL_GET_BY_ID : `${API_BEST_URL_DEVELOPMENT}/${ENDPOINT.GETALL_USER_ID}`
};

const predection ={
    API_URL_GET_ALL_USERS : `${API_BEST_URL_PRODUCTION}/${ENDPOINT.GETALL_DATA}`,
    API_URL_GET_BY_ID : `${API_BEST_URL_PRODUCTION}/${ENDPOINT.GETALL_USER_ID}`
}

const urlCustomers = process.env.NODE_ENV === 'development' ? development : predection;

export default urlCustomers;