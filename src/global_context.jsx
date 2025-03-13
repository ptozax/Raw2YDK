import React, { createContext, useContext, useState ,useEffect} from "react";

// Create Context
const GlobalContext = createContext();

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [Cards, setCards] = useState([]);


    useEffect(() => {
        fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php")
            .then((response) => response.json())
            .then((data) => {
                console.log("Yu-Gi-Oh! Card Data:", data);
                setCards(data.data);
            })
            .catch((error) => {
                console.error("Error fetching card data:", error);
            });
    }, []);






  return (
    <GlobalContext.Provider value={{ Cards, setCards }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom Hook for Easy Access
export const useGlobalContext = () => useContext(GlobalContext);
