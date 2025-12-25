import React, { Children, createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuthContext = () =>{
    return useContext(AuthContext);
} 

export const AuthProvider = ({children}) => {
    const [userRole , setRole] = useState(null);
    const [userId, setUserId] = useState("");
    const [token, setToken] = useState([]);

    const setUser = (role) =>{
        setRole(role);
    }
    
    const user = (id) =>{
        setUserId(id);
    }

    const TokenUser = (tok) =>{
        setToken(tok);
    }

    const dataUser = {
        userRole,
        setUser,
        userId,
        user,
        token,
        TokenUser
    }

    return(
        <AuthContext.Provider value={dataUser} >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;