const API_BEST_URL_DEVELOPMENT = "http://localhost:7102/api/User";
const API_BEST_URL_PRODUCTION = "http://appname.azurewebsite.net";

const ENDPOINT = {
    POST_PRODUCT_FAVORITE : 'AddFavorite',
}

const development = {
    API_URL_POST_ADD_FAVORITE : `${API_BEST_URL_DEVELOPMENT}/${ENDPOINT.POST_PRODUCT_FAVORITE}`
};

const predection ={
    API_URL_POST_ADD_FAVORITE : `${API_BEST_URL_PRODUCTION}/${ENDPOINT.POST_PRODUCT_FAVORITE}`
}

const urlCustomers = process.env.NODE_ENV === 'development' ? development : predection;

export default urlCustomers;