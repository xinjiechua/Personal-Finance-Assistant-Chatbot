import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

function GlobalState({ children }) {
    const [currentUsername, setCurrentUsername] = useState("");
    const [firstLaunch, setFirstLaunch] = useState(true); //CHANGE LATER
    const [isAuth, setIsAuth] = useState(false); //CHANGE LATER
    return (
        <GlobalContext.Provider
            value={{
                currentUsername,
                setCurrentUsername,
                firstLaunch,
                setFirstLaunch,
                isAuth,
                setIsAuth,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalState;
