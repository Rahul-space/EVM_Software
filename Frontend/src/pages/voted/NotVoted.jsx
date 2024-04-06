import "./voted.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { ResponsiveContainer } from "recharts";
import Datatable2 from "./datatable/Datatable2";
import { useContext } from "react";
import { NotVotedContext } from "../../context/notVotedContext";
const Single = () => {
  const notvoted=useContext(NotVotedContext);
  var male=[];
  var female=[];
  notvoted.map((item)=>{
    if(item.gender==="male"){
      male.push(item);
    }else{
      female.push(item);
    }
  });
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="bottom">
        <ResponsiveContainer >
            <h1 className="titlefemale">Female Not Voted <FemaleIcon/></h1>
            <Datatable2 dataType={female}/>
          </ResponsiveContainer>
        </div>
        <div className="bottom">
          <ResponsiveContainer >
            <h1 className="titlemale">Male Not Voted <MaleIcon/></h1>
            <Datatable2 dataType={male}/>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Single;
