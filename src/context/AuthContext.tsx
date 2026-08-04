import React, {createContext, ReactNode} from "react";
import useAuth, {UseAuthReturn} from "../hooks/useAuth";

interface AuthContextType {
    authUser: UseAuthReturn;
}

export const AuthContext = createContext<AuthContextType>(null!);

const AuthContextProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const authUser = useAuth();

    const contextValue = {
        authUser
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
};

export {AuthContextProvider}
