import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const VotedContext = createContext(); // Renamed context name

export const VotedContextProvider = ({ children }) => {
  const [voters, setVoters] = useState([]); // Renamed state variable

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8800/voters/voted");
        setVoters(response.data); // Updated state setter name
      } catch (error) {
        console.error("Error fetching voters data:", error); // Modified error message
      }
    };

    const interval = setInterval(() => {
      fetchData();
    }, 5000); // Polling interval remains the same

    fetchData(); // Initial fetch on component mount

    return () => clearInterval(interval); // Clean up interval
  }, []);

  return (
    <VotedContext.Provider value={voters} >
      {children}
    </VotedContext.Provider>
  );
};
