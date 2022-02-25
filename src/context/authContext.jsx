import React, { createContext } from 'react';


export const AuthContext = createContext()

const AuthProvider = ({ children }) =>{
    const auth = () =>{
        let token = localStorage.getItem('token')
        if (token !== null){
            return true
        }else {
            return false
        }
    }

    return(
        <AuthContext.Provider value={{ auth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;