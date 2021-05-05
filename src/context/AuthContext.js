import React, { createContext, useState, useEffect } from 'react'
import Auth from '../services/Auth'
import Web3 from 'web3'

export const AuthContext = createContext()

export default ({ children }) => {
    const [user, setUser] = useState(null)
    const [web3, setWeb3] = useState(true)
    const [newUser, setNewUser] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        Auth.isAuthenticated().then((data) => {
            setUser(data.user)
            setIsAuthenticated(data.isAuthenticated)
        })
    }, [])

    return(
        <React.Fragment>
            <AuthContext.Provider value={{user, setUser, isAuthenticated, setIsAuthenticated, newUser, setNewUser, web3, setWeb3}}>
                {children}
            </AuthContext.Provider>
        </React.Fragment>
    )
}