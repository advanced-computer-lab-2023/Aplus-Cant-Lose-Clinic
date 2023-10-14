import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const columns = [

//   { field: 'id', headerName: 'ID', width: 70 },
{ field: 'firstName', headerName: 'Patient Name', width: 130 },
{ field: 'appointmentDate', headerName: 'Appointment Date', width: 130 },
{
  field: 'viewPatientDetails',
  headerName: 'View Patient Details',
  width: 200,
  renderCell: (params) => {
    const { row } = params;
    return (
      <Link to={'/PatientList/patientdetails'}>
      <Button onClick={() => { /* Open patient details window or modal */ }}>
        View Patient Details
      </Button>
      </Link>
    );
  },
},
];

const rows = [
    { id: 1, appointmentDate: '4th aug', firstName: 'Jon'},
    { id: 2, appointmentDate: '2nd sep', firstName: 'Cersei'},
    { id: 3, appointmentDate: '1st sep', firstName: 'Jaime'},
    { id: 4, appointmentDate: '20th aug', firstName: 'Arya'},
    { id: 5, appointmentDate: '3rd aug', firstName: 'Daenerys'},
    { id: 6, appointmentDate: '6th aug', firstName: null },
    { id: 7, appointmentDate: '5th sep', firstName: 'Ferrara' },
    { id: 8, appointmentDate: '1st aug', firstName: 'Rossini' },
    { id: 9, appointmentDate: '25th aug', firstName: 'Harvey' },
  ];

export default function DataGridDemo() {
    const ssStyle={
        // marginTop:"50px",
        position:"relative",
        top:"10px",
      }
    return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid  style={ssStyle}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}