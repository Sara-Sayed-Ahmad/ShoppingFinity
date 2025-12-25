const API_BEST_URL_DEVELOPMENT = "http://localhost:7102/api/Order";
const API_BEST_URL_PRODUCTION = "http://appname.azurewebsite.net";

const ENDPOINT = {
    GETALL_ORDER : 'GetOrders',
    GET_BY_ID: 'GetOrderByid',
    GET_BY_ID_USER: 'GetOrderByUser',
}

const development = {
    API_URL_GET_ALL_ORDERA : `${API_BEST_URL_DEVELOPMENT}/${ENDPOINT.GETALL_ORDER}`,
    API_URL_GET_BY_ID_ORDER: `${API_BEST_URL_DEVELOPMENT}/${ENDPOINT.GET_BY_ID}`,
    API_URL_GET_BY_ID_USER: `${API_BEST_URL_DEVELOPMENT}/${ENDPOINT.GET_BY_ID_USER}`
};

const predection ={
    API_URL_GET_ALL_ORDERA : `${API_BEST_URL_PRODUCTION}/${ENDPOINT.GETALL_ORDER}`,
    API_URL_GET_BY_ID_ORDER: `${API_BEST_URL_PRODUCTION}/${ENDPOINT.GET_BY_ID}`,
    API_URL_GET_BY_ID_USER: `${API_BEST_URL_PRODUCTION}/${ENDPOINT.GET_BY_ID_USER}`
}

const urlOrder = process.env.NODE_ENV === 'development' ? development : predection;

export default urlOrder;