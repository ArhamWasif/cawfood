import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { onDelete } from './utils';
import { useNavigate } from 'react-router-dom';


export default function DataTable() {
  let navigate = useNavigate()
  const [foodItem, setFoodItem] = React.useState([])

  const columns = [
    { field: '_id', headerName: 'ID', width: 270 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'category', headerName: 'Category', width: 200},
    { field: 'description', headerName: 'Description', width: 200},
    { field: 'Action', headerName: 'Action', width: 200,
    renderCell: (params) => (
      <strong>
        <button className={`btn btn-danger justify-center ms-1 `} onClick={() => onDelete(params?.id, setFoodItem, foodItem)}>Delete</button>
      </strong>
    ),
  },  
    { field: 'Action1', headerName: 'Action2', width: 200,
    renderCell: (params) => (
      <strong>
        <button className={`btn btn-success justify-center ms-1 `} onClick={() => 
      navigate(`/admin/update/${params?.id}`)
        }>Edit</button>
      </strong>
    ),
  },  
  ];
console.log('foodItem',foodItem);
  React.useEffect(() => {
    const load = async () => {
      let response = await fetch("http://localhost:5000/api/get/product", {
        method: 'GET',
      });
      response = await response.json();
      console.log('xx- response',response)
      setFoodItem(response.data[0]);
    }
    load()
  }, [])
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={foodItem}
        columns={columns}
        getRowId={(row) => row?._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        
      />
    </div>
  );
}