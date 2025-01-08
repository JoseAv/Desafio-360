/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState } from "react";
import { LoginContextType, typeLoginContext, type typeUser } from '../types/user'

export const loginContext = createContext<LoginContextType | null>(null);


export const LoginProvider: React.FC<typeLoginContext> = ({ children }) => {
    const [user, setUser] = useState<typeUser | null>(null)
    const [loading, setLoading] = useState(true);



    async function loginUser(): Promise<void> {
        if (!user || !user.id) {
            setLoading(true)
            const newResponse = await inSession()
            setUser(newResponse)
            setLoading(false)
        }
    }

    function logOut() {
        setUser(null)
    }

    return (<loginContext.Provider value={
        {
            user,
            loginUser,
            logOut,
            loading
        }
    }>
        {children}
    </loginContext.Provider>

    )
}

export async function inSession() {
    try {
        const response = await fetch('http://localhost:3000/session', {
            credentials: 'include'
        })
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}