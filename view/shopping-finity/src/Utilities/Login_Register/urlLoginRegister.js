const API_BEST_URL_DEVELOPMENT = "http://localhost:7102/api/Account";
const API_BEST_URL_PRODUCTION = "http://appname.azurewebsite.net";

const ENDPOINT = {
    LOGIN : 'LoginUser',
    REGISTER: 'RegisterUser',
}

const development = {
    LOGIN_USER : `${API_BEST_URL_DEVELOPMENT}/${ENDPOINT.LOGIN}`,
    REGISTER_USER : `${API_BEST_URL_DEVELOPMENT}/${ENDPOINT.REGISTER}`
};

const predection ={
    LOGIN_USER : `${API_BEST_URL_PRODUCTION}/${ENDPOINT.LOGIN}`,
    REGISTER_USER : `${API_BEST_URL_PRODUCTION}/${ENDPOINT.REGISTER}`
}

const urlLoginRegister = process.env.NODE_ENV === 'development' ? development : predection;

export default urlLoginRegister;