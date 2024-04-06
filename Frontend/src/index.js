import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { VotersContextProvider } from "./context/dataContext";
import { NotVotedContextProvider } from "./context/notVotedContext";
import { VotedContextProvider } from "./context/VotedContext";

ReactDOM.render(
    <DarkModeContextProvider>
      <VotersContextProvider>
        <NotVotedContextProvider>
          <VotedContextProvider>
            <App />
          </VotedContextProvider>
        </NotVotedContextProvider>
      </VotersContextProvider>
    </DarkModeContextProvider>,
  document.getElementById("root")
);
