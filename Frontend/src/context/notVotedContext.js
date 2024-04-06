import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const NotVotedContext = createContext(); // Renamed context name

export const NotVotedContextProvider = ({ children }) => {
  const [voters, setVoters] = useState([]); // Renamed state variable

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8800/voters/notVoted");
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
    <NotVotedContext.Provider value={voters} >
      {children}
    </NotVotedContext.Provider>
  );
};
