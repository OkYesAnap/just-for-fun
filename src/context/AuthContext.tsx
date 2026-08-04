import React, {createContext, ReactNode} from "react";
import useAuth, {UseAuthReturn} from "../hooks/useAuth";

interface AuthContextType {
    authUser: UseAuthReturn;
    authRequest: boolean
}

export const AuthContext = createContext<AuthContextType>(null!);

const AuthContextProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [authRequest, setAuthRequest] = React.useState<boolean>(false);
    const authUser = useAuth(setAuthRequest);

    const contextValue = {
        authRequest,
        authUser
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
};

export {AuthContextProvider}
