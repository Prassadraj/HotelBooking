import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource"; // Assuming userColumns is imported separately
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(`/${path}`);

  useEffect(() => {
    if (data) setList(data); // Update list only when data is available
  }, [data]);

  const handleDelete = async (id, hotelid) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
      console.log(hotelid);
    } catch (error) {
      console.log(error);
    }
  };

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => (
      <div className="cellAction">
        <Link
          to={`/users/${params.row._id}`}
          style={{ textDecoration: "none" }}
        >
          <div className="viewButton">View</div>
        </Link>
        <div
          className="deleteButton"
          onClick={() =>
            handleDelete(params.row._id, params.row.roomNumbers._id)
          }
        >
          Delete
        </div>
      </div>
    ),
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list} // Use list instead of data here
        columns={[...columns, actionColumn]} // Spread userColumns and include actionColumn
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
