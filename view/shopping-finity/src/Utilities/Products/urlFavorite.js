const API_BEST_URL_DEVELOPMENT = "http://localhost:7102/api/Favorite";
const API_BEST_URL_PRODUCTION = "http://appname.azurewebsite.net";

const ENDPOINT = {
    GET_ALL_FAVORITEES:'GetFavoritesByUser'
};

const development = {
    API_URL_GET_ALL_FAVORITES_BY_USER: `${API_BEST_URL_DEVELOPMENT}/${ENDPOINT.GET_ALL_FAVORITEES}`
};

const predection = {
    API_URL_GET_ALL_FAVORITES_BY_USER: `${API_BEST_URL_PRODUCTION}/${ENDPOINT.GET_ALL_FAVORITEES}`
};

const urlFavorite = process.env.NODE_ENV === 'development' ? development : predection;

export default urlFavorite;