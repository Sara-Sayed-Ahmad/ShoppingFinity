const API_BEST_URL_DEVELOPMENT = "http://localhost:7102/api/PaymentType";
const API_BEST_URL_PRODUCTION = "http://appname.azurewebsite.net";

const ENDPOINT = {
    GET_ALL_PAYMENTTYPES: 'GetPaymentTypes',
    GET_BY_PAYMENTTYPE : 'GetPaymentType'
}

const development = {
    API_URL_GET_BY_PAYMENT : `${API_BEST_URL_DEVELOPMENT}/${ENDPOINT.GET_BY_PAYMENTTYPE}`,
    API_URL_GET_ALL_PAYMENT : `${API_BEST_URL_DEVELOPMENT}/${ENDPOINT.GET_ALL_PAYMENTTYPES}`
};

const predection ={
    API_URL_GET_BY_PAYMENT : `${API_BEST_URL_PRODUCTION}/${ENDPOINT.GET_BY_PAYMENTTYPE}`,
    API_URL_GET_ALL_PAYMENT : `${API_BEST_URL_DEVELOPMENT}/${ENDPOINT.GET_ALL_PAYMENTTYPES}`
}

const urlPayment = process.env.NODE_ENV === 'development' ? development : predection;

export default urlPayment;