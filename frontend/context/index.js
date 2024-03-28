import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

function GlobalState({ children }) {
    const [currentUsername, setCurrentUsername] = useState("");
    
    const [isAuth, setIsAuth] = useState(true); //CHANGE LATER
    return (
        <GlobalContext.Provider
            value={{
                currentUsername,
                setCurrentUsername,
                isAuth,
                setIsAuth,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalState;
