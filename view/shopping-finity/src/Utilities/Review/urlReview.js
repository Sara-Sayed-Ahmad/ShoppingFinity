const API_BEST_URL_DEVELOPMENT = "http://localhost:7102/api/Review";
const API_BEST_URL_PRODUCTION = "http://appname.azurewebsite.net";

const ENDPOINT = {
    GET_ALL_REVIEW : 'GetReviews',
    GET_REVIEW_BY_PRODUCT: 'GetReviewIdProduct'
}

const development = {
    API_URL_GET_ALL_REVIEWS : `${API_BEST_URL_DEVELOPMENT}/${ENDPOINT.GET_ALL_REVIEW}`,
    API_URL_GET_REVIEW_BY_PRODUCT: `${API_BEST_URL_DEVELOPMENT}/${ENDPOINT.GET_REVIEW_BY_PRODUCT}`
};

const predection = {
    API_URL_GET_ALL_REVIEWS : `${API_BEST_URL_PRODUCTION}/${ENDPOINT.GET_ALL_REVIEW}`,
    API_URL_GET_REVIEW_BY_PRODUCT: `${API_BEST_URL_PRODUCTION}/${ENDPOINT.GET_REVIEW_BY_PRODUCT}`
}

const urlReview = process.env.NODE_ENV === 'development' ? development : predection;

export default urlReview;