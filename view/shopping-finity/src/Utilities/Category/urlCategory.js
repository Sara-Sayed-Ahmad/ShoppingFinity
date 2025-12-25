const API_BEST_URL_DEVELOPMENT = "http://localhost:7102/api/Category";
const API_BEST_URL_PRODUCTION = "http://appname.azurewebsite.net";

const ENDPOINT = {
    GETALL_DATA : 'GetCategories',
    GETBY_ID :'CategoryById'
}

const development = {
    API_URL_GET_CATEGORIES : `${API_BEST_URL_DEVELOPMENT}/${ENDPOINT.GETALL_DATA}`,
    API_URL_GET_CATEGORY_BY_ID : `${API_BEST_URL_DEVELOPMENT}/${ENDPOINT.GETBY_ID}`
};

const predection ={
    API_URL_GET_CATEGORIES : `${API_BEST_URL_PRODUCTION}/${ENDPOINT.GETALL_DATA}`,
    API_URL_GET_CATEGORY_BY_ID : `${API_BEST_URL_PRODUCTION}/${ENDPOINT.GETBY_ID}`
}

const urlCategory = process.env.NODE_ENV === 'development' ? development : predection;

export default urlCategory;