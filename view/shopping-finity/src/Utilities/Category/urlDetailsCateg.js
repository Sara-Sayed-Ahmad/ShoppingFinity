const API_BEST_URL_DEVELOPMENT = "http://localhost:7102/api/CategoryDetails";
const API_BEST_URL_PRODUCTION = "http://appname.azurewebsite.net";

const ENDPOINT = {
    GETALL_DATA : 'Details',
    GETBY_ID :'DetailsById',
    GETBY_ID_CATEGORY : 'DetailsByCategoryId'
}

const development = {
    API_URL_GET_DETAILS : `${API_BEST_URL_DEVELOPMENT}/${ENDPOINT.GETALL_DATA}`,
    API_URL_GET_DETAILS_BY_ID : `${API_BEST_URL_DEVELOPMENT}/${ENDPOINT.GETBY_ID}`,
    API_URL_GET_DETAILS_BY_ID_CATEGORY : `${API_BEST_URL_DEVELOPMENT}/${ENDPOINT.GETBY_ID_CATEGORY}`
};

const predection ={
    API_URL_GET_DETAILS : `${API_BEST_URL_PRODUCTION}/${ENDPOINT.GETALL_DATA}`,
    API_URL_GET_DETAILS_BY_ID : `${API_BEST_URL_PRODUCTION}/${ENDPOINT.GETBY_ID}`,
    API_URL_GET_DETAILS_BY_ID_CATEGORY : `${API_BEST_URL_PRODUCTION}/${ENDPOINT.GETBY_ID_CATEGORY}`
}

const urlDetailsCateg = process.env.NODE_ENV === 'development' ? development : predection;

export default urlDetailsCateg;