import "./datatable2.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

const Datatable2 = ({dataType}) => {
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
      width: 160,
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
      width: 160,
    },
  ];
  
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={"/users/new/"+params.row.voterID} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <DataGrid
        className="datagrid"
        rows={dataType}
        columns={userColumns.concat(actionColumn)}
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable2;
