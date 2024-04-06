import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import Table from "./data/Table"
import { useContext } from "react";
import { VotersContext } from "../../context/dataContext";
const List = () => {
  const voters=useContext(VotersContext);
  console.log(voters)
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Table dataType={voters}/>
      </div>
    </div>
  )
}

export default List