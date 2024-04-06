import "./table.scss";
import { DataGrid,GridToolbarContainer, GridToolbarExport,GridToolbarFilterButton } from "@mui/x-data-grid";
import { useContext,useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { VotersContext } from "../../../context/dataContext";
import Swal from 'sweetalert2';
import axios from "axios";

const Table = () => {
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
        <GridToolbarFilterButton />
      </GridToolbarContainer>
    );
  }

  const [count,setCount] = useState(0);
  useEffect(() => {
    localStorage.getItem("smsCount")? setCount(parseInt(localStorage.getItem("smsCount"))):localStorage.setItem("smsCount",0);
  }, [])

  // console.log("count",count)
  
  
  
  const handleSendSms  = (data) =>{
    
    Swal.fire({
      title: "Send SMS to "+data.name+" ?",
      text: "This will be not counted in reminder SMS count! You have "+(2-count)+" SMS left!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "#d33",
      confirmButtonText: "Send SMS",
      timer: 8000,
      timerProgressBar: true,
    }).then((result) => {
      if (result.isConfirmed) {

        setCount(count+1);
        localStorage.setItem("smsCount",count+1);
          async function sendSms(data){
          await axios.post("http://localhost:8800/voters/sendSms",data).then((res)=>{
            console.log("send sms is accepted",res);
            Swal.fire({
              title: "SMS Sent!",
              text: "SMS Sent to "+data.name+" successfully!",
              icon: "success",
              timer: 8000,
              timerProgressBar: true,
            });
          })
        }
        sendSms(data);
      }
    })
  };



  const userColumns = [
    { field: "voterID", headerName: "ID", width: 150 },
    {
      field: "name",
      headerName: "Name",
      width: 220,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.photo} alt="avatar" />
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 90,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.gender}`}>
            {params.row.gender}
          </div>
        );
      },
    },
    {
      field: "phone",
      headerName: "phone",
      width: 150,
    },
  
    {
      field: "age",
      headerName: "Age",
      width: 60,
    },

    {
      field: "voted",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.voted}`}>
            {params.row.voted? " Voted":"Not Voted" }
          </div>
        );
      },
    },
    {
      field: "votedAt",
      headerName: "Voted At",
      width: 140,
    },
  ];
















  const data = useContext(VotersContext);
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={"/users/new/"+params.row.voterID} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            {((count < 3 && params.row.voted===false) && <Link style={{ textDecoration: "none" }}>
              <div className="viewButton" onClick={()=>handleSendSms(params.row)}>Notify</div>
            </Link>)}
          </div>
          
        );
      },
    },
  ];
  return (
    <div className="datatables">
      <div className="datatableTitle">
        All Voters in the Ward
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={10}
        rowsPerPageOptions={[9]}
        getRowId={(row) => row.voterID}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </div>
  );
};

export default Table;
