import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Voted from "./pages/voted/Voted";
import NotVoted from "./pages/voted/NotVoted";
import Settings from "./pages/settings/Settings";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";

function App() {
  // document.addEventListener('contextmenu', function(e) {
  //   e.preventDefault();

  // });
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new/:voterID"
                element={<New inputs={userInputs} title="User Details" />}
              />
            </Route>
            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                //I need to send the voterID as a title to the New component
                element={<New inputs={productInputs} title={"HI"} />}

              />
            </Route>
            <Route path="settings" element={<Settings />} />
            <Route path="voted">
              <Route index element={<Voted />} />
              <Route path=":userdetails" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
              
            </Route>
            <Route path="notvoted">
              <Route index element={<NotVoted />} />
              <Route path=":userdetails"  />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
              </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
