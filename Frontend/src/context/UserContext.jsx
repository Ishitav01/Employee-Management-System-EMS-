import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useLogin = () => useContext(UserContext);

export const UserProvider = ({children}) => {

    const [userData,setUserData] = useState(null);

    return (
        <UserContext.Provider value={{userData,setUserData}}>
            {children}
        </UserContext.Provider>
    )
}
