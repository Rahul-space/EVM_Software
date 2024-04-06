import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { VotersContext } from "../../context/dataContext";

const Datatable = () => {






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
      field: "phone",
      headerName: "phone",
      width: 150,
    },
  
    {
      field: "age",
      headerName: "Age",
      width: 100,
    },
    {
      field: "voted",
      headerName: "Status",
      width: 140,
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
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        getRowId={(row) => row.voterID}
      />
    </div>
  );
};

export default Datatable;
