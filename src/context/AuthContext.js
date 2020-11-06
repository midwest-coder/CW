import React, { createContext, useState, useEffect } from 'react'
import Loading from '../components/Loading'
import Auth from '../services/Auth'

export const AuthContext = createContext()

export default ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        Auth.isAuthenticated().then((data) => {
            setUser(data.user)
            setIsAuthenticated(data.isAuthenticated)
            setIsLoaded(true)
        })
    }, [])

    let load
    if(isLoaded)
        load = ''
    else
        load = <Loading loading={isLoaded}/>
            

    return(
        <React.Fragment>
            <AuthContext.Provider value={{user, setUser, isAuthenticated, setIsAuthenticated, isLoaded, setIsLoaded }}>
                {load}
                {children}
            </AuthContext.Provider>
        </React.Fragment>
    )
}