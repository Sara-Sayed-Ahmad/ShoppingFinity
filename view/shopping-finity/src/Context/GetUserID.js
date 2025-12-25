import axios from "axios";
import React from "react";
import urlCustomers from "../Utilities/Customer/urlCustomers";

export const GetUserID = async (userId) =>{
    return await axios.get(urlCustomers.API_URL_GET_BY_ID, {params: {Id: userId}})
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => console.log(error));
}