import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeIcon from '@mui/icons-material/LightMode';
import { DarkModeContext } from "../../context/darkModeContext";
import { Icon } from "@mui/material";
import { useContext } from "react";


const Navbar = () => {
  const { dispatch,darkMode } = useContext(DarkModeContext);
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search" >
          <input type="text"  placeholder="cid - B673#73" disabled={true}/>
        </div>
        <div className="items">
          <div className="item">
            <div className="icon" onClick={() => dispatch({ type: "TOGGLE" })}>
              {darkMode ? (<DarkModeOutlinedIcon/>):(<LightModeIcon/>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
